// store/filters.js
import { defineStore } from "pinia";

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
                  },
                ],
              ],
            },

            {
              label: "Item Sets",
              to: "/database/item-sets",
            },
            {
              label: "Item Upgrades",
              to: "/database/item-upgrades",
            },
            {
              label: "Rare Items",
              to: "/database/items/rare",
            },
          ],
        },
        {
          label: "Character",
          children: [
            {
              label: "Spells",
              to: "/database/spells",
              children: [
                [
                  {
                    label: "All Spells",
                    to: "/database/spells",
                  },
                ],
                [
                  {
                    label: "War Magic",
                    to: "/database/spells?school=war",
                  },
                  {
                    label: "Life Magic",
                    to: "/database/spells?school=life",
                  },
                  {
                    label: "Creature Magic",
                    to: "/database/spells?school=creature",
                    exact: true
                  },
                  {
                    label: "Item Magic",
                    to: "/database/spells?school=item",
                  },
                ],

                [
                  {
                    label: "Spell Groups",
                    to: "/database/spell-groups",
                  },
                ],
              ],
            },
            {
              label: "Augmentations",
              to: "/database/augmentations",
            },
            {
              label: "Luminance Auras",
              to: "/database/luminance-auras",
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
            },
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
                  },
                ],
              ],
            },
            {
              label: "Objects",
              to: "/database/objects",
              children: [
                [
                  {
                    label: "Lifestones",
                    to: "/database/objects/lifestones",
                  },
                  {
                    label: "Bindstones",
                    to: "/database/objects/bindstones",
                  },
                ],
              ],
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
