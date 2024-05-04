export default cachedEventHandler(async () => {
  return await useStorage("DATS").getItem<string[]>("available")
})
