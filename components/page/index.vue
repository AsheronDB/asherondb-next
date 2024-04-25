<template>
  <div>
    <header>
      <PageBreadcrumb v-if="route.meta.breadcrumb == true || route.meta.breadcrumb !== false" />
      <PageHeader v-if="route.meta.breadcrumb == true || route.meta.breadcrumb !== false">
        <template
          v-if="$slots.kicker"
          #kicker
        >
          <slot name="kicker" />
        </template>
        <template
          v-if="$slots.deck"
          #deck
        >
          <slot name="deck" />
        </template>
      </PageHeader>
      <div v-if="$slots?.header">
        <slot name="header" />
      </div>
    </header>

    <div
      class="group-[.narrow]/layout:container group-[.narrow]/layout:mx-auto group-[.three-column]/layout:grid group-[.two-column]/layout:grid group-[.three-column]/layout:grid-cols-5 group-[.two-column]/layout:grid-cols-5 group-[.three-column]/layout:gap-8 group-[.two-column]/layout:gap-3"
    >
      <template v-if="$slots?.sidebar && !$slots?.linkbar">
        <div class="col-span-1">
          <slot name="sidebar" />
        </div>
        <div class="col-span-4">
          <slot />
        </div>
      </template>
      <template v-else-if="$slots?.sidebar && $slots?.linkbar">
        <div class="col-span-1">
          <slot name="sidebar" />
        </div>
        <div class="col-span-3">
          <slot />
        </div>
        <div class="col-span-1">
          <slot name="linkbar" />
        </div>
      </template>
      <template v-else-if="!$slots?.sidebar && $slots?.linkbar">
        <div class="col-span-4">
          <slot />
        </div>
        <div class="col-span-1">
          <slot name="linkbar" />
        </div>
      </template>
      <template v-else>
        <slot />
      </template>
    </div>
    <footer v-if="$slots?.footer">
      <slot name="footer" />
    </footer>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
</script>
