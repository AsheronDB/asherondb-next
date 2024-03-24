<template>
  <div>
    <PageBreadcrumb />
    <div class="p-4">
      <div class="border-2 border-primary-800 bg-primary-950 mb-6">
        <div class="border-b-2 border-primary-800 p-6">
          <h2
            class="text-3xl font-serif text-primary-400 font-normal text-center">
            Cow
          </h2>
        </div>
        <div class="flex w-full rounded-lg text-gray-800">
          <div class="mr-auto flex flex-1 items-center">
            <p class="p-6 text-gray-400">Icon</p>
          </div>
          <nav
            class="flex-0 hidden items-center lg:flex text-center p-3 font-serif font-normal text-gray-400">
            Species<br />Title<br />Attackable
          </nav>
          <div class="ml-auto flex flex-1 justify-end items-stretch">
            <div class="border-l-2 border-primary-800 px-6 py-3 text-center leading-none flex flex-col items-center justify-center">
              <p class="text-gray-400 text-sm font-serif leading-none">Level</p>
              <p class="text-primary-400 text-4xl font-normal font-serif leading-none">20</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();

// definePageMeta({
//   title: "zxczxc",
// });
</script>
