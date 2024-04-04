<template>
  <div>
    <header>
      <PageBreadcrumb />
      <PageHeader>
        <template #deck>
          <slot name="deck" />
        </template>
      </PageHeader>
      <div v-if="$slots?.header">
        <slot name="header" />
      </div>
    </header>

    <div
      class="group-[.two-column]/layout:grid group-[.two-column]/layout:grid-cols-2 group-[.two-column]/layout:gap-3 group-[.narrow]/layout:container group-[.narrow]/layout:mx-auto">
      <template v-if="$slots?.sidebar">
        <div>
          <slot name="sidebar" />
        </div>
        <div>
          <slot />
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
