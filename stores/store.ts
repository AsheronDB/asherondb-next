// store/filters.js
import { defineStore } from "pinia";
import { useRuntimeConfig } from "#app";

export const useStore = defineStore("store", () => {
  const primaryNav = ref([
    {
      label: "Database",
      to: "/database",
      disabled: true,
      children: [
        [
          {
            label: "Creatures",
            to: "/database/creatures",
            disabled: true,
          },
          {
            label: "NPCs",
            to: "/database/npcs",
            disabled: true,
          },
          {
            label: "Armor",
            to: "/database/armor",
            disabled: true,
          },
          {
            label: "Weapons",
            to: "/database/weapons",
            disabled: true,
          },
        ],
      ],
    },
    {
      label: "Servers",
      to: "/servers",
    },
    {
      label: "Tools",
      to: "/tools",
      disabled: true,
      children: [
        [
          {
            label: "Dereth Time Calculator",
            to: "/tools/time",
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
