// store/filters.js
import { defineStore } from "pinia";
import { useRuntimeConfig } from "#app";

export const useStore = defineStore("store", () => {
  const primaryNav = ref([
    {
      label: "Database",
      slot: "database",
      to: "/database",
      children: [
        {
          label: "Items",
          children: [
            {
              label: "Items",
              to: "/database/items",
              children: [
                [
                  {
                    label: "Armor",
                    to: "/database/items/armor",
                  },
                  {
                    label: "Weapons",
                    to: "/database/items/weapons",
                  }
                ],
              ],
            },
            {
              label: "Item Sets",
              to: "/database/item-sets",
            },
          ],
        },
        {
          label: "Character",
          children: [
            {
              label: "Spells",
              to: "/database/spells",
            },
            {
              label: "Titles",
              to: "/database/titles",
            },
            {
              label: "Races",
              to: "/database/races",
            },
            {
              label: "Templates",
              to: "/database/templates",
            }
          ],
        },
        {
          label: "World",
          children: [
            {
              label: "NPCs",
              to: "/database/npcs",
              children: [
                [
                  {
                    label: "Vendors",
                    to: "/database/npcs/vendors",
                  },
                  {
                    label: "Creatures",
                    to: "/database/npcs/creatures",
                  }
                ],
              ],
            },
            {
              label: "Objects",
              to: "/database/objects",
            },
            {
              label: "Quests",
              to: "/database/quests",
            },
            {
              label: "Dungeons",
              to: "/database/dungeons",
            },
          ],
        },
      ],
    },
    {
      label: "Servers",
      to: "/servers",
    },
    {
      label: "Guides",
      to: "/guides",
      disabled: true,
    },
    {
      label: "Tools",
      to: "/tools",
      disabled: true,
    },
  ]);

  return {
    primaryNav,
  };
});
