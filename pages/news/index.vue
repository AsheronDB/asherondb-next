<template>
  <Page>
    <div>
      <article v-for="article in data">
        <nuxt-link
          :to="article._path"
          class="underline"
        >
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
  title: "News",
});
  // const articles = ref([
  //   { title: 'ACCPP Sesquiennial Report #2 - 1998 Pre-Beta "Preview 2" CD Acquired!', publishedAt: "Monday" },
  //   { title: "Lorem ipsum", publishedAt: "Monday" },
  //   { title: "Lorem ipsum", publishedAt: "Monday" },
  //   { title: "Lorem ipsum", publishedAt: "Monday" },
  //   { title: "Lorem ipsum", publishedAt: "Monday" },
  //   { title: "Lorem ipsum", publishedAt: "Monday" },
  //   { title: "Lorem ipsum", publishedAt: "Monday" },
  //   { title: "Lorem ipsum", publishedAt: "Monday" },
  //   { title: "Lorem ipsum", publishedAt: "Monday" },
  //   { title: "Lorem ipsum", publishedAt: "Monday" },
  //   { title: "Lorem ipsum", publishedAt: "Monday" },
  //   { title: "Lorem ipsum", publishedAt: "Monday" },
  //   { title: "Lorem ipsum", publishedAt: "Monday" },
  //   { title: "Lorem ipsum", publishedAt: "Monday" },
  //   { title: "Lorem ipsum", publishedAt: "Monday" },
  //   { title: "Lorem ipsum", publishedAt: "Monday" },
  //   { title: "Lorem ipsum", publishedAt: "Monday" },
  // ]);

  const { data } = await useAsyncData("news", () => queryContent("news").sort({ date: -1}).find());

  console.log(data);
  </script>
