import { join } from "path"
import { DatDatabaseType } from "./DatDatabaseType"
import { DatDatabase } from "./DatDatabase"
import type DatFile from "./DatFile"

const loaders: Record<string, DatLoader> = {}

export async function getOrCreateDatLoader(datDirectory: string) {
  if (loaders[datDirectory]) {
    return loaders[datDirectory]
  }

  loaders[datDirectory] = new DatLoader(datDirectory)
  await loaders[datDirectory].init()
  return loaders[datDirectory]
}

export class DatLoader {
  datDirectory: string

  Cell: DatDatabase
  Portal: DatDatabase
  Language: DatDatabase

  constructor(datDirectory: string) {
    this.datDirectory = datDirectory

    this.Cell = new DatDatabase(join(datDirectory, "client_cell_1.dat"), DatDatabaseType.Cell)
    this.Portal = new DatDatabase(join(datDirectory, "client_portal.dat"), DatDatabaseType.Portal)
    this.Language = new DatDatabase(join(datDirectory, "client_local_English.dat"), DatDatabaseType.Language)
  }

  async init() {
    return await this.Cell.init() && await this.Portal.init() && await this.Language.init()
  }

  async getPortalFile<T extends DatFile>(id: number, fileCtor: new () => T): Promise<T | null> {
    return await this.Portal.getFile<T>(id, fileCtor)
  }

  close() {
    this.Cell.close()
    this.Portal.close()
    this.Language.close()
  }
}
