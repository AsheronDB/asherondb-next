import type { DatDatabase } from "./DatDatabase"

export interface DatFileEntry {
  flag: number
  id: number
  offset: number
  size: number
  time: number
  version: number
}

export class DatDirectory {
  dat: DatDatabase
  offset: number
  folders: Uint32Array | null = null
  files: DatFileEntry[] = []
  fileCount = -1
  isLeaf = true

  constructor(dat: DatDatabase, offset: number) {
    this.dat = dat
    this.offset = offset
  }

  async load() {
    let blk_offset = this.offset
    let data_offset = 4

    const dat = this.dat

    const block = new DataView(new ArrayBuffer(this.dat.blockSize))
    await dat.fileHandle?.read(block, 0, this.dat.blockSize, blk_offset)

    const folderData = new DataView(new ArrayBuffer(62 * 4))
    await dat.fileHandle?.read(folderData, 0, 62 * 4, blk_offset + data_offset)

    this.folders = new Uint32Array(folderData.buffer, 0, 62)
    data_offset += 248 // 62 * 4;

    this.isLeaf = !this.folders[0]
    this.fileCount = block.getInt32(data_offset, true)
    if (this.fileCount > 61)
      console.log("node entry count", this.offset, data_offset, this.fileCount)
    data_offset += 4

    const getEntryChunk = async function () {
      let need = 6
      const chunk = new Uint32Array(need)
      let left = Math.min(dat.blockSize - data_offset, need * 4)
      let idx = 0

      while (need > 0) {
        const cnt = (left / 4) | 0
        if (cnt > 0) {
          const tmpView = new DataView(new ArrayBuffer(cnt * 4))
          await dat.fileHandle?.read(tmpView, 0, cnt * 4, blk_offset + data_offset)
          const tmp = new Uint32Array(tmpView.buffer, 0, cnt)
          chunk.set(tmp, idx)
          need -= cnt
          idx += cnt

          if (need === 0) {
            data_offset += cnt * 4
            break
          }
        }

        blk_offset = block.getInt32(0, true)
        data_offset = 4

        await dat.fileHandle?.read(block, 0, dat.blockSize, blk_offset)

        left = Math.min(dat.blockSize - data_offset, need * 4)
      }

      return chunk
    }

    for (let i = 0; i < 61; i++) {
      const chunk = await getEntryChunk()
      const fe = {
        flag: chunk[0],
        id: chunk[1],
        offset: chunk[2],
        size: chunk[3],
        time: chunk[4],
        version: chunk[5],
      }
      this.files.push(fe)
    }
  }
}
