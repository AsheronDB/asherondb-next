// store/filters.js
import { defineStore } from "pinia";

export const useStore = defineStore("store", () => {
  const primaryNav = ref([
    {
      label: "Database",
      slot: "database",
      to: "/database",
      columns: [
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
              to: "/database/items",
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
                    exact: true,
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
              label: "Levels",
              to: "/database/levels",
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
                    to: "/database/objects",
                  },
                  {
                    label: "Bindstones",
                    to: "/database/objects",
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
            {
              label: "Patches",
              to: "/database/patches",
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
      children: [
        [
          {
            label: "How to Play",
            to: "/guides/how-to-play"
          }
        ],
      ],
    },
    {
      label: "Tools",
      to: "/tools",
      disabled: true,
      children: [
        [
          {
            label: "Character Planner",
            to: "https://planner.treestats.net/",
            external: true,
            target: "_blank"
          }
        ],
      ],
    },
  ]);

  return {
    primaryNav,
  };
});
