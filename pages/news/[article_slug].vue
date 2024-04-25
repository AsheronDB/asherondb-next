<template>
  <PageArticle>
    {{ data.title }}

    <!-- <page-header>
      <template #subheader>
        News
      </template>
      {{ data.title }}
      <template #description>
        Date
      </template>
    </page-header> -->

    <div class="flex-1">
      {{ surround }}

      <ContentDoc
        :path="'news/' + route.params.article_slug"
        class="prose prose-a:text-primary dark:prose-hr:border-primary-950 dark:prose-invert mx-auto max-w-none"
      />
    </div>
    <hr>
    <footer>
      <div class="grid grid-cols-2 gap-6 pt-12">
        <div class="">
          <nuxt-link
            v-if="prev"
            :to="prev._path"
            class="hover:border-primary-400 dark:hover:border-primary-400 dark:border-primary-950 block h-full rounded-lg border p-6 transition-colors"
            v-html="prev.title"
          />
        </div>
        <div class="">
          <nuxt-link
            v-if="next"
            :to="next._path"
            class="block h-full  rounded-lg border p-6"
            v-html="next.title"
          />
        </div>
      </div>
    </footer>
  </PageArticle>
</template>

<script setup>
const route = useRoute()

const prev = ref(null)
const next = ref(null)

const { data } = await useAsyncData("article-" + route.params.article_slug, () =>
  queryContent("news/" + route.params.article_slug).findOne(),
)

definePageMeta({
  title: "News Article",
})

// const { data: surround } = await useAsyncData("article-surround-" + route.params.article_slug, () =>
//   queryContent()
//     .only(["_path", "title"])
//     .findSurround("/news/" + route.params.article_slug)
// );

// const prev = computed(() => surround.value[0]);
// const next = computed(() => surround.value[1]);

onMounted(async () => {
  const surround = await queryContent()
    .only(["_path", "title"])
    .sort({ date: -1 })
    .findSurround("/news/" + route.params.article_slug)

  prev.value = surround[0]
  next.value = surround[1]
})
// const [prev, next] = await queryContent()
//   .only(['_path', 'title'])
//   .sort({ date: 1})
//   .where({ isArchived: false })
//   .findSurround('/articles/article-2')
</script>
