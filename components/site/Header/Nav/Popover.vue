<template>
  <UPopover
    :popper="{ placement: 'bottom-start' }"
    mode="hover"
    :ui="popoverUI"
  >
    <UButton
      color="acred"
      :label="item.label"
      :disabled="item.disabled"
      size="md"
      trailing-icon="i-heroicons-chevron-down-20-solid"
    />

    <template #panel="{ close }">
      <div
        class="py-4 px-6 "
        :class="[dropdownHovered ? 'bg-red-500' : '']"
      >
        <div class="grid grid-cols-3 gap-10 text-gray-100">
          <div
            v-for="column in item.columns"
            :key="column.label"
            class="space-y-1.5"
          >
            <div
              v-for="section in column"
              :key="section.label"
            >
              <p
                class="font-bold text-sm border-b border-gray-600 pb-1 text-gray-400"
              >
                {{ section.label }}
              </p>

              <ul
                v-if="section.children"
                class="space-y-0.5"
              >
                <li
                  v-for="child in section.children"
                  :key="child.label"
                >
                  <UDropdown
                    v-if="child.children"
                    :items="
                      child.children.map((group: object) =>
                        group.map((groupChild: object) => ({
                          ...groupChild,
                          click: () => close(),
                        })),
                      )
                    "
                    mode="hover"
                    :popper="{ offsetDistance: 0, placement: 'right-start' }"
                    :ui="dropdownUI"
                  >
                    <div
                      class="flex-1 flex justify-between items-center relative truncate block py-1.5 px-2 text-gray-200 rounded hover:bg-gray-600"
                    >
                      <div class="text-sm flex flex-col justify-center font-bold">
                        {{ child.label }}
                      </div>
                      <div class="text-lg flex flex-col justify-center">
                        <UIcon name="i-heroicons-chevron-right-20-solid" />
                      </div>
                    </div>
                  </UDropdown>

                  <nuxt-link
                    v-else
                    :to="child.to"
                    class="text-sm block py-1.5 px-2 rounded font-bold text-gray-200 [&.router-link-active]:bg-gray-600 hover:bg-gray-600"
                  >
                    {{ child.label }}
                  </nuxt-link>
                </li>
              </ul>
            </div>
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
const props = defineProps(["item"])
const { item } = toRefs(props)

const dropdownHovered = ref(false)

const popoverUI = {
  wrapper: "relative",
  container: "z-50 group",
  trigger: "inline-flex w-full",
  width: "",
  background: "bg-gray-700 dark:bg-gray-800",
  shadow: "shadow-xl",
  rounded: "rounded-md",
  ring: "ring-1 ring-gray-600",
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
}

const dropdownUI = {
  wrapper: "relative flex text-left rtl:text-right",
  container: "z-20 group",
  trigger: "flex w-full",
  width: "w-48",
  height: "",
  background: "bg-gray-700 dark:bg-gray-800",
  shadow: "shadow-xl",
  rounded: "rounded-md",
  ring: "ring-1 ring-gray-600",
  base: "relative focus:outline-none overflow-y-auto scroll-py-1",
  divide: "divide-y divide-gray-600 dark:divide-gray-700 ",
  padding: "p-1",
  item: {
    base: "group flex items-center gap-1.5 w-full font-sans font-bold text-gray-200 mb-0.5 last:mb-0",
    rounded: "rounded-md",
    padding: "px-1.5 py-1.5",
    size: "text-sm",
    active: "bg-gray-600 text-gray-100",
    inactive: "text-gray-100 hover:bg-gray-600 dark:text-gray-200",
  },
}

const _dropdownItemMouseOver = () => {
  console.log("dropdownItemMouseOver")
  dropdownHovered.value = true
}

const _dropdownItemMouseOut = () => {
  console.log("dropdownItemMouseOut")
  dropdownHovered.value = false
}
</script>

<style>
.dropdown-active {
  background: red !important;
}
</style>
