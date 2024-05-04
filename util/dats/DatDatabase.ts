import type { FileHandle } from "node:fs/promises"
import { open } from "node:fs/promises"
import type { DatDatabaseType } from "./DatDatabaseType"
import DatReader from "./DatReader"
import { DatDirectory } from "./DatDirectory"
import type { DatFileEntry } from "./DatDirectory"
import type DatFile from "./DatFile"

export class DatDatabase {
  filepath: string
  type: DatDatabaseType

  fileHandle: FileHandle | undefined
  reader: DatReader | undefined

  fileCache: Record<number, DatFileEntry> = {}
  directoryCache: Record<number, DatDirectory> = {}

  magic: number = 0
  blockSize: number = 0
  fileSize: number = 0
  dbType: number = 0
  subType: number = 0
  freeStart: number = 0
  freeEnd: number = 0
  freeCount: number = 0
  root: number = 0

  newLRU: number = 0
  oldLRU: number = 0
  useLRU: number = 0

  masterMap: number = 0

  versionEngine: number = 0
  versionGame: number = 0
  versionMajor: Uint8Array | undefined
  versionMinor: number = 0

  constructor(filepath: string, type: DatDatabaseType) {
    this.filepath = filepath
    this.type = type
  }

  async init() {
    try {
      this.fileHandle = await open(this.filepath, "r")

      if (this.fileHandle) {
        await this.#readHeader()
      }

      // await this.loadFileCache()

      return true
    }
    catch (e) {
      console.error(`Error opening ${this.type} dat file: ${this.filepath}`)
    }

    return false
  }

  async #readHeader() {
    const dv = new DataView(new ArrayBuffer(64 + 16 + 4))
    await this.fileHandle?.read(dv, 0, 64 + 16 + 4, 256 + 64)

    const reader = new DatReader(dv)
    this.reader = reader

    this.magic = reader.getUint32()
    this.blockSize = reader.getUint32()
    this.fileSize = reader.getUint32()
    this.dbType = reader.getUint32()
    this.subType = reader.getUint32()
    this.freeStart = reader.getUint32()
    this.freeEnd = reader.getUint32()
    this.freeCount = reader.getUint32()
    this.root = reader.getUint32()

    this.newLRU = reader.getUint32()
    this.oldLRU = reader.getUint32()
    this.useLRU = reader.getUint32()

    this.masterMap = reader.getUint32()

    this.versionEngine = reader.getUint32()
    this.versionGame = reader.getUint32()
    this.versionMajor = reader.getUint8Array(16)
    this.versionMinor = reader.getUint32()
  }

  async getFile<T extends DatFile>(id: number, fileCtor: new () => T): Promise<T | null> {
    try {
      let fe: DatFileEntry | null = this.fileCache[id]
      if (!fe) {
        fe = await this.#findFile(id)
      }
      if (fe) {
        const file = new fileCtor()
        await file.unpack(this, fe.offset, fe.size)
        return file
      }
    }
    catch (e) { console.error(e) }
    return null
  }

  async getFileEntries(min: number, max: number, parent: number = 0) {
    let entries: DatFileEntry[] = []
    parent = parent == 0 ? this.root : parent

    const entry = await this.#getDirectory(parent)
    const cachedFiles = this.#cacheFiles(entry)

    for (const file of cachedFiles) {
      if (file.id >= min && file.id <= max) {
        entries.push(file)
      }
    }

    for (let i = 0; i < 62; i++) {
      const offset = entry.folders![i]
      if (offset != 0 && offset != 0xcdcdcd && offset < this.fileSize) {
        const newEntries = await this.getFileEntries(min, max, offset)
        entries = entries.concat(newEntries)
      }
      else {
        break
      }
    }

    return entries
  }

  async #getDirectory(id: number) {
    if (!this.directoryCache[id]) {
      const entry = new DatDirectory(this, id)
      await entry.load()
      this.directoryCache[id] = entry
      return entry
    }
    return this.directoryCache[id]
  }

  async #findFile(id: number) {
    let current = this.root
    // console.log("find file", id.toHexStr(), current.toHexStr());
    let lastCurrent = 0
    while (current !== 0 && current !== 0xcdcdcdcd) {
      const entry = await this.#getDirectory(current)

      this.#cacheFiles(entry)

      let l = 0
      let r = entry.fileCount - 1
      let i = 0

      while (l <= r) {
        i = ((l + r) / 2) | 0
        let fe = null
        try {
          fe = entry.files[i]
        }
        catch (error) {
          console.error("failed to get fileEntry", current, i, entry.fileCount)
        }
        if (!fe) {
          console.error("failed to get fileEntry", current, i, entry.fileCount)
        }

        if (id === fe?.id) {
          return fe
        }
        else if (fe && id < fe.id) {
          r = i - 1
        }
        else {
          l = i + 1
        }
      }

      if (entry.isLeaf)
        break

      if (id > entry.files[i].id)
        i++

      current = entry.folders![i]
      if (lastCurrent == current) {
        console.error(`dat directory looping... ${current}: ${(entry.folders || []).join(",")}`)
        break
      }
      lastCurrent = current
    }
    return null
  }

  #cacheFiles(node: DatDirectory) {
    const cached: DatFileEntry[] = []
    for (let i = 0; i < node.fileCount; i++) {
      const f = node.files[i]
      if (!f) {
        break
      }
      this.fileCache[f.id] = f
      cached.push(f)
    }

    return cached
  }

  async loadFileCache() {
    const dir = await this.#getDirectory(this.root)
    await this.#loadDirectoryFiles(dir)
  }

  async #loadDirectoryFiles(node: DatDirectory) {
    try {
      this.#cacheFiles(node)
      if (!node.isLeaf) {
        for (let i = 0; i < 62; i++) {
          const offset = node.folders![i]
          // if (offset > this.fileSize) console.log('node offset', offset.toHexStr());
          if (offset != 0 && offset != 0xcdcdcd && offset < this.fileSize) {
            const dir = await this.#getDirectory(offset)
            this.#loadDirectoryFiles(dir)
          }
        }
      }
    }
    catch (e) { console.error(e) }
  }

  close() {
    this.fileHandle?.close()
  }
}
