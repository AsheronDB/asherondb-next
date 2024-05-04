import type { DatDatabase } from "../DatDatabase"
import DatFile from "../DatFile"

export default class Wave extends DatFile {
  header?: Uint8Array
  body?: Uint8Array

  async unpack(db: DatDatabase, offset: number, size: number) {
    if (await super.unpack(db, offset, size) && this.reader) {
      const headerSize = this.reader.getInt32()
      const bodySize = this.reader.getInt32()

      this.header = this.reader.getUint8Array(headerSize)
      this.body = this.reader.getUint8Array(bodySize)
    }

    return true
  }
}
