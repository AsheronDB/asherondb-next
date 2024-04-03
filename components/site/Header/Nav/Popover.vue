<template>
  <UPopover
    :popper="{ placement: 'bottom-start' }"
    mode="hover"
    open="true"
    :ui="popoverUI">
    <UButton
      color="acred"
      :label="item.label"
      :disabled="item.disabled"
      size="md"
      trailing-icon="i-heroicons-chevron-down-20-solid" />

    <template #panel="{ close }">
      <div class="py-4 px-6">
        <div class="grid grid-cols-3 gap-12 text-black">
          <div
            v-for="column in item.children"
            :key="column.label"
            class="space-y-1.5">
            <p class="font-bold font-serif text-sm">
              {{ column.label }}
            </p>

            <ul v-if="column.children">
              <li v-for="child in column.children" :key="child.label">
                <UDropdown
                  v-if="child.children"
                  :items="
                    child.children.map((group) =>
                      group.map((groupChild) => ({
                        ...groupChild,
                        click: () => close(),
                      }))
                    )
                  "
                  mode="hover"
                  :popper="{ offsetDistance: 0, placement: 'right-start' }"
                  :ui="dropdownUI">
                  <!-- <p>{{ child.label }}</p> -->

                  <div
                    class="flex-1 flex justify-between items-center relative truncate font-serif block py-1 px-3 rounded hover:bg-actan-500">
                    <div class="text-sm flex flex-col justify-center">
                      {{ child.label }}
                    </div>
                    <div class="text-lg flex flex-col justify-center">
                      <UIcon name="i-heroicons-chevron-right-20-solid" />
                    </div>
                  </div>

                  <!-- <UButton
                    block
                    trailing-icon="i-heroicons-chevron-right-20-solid"
                    :ui="childButtonUI"
                    size="md"
                    color="black"
                    variant="link">
                    {{ child.label }}
                  </UButton> -->

                  <!-- <p class="block w-full"></p> -->
                </UDropdown>

                <nuxt-link
                  v-else
                  :to="child.to"
                  class="font-serif text-sm block py-1 px-3 rounded hover:bg-actan-500">
                  {{ child.label }}
                </nuxt-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </template>

    <!-- <div class="text-left">
                    <p>Signed in as</p>
                    <p
                      class="truncate font-medium text-gray-900 dark:text-white">
                      {{ item.label }}
                    </p>
                  </div> -->
  </UPopover>
</template>

<script setup lang="ts">
const props = defineProps(["item"]);
const { item } = toRefs(props);

const popoverUI = {
  wrapper: "relative",
  container: "z-50 group",
  trigger: "inline-flex w-full",
  width: "",
  background: "bg-actan-400 dark:bg-gray-900",
  shadow: "shadow-lg",
  rounded: "rounded-md",
  ring: "ring-1 ring-primary-600",
  base: "overflow-hidden focus:outline-none relative",
  transition: {
    enterActiveClass: "transition ease-out duration-200",
    enterFromClass: "opacity-0 translate-y-1",
    enterToClass: "opacity-100 translate-y-0",
    leaveActiveClass: "transition ease-in duration-150",
    leaveFromClass: "opacity-100 translate-y-0",
    leaveToClass: "opacity-0 translate-y-1",
  },
  overlay: {
    base: "fixed inset-0 transition-opacity z-50",
    background: "bg-gray-200/75 dark:bg-gray-800/75",
    transition: {
      enterActiveClass: "ease-out duration-200",
      enterFromClass: "opacity-0",
      enterToClass: "opacity-100",
      leaveActiveClass: "ease-in duration-150",
      leaveFromClass: "opacity-100",
      leaveToClass: "opacity-0",
    },
  },
  popper: {
    strategy: "fixed",
  },
  default: {
    openDelay: 0,
    closeDelay: 0,
  },
  arrow: {
    base: "invisible before:visible before:block before:rotate-45 before:z-[-1] before:w-2 before:h-2",
    ring: "before:ring-1 before:ring-gray-200 dark:before:ring-gray-800",
    rounded: "before:rounded-sm",
    background: "before:bg-gray-200 dark:before:bg-gray-800",
    shadow: "before:shadow",
    placement:
      "group-data-[popper-placement*='right']:-left-1 group-data-[popper-placement*='left']:-right-1 group-data-[popper-placement*='top']:-bottom-1 group-data-[popper-placement*='bottom']:-top-1",
  },
};

const dropdownUI = {
  wrapper: "relative flex text-left rtl:text-right",
  container: "z-20 group",
  trigger: "flex w-full",
  width: "w-48",
  height: "",
  background: "bg-actan-400 dark:bg-gray-800",
  shadow: "shadow-xl",
  rounded: "rounded-md",
  ring: "ring-2 ring-primary-600",
  base: "relative focus:outline-none overflow-y-auto scroll-py-1",
  divide: "divide-y divide-primary-600 dark:divide-gray-700",
  padding: "p-1",
  item: {
    base: "group flex items-center gap-1.5 w-full",
    rounded: "rounded-md",
    padding: "px-1.5 py-1.5",
    size: "text-sm",
    active: "bg-actan-300 text-gray-900",
    inactive: "text-gray-700 hover:bg-actan-200 dark:text-gray-200",
    disabled: "cursor-not-allowed opacity-50",
    icon: {
      base: "flex-shrink-0 w-5 h-5",
      active: "text-gray-500 dark:text-gray-400",
      inactive: "text-gray-400 dark:text-gray-500",
    },
    avatar: {
      base: "flex-shrink-0",
      size: "2xs",
    },
    label: "truncate",
    shortcuts: "hidden md:inline-flex flex-shrink-0 gap-0.5 ms-auto",
  },
  transition: {
    enterActiveClass: "transition duration-100 ease-out",
    enterFromClass: "transform scale-95 opacity-0",
    enterToClass: "transform scale-100 opacity-100",
    leaveActiveClass: "transition duration-75 ease-in",
    leaveFromClass: "transform scale-100 opacity-100",
    leaveToClass: "transform scale-95 opacity-0",
  },
  popper: {
    placement: "bottom-end",
    strategy: "fixed",
  },
  default: {
    openDelay: 0,
    closeDelay: 0,
  },
  arrow: {
    base: "invisible before:visible before:block before:rotate-45 before:z-[-1] before:w-2 before:h-2",
    ring: "before:ring-1 before:ring-gray-200 dark:before:ring-gray-700",
    rounded: "before:rounded-sm",
    background: "before:bg-white dark:before:bg-gray-700",
    shadow: "before:shadow",
    placement:
      "group-data-[popper-placement*='right']:-left-1 group-data-[popper-placement*='left']:-right-1 group-data-[popper-placement*='top']:-bottom-1 group-data-[popper-placement*='bottom']:-top-1",
  },
};

const childButtonUI = {
  base: "border-0 text-left",
  font: "font-normal font-serif",
  rounded: "",
  truncate: "text-left break-all line-clamp-1",
  block: "w-full flex justify-start items-start",
  inline: "inline-flex items-center",
};
</script>
