import type { DatDatabase } from "../DatDatabase"
import DatFile from "../DatFile"
import { SkillBase } from "../entities/SkillBase"

export default class SkillTable extends DatFile {
  static readonly FILE_ID = 0x0E000004

  skills: Record<number, SkillBase> = {}

  async unpack(db: DatDatabase, offset: number, size: number) {
    if (await super.unpack(db, offset, size) && this.reader) {
      const totalObjects = this.reader.getUint16()
      /* const bucketSize = */this.reader.getUint16()

      for (let i = 0; i < totalObjects; i++) {
        const key = this.reader.getUint32()

        const item = new SkillBase()
        await item.unpack(this.reader)

        this.skills[key] = item
      }
    }
    return false
  }
}
