<template>
  <header
    class="flex-0 sticky top-0 px-6 py-6 z-50 border-b-2 border-[#131313] bg-[#6e2b26] text-white">
    <div class="flex w-full rounded-lg space-x-6">
      <div class=" flex flex-0 items-center">
        <h1 class="font-bold">
          <nuxt-link to="/"> AsheronDB </nuxt-link>
        </h1>
      </div>

      <div class="flex flex-1  space-x-6">
        <div class="flex-0">
          <UButtonGroup size="md" orientation="horizontal">
            <template v-for="item in primaryNav">
              <UDropdown
                :items="item.children"
                :popper="{ placement: 'bottom' }"
                mode="hover"
                :disabled="item.disabled"
                v-if="item.children">
                <UButton
                  color="white"
                  :label="item.label"
                  :disabled="item.disabled"
                
                  trailing-icon="i-heroicons-chevron-down-20-solid" />
              </UDropdown>
              <UButton
                :label="item.label"
                color="red"
                :to="item.to"
                :disabled="item.disabled"
                v-else />
            </template>
          </UButtonGroup>
        </div>
        <div class="flex-1">
          <UInput
            icon="i-heroicons-magnifying-glass-20-solid"
            size="md"
            color="white"
            :trailing="false"
            disabled
            placeholder="Search..." />
        </div>

        <!-- <nuxt-link to="/servers">
          Server Tracker
        </nuxt-link> -->
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const store = useStore();
const { primaryNav } = storeToRefs(store);
</script>
