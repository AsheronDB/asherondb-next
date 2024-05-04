import { readdir } from "node:fs/promises"

export default defineNitroPlugin(async () => {
  const storage = useStorage("DATS")
  const datDirectory = useRuntimeConfig().datDirectory

  try {
    const files = await readdir(datDirectory)
    await storage.setItem<string[]>("available", files)

    console.log(`Dats fetched succesfully! (${files.join(", ")})`)
  }
  catch (err) {
    console.error(`Error reading datDirectory (${datDirectory}): ${err}`)
  }
})
