import type { DatDatabase } from "./DatDatabase"
import DatReader from "./DatReader"

export default class DatFile {
  data: Uint8Array | undefined
  fileId: number = 0
  reader?: DatReader

  async unpack(db: DatDatabase, offset: number, size: number) {
    let read = size
    let blk_offset = offset
    let data_offset = 0

    this.data = new Uint8Array(size)

    while (read > 0) {
      const cnt = Math.min(db.blockSize - 4, read)
      const block = new DataView(new ArrayBuffer(db.blockSize))
      await db.fileHandle?.read(block, 0, cnt, blk_offset)
      this.data.set(new Uint8Array(block.buffer, 4, cnt), data_offset)

      data_offset += cnt
      read -= cnt
      blk_offset = block.getInt32(0, true)
    }

    this.reader = new DatReader(new DataView(this.data.buffer))
    this.fileId = this.reader.getUint32()

    return true
  }

  pack(db: DatDatabase) {
    return Promise.reject(`Not implemented... ${db}`)
  }
}
