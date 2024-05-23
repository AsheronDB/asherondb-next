<template>
  <Page>
    <div class="pt-4">
      <article v-for="article in data" :key="article._id">
        <nuxt-link :to="article._path" class="underline">
          {{ article.title }}
        </nuxt-link>
      </article>
    </div>
  </Page>
</template>

<script setup>
const route = useRoute();
console.log(route);

definePageMeta({
  title: "Support",
});

const { data } = await useAsyncData("support", () =>
  queryContent("support")
    .sort({ date: -1 })
    // .where({ tags: { $containsAny: ["announcement"] } })
    .find()
);

console.log(data);
</script>
