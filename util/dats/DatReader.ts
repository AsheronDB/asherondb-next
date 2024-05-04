export default class DatReader {
  view: DataView
  buffer: ArrayBuffer
  position: number
  encoder: TextDecoder

  constructor(view: DataView) {
    this.buffer = view.buffer
    this.view = view
    this.position = 0
    this.encoder = new TextDecoder()
  }

  _incRead(fn: (byteOffset: number, someBool: boolean) => number, cnt: number) {
    try {
      const res = fn.apply(this.view, [this.position, cnt > 1])
      this.position += cnt
      return res
    }
    catch (error) {
      console.error("dat read fail", this, error)
      throw error
    }
  }

  align() {
    const offset = this.position % 4
    if (offset !== 0)
      this.position += 4 - offset
  }

  getString() {
    const len = this.getInt16()
    const res = this.encoder.decode(new Uint8Array(this.buffer, this.position, len))
    this.position += len
    return res
  }

  getInt8() { return this._incRead(DataView.prototype.getInt8, 1) }
  getUint8() { return this._incRead(DataView.prototype.getUint8, 1) }
  getInt16() { return this._incRead(DataView.prototype.getInt16, 2) }
  getUint16() { return this._incRead(DataView.prototype.getUint16, 2) }
  getInt32() { return this._incRead(DataView.prototype.getInt32, 4) }
  getUint32() { return this._incRead(DataView.prototype.getUint32, 4) }
  getFloat() { return this._incRead(DataView.prototype.getFloat32, 4) }
  getDouble() { return this._incRead(DataView.prototype.getFloat64, 8) }

  getSingle() { return this.getFloat() }

  getPackedInt16() {
    let tmp = this.getUint8()
    if ((tmp & 0x80) !== 0) {
      tmp = (tmp & 0x7f) << 8
      tmp |= this.getUint8()
    }
    return tmp
  }

  getPackedInt32() {
    const b0 = this.getUint8()
    let result = b0
    if ((b0 & 0x80) !== 0) {
      const b1 = this.getUint8()
      result = ((b0 & 0x7f) << 8) | b1

      if ((b0 & 0x40) !== 0) {
        const s1 = this.getUint16()
        result = ((b0 & 0x3f) << 24) | (b1 << 16) | s1
      }
    }

    return result
  }

  getVector2() {
    return {
      x: this.getFloat(),
      y: this.getFloat(),
    }
  }

  getVector3() {
    return {
      x: this.getFloat(),
      y: this.getFloat(),
      z: this.getFloat(),
    }
  }

  getQuaternion() {
    return {
      w: this.getFloat(),
      x: this.getFloat(),
      y: this.getFloat(),
      z: this.getFloat(),
    }
  }

  /*
  getMany(ctor, cnt) {
    let res = null
    try {
      cnt = cnt !== undefined ? cnt : this.getInt32()
      res = new Array(cnt)
      for (let i = 0; i < cnt; i++)
        res[i] = ctor(this)

      return res
    }
    catch (error) {
      // console.log(res);
      throw error
    }
  }
  */

  getInt8Array(cnt: number) {
    cnt = cnt !== undefined ? cnt : this.getInt32()
    const res = new Int8Array(this.buffer, this.position, cnt)
    this.position += res.byteLength
    return res
  }

  getUint8Array(cnt: number) {
    cnt = cnt !== undefined ? cnt : this.getInt32()
    const res = new Uint8Array(this.buffer, this.position, cnt)
    this.position += res.byteLength
    return res
  }

  getInt16Array(cnt: number) {
    const cntp = cnt
    cnt = cnt !== undefined ? cnt : this.getInt32()
    try {
      const tmp = new Uint8Array(this.buffer, this.position, cnt * 2)
      const res = new Int16Array(tmp.buffer, 0, cnt)
      this.position += tmp.byteLength
      return res
    }
    catch (error) {
      console.log("getInt16Array", cntp, cnt, error, this)
    }
  }

  getUint16Array(cnt: number) {
    cnt = cnt !== undefined ? cnt : this.getInt32()
    const res = new Uint16Array(this.buffer, this.position, cnt)
    this.position += res.byteLength
    return res
  }

  getInt32Array(cnt: number) {
    cnt = cnt !== undefined ? cnt : this.getInt32()
    const res = new Int32Array(this.buffer, this.position, cnt)
    this.position += res.byteLength
    return res
  }

  getUint32Array(cnt: number) {
    cnt = cnt !== undefined ? cnt : this.getInt32()
    const res = new Uint32Array(this.buffer, this.position, cnt)
    this.position += res.byteLength
    return res
  }
}
