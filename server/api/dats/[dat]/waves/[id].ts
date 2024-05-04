import { join } from "path"
import { getOrCreateDatLoader } from "~/util/dats/DatLoader"
import Wave from "~/util/dats/filetypes/Wave"

const storage = useStorage("DATS")

export default defineEventHandler(async (event) => {
  const datDirectory = useRuntimeConfig(event).datDirectory
  const datName = String(event.context.params?.dat)
  const fileId = Number(event.context.params?.id)
  const respondWithStream = !!getQuery(event)?.stream
  const availableDats = (await storage.getItem<string[]>("available")) ?? []

  if (!availableDats.includes(datName) || (fileId <= 0x0A000000 || fileId >= 0x0A00FFFF)) {
    throw createError({
      statusCode: 404,
      statusMessage: `Invalid dat file: ${("00000000" + fileId.toString(16)).slice(-8)}`,
    })
  }

  const dat = await getOrCreateDatLoader(join(datDirectory, datName))
  const wave = await dat.Portal.getFile(fileId, Wave)

  if (wave && wave.header && wave.body) {
    if (respondWithStream) {
      // data stream logic ripped from ACE
      const arr = new Uint8Array(wave.body.length + 44)
      const dv = new DataView(arr.buffer)
      const txtEncoder = new TextEncoder()

      let offset = 0

      const riffText = txtEncoder.encode("RIFF")
      for (let i = 0; i < riffText.length; i++) {
        dv.setUint8(offset++, riffText[i])
      }

      dv.setUint32(offset, wave.body.length + 36, true)
      offset += 4

      const wavText = txtEncoder.encode("WAVE")
      for (let i = 0; i < wavText.length; i++) {
        dv.setUint8(offset++, wavText[i])
      }

      const fmtText = txtEncoder.encode("fmt")
      for (let i = 0; i < fmtText.length; i++) {
        dv.setUint8(offset++, fmtText[i])
      }
      dv.setUint8(offset++, 0x20) // null ending to fmt

      dv.setInt32(offset, 0x10, true)
      offset += 4

      // AC audio headers start at Format Type,
      // and are usually 18 bytes, with some exceptions
      // notably objectID A000393 which is 30 bytes

      // WAV headers are always 16 bytes from Format Type to end of header,
      // so this extra data is truncated here.
      for (let i = 0; i < 16; i++) {
        dv.setInt8(offset++, wave.header[i])
      }

      const dataText = txtEncoder.encode("data")
      for (let i = 0; i < dataText.length; i++) {
        dv.setUint8(offset++, dataText[i])
      }

      dv.setUint32(offset, wave.body.length, true)
      offset += 4

      for (let i = 0; i < wave.body.length; i++) {
        dv.setUint8(offset++, wave.body[i])
      }

      const stream = new ReadableStream({
        start(controller) {
          controller.enqueue(arr)
          controller.close()
        },
      })

      if (wave.header[0] == 0x55) {
        setResponseHeaders(event, {
          "Content-Disposition": `attachment; filename=${("00000000" + fileId.toString(16)).slice(-8)}.mp3`,
          "Content-Type": "audio/mp3",
        })
      }
      else {
        setResponseHeaders(event, {
          "Content-Disposition": `attachment; filename=${("00000000" + fileId.toString(16)).slice(-8)}.wav`,
          "Content-Type": "audio/wav",
        })
      }

      sendStream(event, stream)
    }
    else {
      return {
        id: wave.fileId,
        header: wave.header,
        body: wave.body,
      }
    }
  }
  else {
    throw createError({
      statusCode: 404,
    })
  }
})
