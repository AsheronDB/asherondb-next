<template>
  <header
    class="flex-0 sticky top-0 z-50 border-b border-[#131313] bg-[#642625] bg-[url('~/assets/img/header-bg.png')] bg-repeat-x px-6 py-4 pt-8 text-white shadow-lg"
  >
    <div class="flex w-full space-x-6 rounded-lg">
      <div class="flex-0 flex items-center">
        <h1 class="hidden h-full font-bold lg:block">
          <nuxt-link
            to="/"
            class="block h-full w-36 bg-[url('~/assets/img/acdb-logo.png')] bg-contain bg-center bg-no-repeat"
          />
        </h1>
        <h1 class="block h-full font-bold lg:hidden">
          <nuxt-link
            to="/"
            class="block h-full w-10 bg-[url('~/assets/img/asherondb-seal-3d.png')] bg-contain bg-center bg-no-repeat"
          />
        </h1>
      </div>

      <div class="flex flex-1 space-x-6">
        <div class="flex-0">
          <SiteHeaderNav />
        </div>
        <div class="flex-1">
          <SiteHeaderSearch />
        </div>

        <!-- <nuxt-link to="/servers">
          Server Tracker
        </nuxt-link> -->
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
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
