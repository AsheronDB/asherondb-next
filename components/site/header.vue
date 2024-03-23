<template>
  <header class="sticky top-0 bg-gray-100 p-4 z-50 border-b">
    <div class="flex w-full rounded-lg text-gray-800">
      <div class="mr-auto flex flex-1 items-center">
        <h1 class="font-bold">
          <nuxt-link to="/">
            AsheronDB
          </nuxt-link>
        </h1>
      </div>

      <div class="flex-0 items-center">
        <nuxt-link to="/servers">
          Server Tracker
        </nuxt-link>
      </div>
      <div class="ml-auto flex flex-1 justify-end" />
    </div>
  </header>
</template>
