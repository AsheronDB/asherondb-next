import type DatReader from "../DatReader"
import type { IDatPackable } from "../IDatPackable"
import SkillFormula from "./SkillFormula"

export class SkillBase implements IDatPackable {
  description?: string
  name?: string
  iconId?: number
  trainedCost?: number
  specializedCost?: number
  category?: number
  chargenUse?: number
  minLevel?: number
  formula?: SkillFormula
  upperBound?: number
  lowerBound?: number
  learnMod?: number

  async unpack(reader: DatReader) {
    this.description = reader.getString()
    reader.align()
    this.name = reader.getString()
    reader.align()
    this.iconId = reader.getUint32()
    this.trainedCost = reader.getInt32()
    this.specializedCost = reader.getInt32()
    this.category = reader.getUint32()
    this.chargenUse = reader.getUint32()
    this.minLevel = reader.getUint32()
    this.formula = new SkillFormula()
    await this.formula.unpack(reader)
    this.upperBound = reader.getDouble()
    this.lowerBound = reader.getDouble()
    this.learnMod = reader.getDouble()
    return true
  }
}
