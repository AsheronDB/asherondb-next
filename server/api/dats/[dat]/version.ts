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

  if (dat) {
    return {
      name: datName,
      cell: {
        versionEngine: dat.Cell.versionEngine,
        versionGame: dat.Cell.versionGame,
        versionMinor: dat.Cell.versionMinor,
        versionMajor: dat.Cell.versionMajor,
      },
      portal: {
        versionEngine: dat.Portal.versionEngine,
        versionGame: dat.Portal.versionGame,
        versionMinor: dat.Portal.versionMinor,
        versionMajor: dat.Portal.versionMajor,
      },
      language: {
        versionEngine: dat.Language.versionEngine,
        versionGame: dat.Language.versionGame,
        versionMinor: dat.Language.versionMinor,
        versionMajor: dat.Language.versionMajor,
      },
    }
  }
  else {
    throw createError({
      statusCode: 500,
    })
  }
})
