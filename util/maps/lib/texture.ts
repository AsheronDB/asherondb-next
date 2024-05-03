import type { Vector2 } from "@math.gl/core"

export class Texture {
  imageSource: string
  gl: WebGL2RenderingContext
  texture: WebGLTexture | null
  textureUnit: number
  textureSize: Vector2

  constructor(gl: WebGL2RenderingContext, imageSource: string, textureSize: Vector2, textureUnit: number) {
    this.imageSource = imageSource
    this.gl = gl
    this.textureUnit = textureUnit
    this.textureSize = textureSize

    this.texture = gl.createTexture()

    gl.activeTexture(gl.TEXTURE0 + this.textureUnit)
    gl.bindTexture(this.gl.TEXTURE_2D, this.texture)
  }

  load(cb: () => void) {
    const gl = this.gl

    fetch(this.imageSource)
      .then(resp => resp.blob())
      .then((blob) => {
        const img = document.createElement("img")
        // Use blob as object url
        img.src = URL.createObjectURL(blob)

        // wait for image to be loaded before resolving the promise
        img.onload = () => {
          gl.bindTexture(gl.TEXTURE_2D, this.texture)
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img)
          gl.generateMipmap(gl.TEXTURE_2D)

          cb()
        }
      })
  }
}
