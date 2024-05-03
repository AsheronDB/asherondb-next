import { Matrix4, Vector3, Vector2 } from "@math.gl/core";
import * as settings from '../../settings'
import Coordinates from "../coordinates";

function isTouchDevice() {
  return typeof window.ontouchstart !== "undefined";
}

export class camera2d {
  _zoom = 0.08;

  _didPinch = false;
  _mouseDown = false;
  _isDragging = false;
  _lastDrag = new Vector2(0, 0);
  _dragStart = new Vector2(0, 0);

  lastDistance: number = 0;
  distance: number = 0;

  canvas: HTMLCanvasElement;
  Position: Vector3 = new Vector3(0, 0, 0)
  ViewportSize: Vector3 = new Vector3(1, 1, 1)
  MapSize: Vector3 = new Vector3(255 * 192, 255 * 192, 700)

  mousePos = new Vector2(0, 0);

  get Zoom() { return this._zoom; }
  set Zoom(v) { this._zoom = v; }

  get Scale() { return this.Zoom / settings.data.renderScale; }

  get ViewPortCenter() {
    return new Vector3(this.ViewportSize.x / 2.0, this.ViewportSize.y / 2.0, 1);
  }

  get TranslationMatrix() {
    this.Position.z = 1;
    const zoomVec = new Vector3(this.Scale, this.Scale, 1);
    const offset = this.ViewportSize.clone().divide(zoomVec).divide(new Vector3(2, 2, 1))
    return Matrix4.IDENTITY.clone()
      .scale(zoomVec.clone())
      .translate(this.Position.clone().multiply(new Vector3(-1, -1, 1)).add(offset));
  }

  get ViewProjection() {
    return (new Matrix4()).ortho({
      left: 0,
      top: 0,
      right: this.canvas.width,
      bottom: this.canvas.height,
      near: 0.000901,
      far: 100000000000
    })
  }

