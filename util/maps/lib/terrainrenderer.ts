import { Vector3, Vector2 } from "@math.gl/core"

import { TerrainVertSource } from "../shaders/terrain.vert"
import { TerrainFragSource } from "../shaders/terrain.frag"

import * as settings from "../settings"
import { terrainTextures, alphaTextures, terrainColors, assetsPaths } from "../data/terrain"
import { camera2d } from "./cameras/camera2d"
import { TextureArray } from "./texturearray"
import * as glhelpers from "./glhelpers"
import { Texture } from "./texture"

export class TerrainRenderer {
  canvas!: HTMLCanvasElement
  gl!: WebGL2RenderingContext
  quality: number

  vertexShader: WebGLShader | null = null
  fragmentShader: WebGLShader | null = null
  program: WebGLProgram | null = null

  // uniform locations
  #xWorldLoc: WebGLUniformLocation | null = null
  #scaleLoc: WebGLUniformLocation | null = null
  #renderViewLoc: WebGLUniformLocation | null = null
  #terrainDataLoc: WebGLUniformLocation | null = null
  #terrainAtlasLoc: WebGLUniformLocation | null = null
  #alphaAtlasLoc: WebGLUniformLocation | null = null
  #minZoomForTexturesLoc: WebGLUniformLocation | null = null
  #showLandcellLinesLoc: WebGLUniformLocation | null = null
  #showLandblockLinesLoc: WebGLUniformLocation | null = null
  #pixelSizeLoc: WebGLUniformLocation | null = null

  #dataTexture!: Texture
  #terrainTextureArray!: TextureArray
  #alphaTextureArray!: TextureArray

  hasTerrainTexture: number[] = []

  // ac data
  heightTable: number[] = []

  camera!: camera2d
  mousePos = new Vector2()
  isRunning = false

  constructor(quality: number) {
    this.quality = quality
  }

  init(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.gl = canvas.getContext("webgl2")!
    this.camera = new camera2d(this.canvas)

    this.handleResize()

    if (!this.gl) {
      this.throwError("No Canvas / webgl2?")
    }

    this.#addSettings()
    this.#setupGL()
    this.#setupInputs()

    this.#makeTextures()

    this.#setConstantUniforms()

    // resize map to fit
    if (canvas.height > canvas.width) {
      this.camera.Zoom = canvas.height / this.camera.MapSize.y
    }
    else {
      this.camera.Zoom = canvas.width / this.camera.MapSize.x
    }

    // center map
    this.camera.CenterOnVec(this.camera.MapSize.clone().divide(new Vector3(2, 2, 1)))

    this.isRunning = true

    const run = (dt: number) => {
      if (!this.isRunning) {
        return
      }

      this.update(dt)
      this.draw()

      // const centerPos = new Vector3(this.canvas.width / 2.0, this.canvas.height / 2.0, 0);
      // updateRoute(this.camera!.ScreenToCoords(centerPos), this.camera.Zoom);

      window.requestAnimationFrame(run)
    }

    window.requestAnimationFrame(run)
  }

  destroy() {
    this.isRunning = false
    // this.#dataTexture.destroy()
    // this.#alphaTextureArray.destroy()
    // this.#terrainTextureArray.destroy()
  }

