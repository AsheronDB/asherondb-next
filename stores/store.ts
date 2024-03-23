// store/filters.js
import { defineStore } from "pinia";
import { useRuntimeConfig } from "#app";

export const useStore = defineStore("store", () => {
  const primaryNav = ref([
    {
      label: "Servers",
      path: "/servers",
    },
    {
      label: "Tools",
      path: "/tools",
      disabled: true,
      children: [
        [
          {
            label: "Dereth Time Calculator",
            disabled: true,
          },
        ],
      ],
    },
  ]);

  return {
    primaryNav,
  };
});