  get Transform() {
    return  this.TranslationMatrix.multiplyLeft(this.ViewProjection);
  }

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    if (isTouchDevice()) {
      canvas.addEventListener("touchstart", (event) => {
        event.preventDefault();
        this._mouseDown = true;
        this.lastDistance = 0;
        this.distance = 0;
      });

      canvas.addEventListener("touchend", (event) => {
        event.preventDefault();
        this._mouseDown = false;
      })

      canvas.addEventListener("touchmove", (event) => {
        event.preventDefault();
        if (event.touches.length == 1) {
          this.#handleMove(event.touches[0].pageX, event.touches[0].clientY);
        }
        else { // pinching
          const touch0 = new Vector2(event.touches[0].clientX, event.touches[0].clientY)
          const touch1 = new Vector2(event.touches[1].clientX, event.touches[1].clientY)

          this.distance = Math.sqrt(
            (touch0.x - touch1.x) *
              (touch0.x - touch1.x) +
              (touch0.y - touch1.y) *
                (touch0.y - touch1.y)
          );

          if (this.lastDistance != 0) {
            let newZoom = 0
            if (this.lastDistance > this.distance) {
              newZoom = this.Zoom / Math.pow(2, (this.lastDistance - this.distance) * 0.0075);
            } else if (this.lastDistance < this.distance) {
              newZoom = this.Zoom * Math.pow(2, (this.distance - this.lastDistance) * 0.0075);
            }

            if (newZoom > 0) {
              this.Zoom = this.#capZoom(newZoom)
            }
          }

          this.lastDistance = this.distance;
        }
      })
    }
    else {
      canvas.addEventListener("mousedown", (event) => {
        if (event.button == 0) {
          this._mouseDown = true;
          event.preventDefault();
        }
      });
  
      canvas.addEventListener("mouseup", (event) => {
        if (event.button == 0) {
          this._mouseDown = false;
          event.preventDefault();
        }
      })

      canvas.addEventListener("mousemove", (event) => {
        event.preventDefault();
        this.#handleMove(event.clientX, event.clientY);
      })

      canvas.addEventListener("wheel", (event) => {
        event.preventDefault();  
        const clipPos = this.getClipSpaceMousePosition(event.clientX, event.clientY);
        const preZoom = this.Transform.clone().invert().transform(clipPos)

        // multiply the wheel movement by the current zoom level
        // so we zoom less when zoomed in and more when zoomed out
        const newZoom = this.Zoom * Math.pow(2, event.deltaY * -0.005);
        this.Zoom = this.#capZoom(newZoom)
        
        // position after zooming
        const postZoom = this.Transform.clone().invert().transform(clipPos)
      
        // camera needs to be moved the difference of before and after
        this.Position.x += preZoom[0] - postZoom[0];
        this.Position.y += preZoom[1] - postZoom[1];
      });
    }
  }

  #capZoom(zoom: number) {
    return Math.max(settings.data.minZoom, Math.min(settings.data.maxZoom, zoom));
  }

  update(dt: number) {
    if (!this._mouseDown && this._isDragging) {
      this._isDragging = false;
    }
  }

  #handleMove(x: number, y: number) {
    const newPos = new Vector2(x, y)

    if (this._mouseDown) {
        if (!this._isDragging) {
            this._dragStart = newPos.clone()
        }
        else {
          var p = this._lastDrag.clone().subtract(newPos.clone()).divide(new Vector2(this.Zoom, this.Zoom));
          this.Position.x += p.x;
          this.Position.y += p.y;
        }
        this._isDragging = true;
        this._lastDrag = newPos.clone();
    }

    this.mousePos.x = x
    this.mousePos.y = y
  }
  
  getClipSpaceMousePosition(x: number, y: number) {
    // get canvas relative css position
    const rect = this.canvas.getBoundingClientRect();
    const cssX = x - rect.left;
    const cssY = y - rect.top;
    
    // get normalized 0 to 1 position across and down canvas
    const normalizedX = cssX / this.canvas.clientWidth;
    const normalizedY = cssY / this.canvas.clientHeight;
  
    // convert to clip space
    const clipX = normalizedX *  2 - 1;
    const clipY = normalizedY * -2 + 1;
    
    return new Vector2(clipX, clipY);
  }


  // Call this method with negative values to zoom out
  // or positive values to zoom in. It looks at the current zoom
  // and adjusts it by the specified amount. If we were at a 1.0f
  // zoom level and specified -0.5f amount it would leave us with
  // 1.0f - 0.5f = 0.5f so everything would be drawn at half size.
  AdjustZoom(amount: number, position: Vector3) {
    const za = 0.1;
    amount = amount < 0 ? za : -za;

    this.Zoom += this.Zoom * amount;

    const z = new Vector3(this.Zoom  * amount, this.Zoom *  amount, 1);
    //this.Position = this.Position.clone().add(position.subtract(this.Position.clone()).multiply(z));

    //this.Position = MapClampedPosition(Position);
  }
  
  // Move the camera in an X and Y amount based on the cameraMovement param.
  // if clampToMap is true the camera will try not to pan outside of the
  // bounds of the map.
  MoveCamera(cameraMovement:Vector3, clampToMap = false) {
    const newPosition = this.Position.clone().add(cameraMovement);

    if (clampToMap) {
      this.Position = this.MapClampedPosition(newPosition);
    }
    else {
      this.Position = newPosition;
    }
  }

  // Center the camera on specific pixel coordinates
  CenterOnVec(position: Vector3) {
    this.Position = position.clone();
  }

  // Center the camera on a specific cell in the map 
  CenterOnCoords(coords: Coordinates) {
    this.Position = this.CenteredPosition(coords, false);
  }

  CenteredPosition(coords: Coordinates, clampToMap = false) {
    var cameraPosition = this.ScreenToWorld(this.CoordsToScreen(coords));
    if (clampToMap) {
        return this.MapClampedPosition(cameraPosition);
    }

    return cameraPosition;
  }

  // Clamp the camera so it never leaves the visible area of the map.
  MapClampedPosition(position: Vector3) {
    const z2v = new Vector3(this.Zoom / 2, this.Zoom / 2, 1);
    const cameraMin = this.ViewportSize.clone().divide(z2v);
    const cameraMax = this.MapSize.clone().subtract(cameraMin);

    return position.clone().clamp(cameraMin, cameraMax);
  }

  WorldToScreen(worldPosition: Vector3) {
    let wPos = new Vector3(worldPosition.x, worldPosition.y, 1);
    return wPos.transform(this.TranslationMatrix);
  }

  ScreenToWorld(screenPosition: Vector3) {
    screenPosition = screenPosition.clone()
    const scale = (new Vector3(this.Zoom, this.Zoom, 1))
    var x = this.ViewPortCenter.clone().multiply(this.MapSize.clone().multiply(scale))
    return screenPosition.transform(this.TranslationMatrix.clone().invert());
  }

  CoordsToScreen(coords: Coordinates) {
      let offset = new Vector3((coords.LBX()) * 192 + coords.LocalX, coords.LBY() * 192 + coords.LocalY);
      offset = offset.divide(new Vector3(255 * 192, 255 * 192, 1)).multiply(this.MapSize);
      return this.WorldToScreen(new Vector3(offset.x, this.MapSize.y - offset.y));
  }

  ScreenToCoords(screenPosition: Vector3) {
      const worldPos = this.ScreenToWorld(screenPosition);
      let offset = (new Vector3(worldPos.x, this.MapSize.y - worldPos.y));
        
      if (offset.x < 0) offset.x = 0;
      if (offset.y < 0) offset.y = 0;

      var landblock = (((Math.min(Math.floor(offset.x / 192.), 0xFE))  * Math.pow(2, 24)) + (Math.min(Math.floor(offset.y / 192.), 0xFE) << 16));

      return new Coordinates(landblock, offset.x % 192, offset.y % 192, 0);
  }
}



function toHexStr(n: number) {
  return ('00000000' + n.toString(16)).substr(-8);
};