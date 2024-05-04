import { join } from "path"
import { getOrCreateDatLoader } from "~/util/dats/DatLoader"
import SkillTable from "~/util/dats/filetypes/SkillTable"

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
  const skillTable = await dat.Portal.getFile(SkillTable.FILE_ID, SkillTable)

  if (skillTable) {
    return Object.entries(skillTable.skills).map((skill) => {
      return {
        id: skill[0],
        ...skill[1],
      }
    })
  }
  else {
    throw createError({
      statusCode: 500,
    })
  }
})
