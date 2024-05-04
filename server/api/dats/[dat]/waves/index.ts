import { join } from "path"
import { getOrCreateDatLoader } from "~/util/dats/DatLoader"

const storage = useStorage("DATS")

export default defineEventHandler(async (event) => {
  const datDirectory = useRuntimeConfig(event).datDirectory
  const datName = String(event.context.params?.dat)
  const availableDats = (await storage.getItem<string[]>("available")) ?? []

  if (!availableDats.includes(datName)) {
    throw createError({
      statusCode: 404,
      statusMessage: "Invalid dat file",
    })
  }

  const dat = await getOrCreateDatLoader(join(datDirectory, datName))
  const waves = await dat.Portal.getFileEntries(0x0A000000, 0x0A00FFFF)

  return waves.map(w => w.id)
})
