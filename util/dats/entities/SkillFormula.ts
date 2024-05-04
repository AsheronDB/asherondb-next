import type DatReader from "../DatReader"
import type { IDatPackable } from "../IDatPackable"

export default class SkillFormula implements IDatPackable {
  W?: number
  X?: number
  Y?: number
  Z?: number
  Attr1?: number
  Attr2?: number

  get Divisor() { return this.X }
  set Divisor(value) { this.X = value }

  async unpack(reader: DatReader) {
    this.W = reader.getUint32()
    this.X = reader.getUint32()
    this.Y = reader.getUint32()
    this.Z = reader.getUint32()
    this.Attr1 = reader.getUint32()
    this.Attr2 = reader.getUint32()
    return !!reader
  }
}
