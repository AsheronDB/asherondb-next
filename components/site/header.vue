<template>
  <header
    class="flex-0 sticky top-0 px-6 py-4 pt-8 z-50 border-b shadow-lg border-[#131313] bg-[#642625] text-white bg-repeat-x bg-[url('~/assets/img/header-bg.png')]">
    <div class="flex w-full rounded-lg space-x-6">
      <div class="flex flex-0 items-center">
        <h1 class="font-bold h-full hidden lg:block">
          <nuxt-link to="/" class="block bg-center bg-no-repeat bg-contain bg-[url('~/assets/img/acdb-logo.png')] h-full w-36"></nuxt-link>
        </h1>
        <h1 class="font-bold h-full block lg:hidden">
          <nuxt-link to="/" class="block bg-center bg-no-repeat bg-contain bg-[url('~/assets/img/asherondb-seal-3d.png')] h-full w-10"></nuxt-link>
        </h1>
      </div>

      <div class="flex flex-1 space-x-6">
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
                  color="acred"
                  :label="item.label"
                  :disabled="item.disabled"
                  size="md"
                  trailing-icon="i-heroicons-chevron-down-20-solid" />
              </UDropdown>
              <UButton
                :label="item.label"
                color="acred"
                :to="item.to"
                size="md"
                :disabled="item.disabled"
                v-else />
            </template>
          </UButtonGroup>
        </div>
        <div class="flex-1">

          <FormInput placeholder="Search database... " size="md"><UButton color="acred" size="md">Search</UButton></FormInput>
          <!-- <UInput
            icon="i-heroicons-magnifying-glass-20-solid"
            size="md"
            color="white"
            :trailing="false"
            disabled
            placeholder="Search..." /> -->
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

<style scoped>

/* .logo {
    position: relative;
    height: 100%;
    display: block;
    font-size: 1rem;
    background: transparent url("/assets/img/acdb-logo.png") no-repeat 0 0;
    background-size: 100% auto;
    background-position: center 90;
    text-indent: -5000em;
    width: 150px;
} */

</style>
