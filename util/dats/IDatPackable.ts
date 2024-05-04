import type DatReader from "./DatReader"

export interface Unpack {
  (reader: DatReader): Promise<boolean>
}

export interface IDatPackable {
  unpack: Unpack
}