  #addSettings() {
    /*
    gui.add(settings.data, settings.labels.renderQuality, settings.data.minRenderQuality, settings.data.maxRenderQuality, 1)
      .onChange(() => {
        this.#handleResize()
      })
    gui.add(settings.data, settings.labels.badWireframe)
    gui.add(settings.data, settings.labels.showLandblockLines)
    gui.add(settings.data, settings.labels.showLandcellLines)
    gui.add(settings.data, settings.labels.minZoomForTextures, 0.0001, 5, 0.005)
    */
  }

  #setupInputs() {
    this.mousePos = new Vector2(0, 0)
    /*
    codes.setupCodes()
    codes.addCode('idkfa', () => {
      console.log('idkfa')
    });
    */
  }

  #setupGL() {
    if (!this.#createShaders()) {
      this.throwError("Unable to create shaders!")
      return false
    }

    if (!this.#createProgram()) {
      this.throwError("Unable to program!")
      return false
    }

    this.#buildData()

    // Tell WebGL how to convert from clip space to pixels
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height)

    // Tell it to use our program (pair of shaders)
    this.gl.useProgram(this.program)

    this.gl.enable(this.gl.BLEND)
    this.gl.blendFunc(this.gl.ONE, this.gl.ONE_MINUS_SRC_ALPHA)

    this.#xWorldLoc = this.gl.getUniformLocation(this.program!, "xWorld")
    this.#scaleLoc = this.gl.getUniformLocation(this.program!, "scale")
    this.#renderViewLoc = this.gl.getUniformLocation(this.program!, "renderView")
    this.#terrainDataLoc = this.gl.getUniformLocation(this.program!, "terrainData")
    this.#terrainAtlasLoc = this.gl.getUniformLocation(this.program!, "terrainAtlas")
    this.#alphaAtlasLoc = this.gl.getUniformLocation(this.program!, "alphaAtlas")
    this.#minZoomForTexturesLoc = this.gl.getUniformLocation(this.program!, "minZoomForTextures")
    this.#showLandcellLinesLoc = this.gl.getUniformLocation(this.program!, "showLandcellLines")
    this.#showLandblockLinesLoc = this.gl.getUniformLocation(this.program!, "showLandblockLines")
    this.#pixelSizeLoc = this.gl.getUniformLocation(this.program!, "pixelSize")
  }

  #setConstantUniforms() {
    for (let i = 0; i < this.heightTable.length; i++) {
      const heightTableLoc = this.gl.getUniformLocation(this.program!, `heightTable[${i}]`)
      this.gl.uniform1f(heightTableLoc, this.heightTable[i])
    }
    for (let i = 0; i < terrainColors.length; i++) {
      const terrainColorLoc = this.gl.getUniformLocation(this.program!, `terrainColors[${i}]`)
      this.gl.uniform3f(terrainColorLoc, terrainColors[i].x, terrainColors[i].y, terrainColors[i].z)
    }

    this.gl.uniform1i(this.#terrainDataLoc, this.#dataTexture.textureUnit)
    this.gl.uniform1i(this.#terrainAtlasLoc, this.#terrainTextureArray.textureUnit)
    this.gl.uniform1i(this.#alphaAtlasLoc, this.#alphaTextureArray.textureUnit)
  }

  #makeTextures() {
    this.#terrainTextureArray = new TextureArray(this.gl, terrainTextures, new Vector2(512, 512), 1, this.gl.REPEAT, this.gl.NEAREST_MIPMAP_NEAREST),
    this.#alphaTextureArray = new TextureArray(this.gl, alphaTextures, new Vector2(512, 512), 2, this.gl.REPEAT, this.gl.NEAREST_MIPMAP_NEAREST)

    this.#dataTexture = new Texture(this.gl, `${assetsPaths}/terrain.png`, new Vector2(2041, 2041), 0)
    this.#dataTexture.load(() => {
      this.#onready()
    })
  }

  #onready() {
    this.handleResize()
    document.body.classList.add("loaded")

    this.#alphaTextureArray.load((idx) => {
      if (idx < 0) {
        this.#terrainTextureArray.load((idx) => {
          if (idx >= 0) {
            this.hasTerrainTexture[idx] = 1
          }
        })
      }
    })
  }

  handleResize() {
    glhelpers.resizeCanvasToDisplaySize(this.canvas, settings.data.maxRenderQuality + 1 - settings.data.renderQuality)
  }

  handleMouseMove(x: number, y: number) {
    this.mousePos.x = x
    this.mousePos.y = y
  }

  #buildData() {
    for (let i = 0; i < 255; i++) {
      this.heightTable[i] = i * 2
    }
    for (let i = 0; i < 32; i++) {
      this.hasTerrainTexture[i] = 0
    }
  }

  #createShaders() {
    this.vertexShader = glhelpers.createShader(this.gl, this.gl.VERTEX_SHADER, TerrainVertSource)
    this.fragmentShader = glhelpers.createShader(this.gl, this.gl.FRAGMENT_SHADER, TerrainFragSource)

    return (this.vertexShader && this.fragmentShader)
  }

  #createProgram() {
    this.program = glhelpers.createProgram(this.gl, this.vertexShader!, this.fragmentShader!)
    return !!this.program
  }

  update(dt: number) {
    this.camera.ViewportSize.x = this.canvas.width
    this.camera.ViewportSize.y = this.canvas.height

    this.camera.update(dt)

    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height)

    // Clear the canvas
    this.gl.clearColor(0, 0, 0, 1)
    this.gl.clear(this.gl.COLOR_BUFFER_BIT)

    this.gl.uniform1f(this.#scaleLoc!, this.camera.Zoom)
    this.gl.uniformMatrix4fv(this.#xWorldLoc!, false, this.camera.Transform)
    this.gl.uniform4f(this.#renderViewLoc!, 0, 0, 255, 255)
    this.gl.uniform1f(this.#minZoomForTexturesLoc!, settings.data.minZoomForTextures)
    this.gl.uniform1f(this.#showLandcellLinesLoc, settings.data.showLandcellLines ? 1.0 : 0.0)
    this.gl.uniform1f(this.#showLandblockLinesLoc, settings.data.showLandblockLines ? 1.0 : 0.0)

    const pixelSize = ((this.canvas.width > this.canvas.height ? this.canvas.width : this.canvas.height) / this.camera.MapSize.x) / this.camera.Zoom
    this.gl.uniform1f(this.#pixelSizeLoc, pixelSize)

    for (let i = 0; i < this.hasTerrainTexture.length; i++) {
      const hasTerrainTextureLoc = this.gl.getUniformLocation(this.program!, `hasTerrainTexture[${i}]`)
      this.gl.uniform1f(hasTerrainTextureLoc, this.hasTerrainTexture[i])
    }

    // this.overlay.innerHTML = `
    // Coords: ${this.camera.ScreenToCoords(new Vector3(this.mousePos.x / settings.data.renderScale, this.mousePos.y / settings.data.renderScale, 1))}<br />
    // FPS: ${this.#fps}<br />
    // `;
  }

  draw() {
    const numVerts = 8 * 8 * 2 * 3 // 8 cells per lb, 2 tris per cell
    const numInstances = 255 * 255 // one for each landblock

    if (settings.data.badWireframe) {
      this.gl.drawArraysInstanced(this.gl.LINE_STRIP, 0, numVerts, numInstances)
    }
    else {
      this.gl.drawArraysInstanced(this.gl.TRIANGLES, 0, numVerts, numInstances)
    }
  }

  throwError(message: string) {
    console.error(`Error: ${message}\n\nCheck console output for more details`)
  }
}
