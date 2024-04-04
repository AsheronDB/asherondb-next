<template>
  <div>
    
    <div
      class="group-[.two-column]/layout:grid group-[.two-column]/layout:grid-cols-5 group-[.two-column]/layout:gap-3 group-[.three-column]/layout:grid group-[.three-column]/layout:grid-cols-5 group-[.three-column]/layout:gap-8 group-[.narrow]/layout:container group-[.narrow]/layout:mx-auto">
      <template v-if="$slots?.sidebar && !$slots?.linkbar">
        <div class="col-span-1">
          <slot name="sidebar" />
        </div>
        <div class="col-span-4">
          <PageHeaderArticle />
          <slot />
        </div>
      </template>
      <template v-else-if="$slots?.sidebar && $slots?.linkbar">
        <div class="col-span-1">
          <slot name="sidebar" />
        </div>
        <div class="col-span-3">
          <PageHeaderArticle />
          <slot />
        </div>
        <div class="col-span-1">
          <slot name="linkbar" />
        </div>
      </template>
      <template v-else-if="!$slots?.sidebar && $slots?.linkbar">
        <div class="col-span-4">
          <PageHeaderArticle />
          <slot />
        </div>
        <div class="col-span-1">
          <slot name="linkbar" />
        </div>
      </template>
      <template v-else>
        <PageHeaderArticle />
        <slot />
      </template>
    </div>
    <footer v-if="$slots?.footer">
      <slot name="footer" />
    </footer>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();

</script>
