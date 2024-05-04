import { defineStore } from "pinia"

export const useDatStore = defineStore("dat", {
  state: () => ({
    _current: null,
  }),
  getters: {
    available() {
      return useNuxtApp().$availableDats ?? []
    },
    current(state): string | null {
      return (state._current ?? (this.available.length > 0 ? this.available[0] : null))
    },
  },
})
