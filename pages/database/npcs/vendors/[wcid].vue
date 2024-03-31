<template>
  <div>
    <PageBreadcrumb :key="title" />
    <Generic :data="weenie" />
    <!--
      TODO: I'm not sure what this is but it was part of the content
            that went into the Creature component but I pulled it out
    -->
    <div>
      <UHorizontalNavigation
        :links="links"
        class="border-b border-gray-700 bg-gray-800/40 px-2 rounded-t"
      />

      <div class="bg-gray-800 py-6 px-4 rounded-b">
        <div
          v-for="section in sections"
          v-show="route.hash === '#' + section.key"
          :key="section.key"
        >
          {{ section.content }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// TODO: This should autoimport but I had to manually define it. What's going on?
import Generic from "~/components/Weenie/Generic.vue"

const route = useRoute();
const title = ref("Weenie");

const wcid = route.params.wcid;
const weenie = ref();

definePageMeta({
  // title: weenie?.name, // Might need to make reactive, it's only a ref right now
  validate: async (route) => {
    if (
      typeof route.params.wcid !== "string" ||
      !/^\d+$/.test(route.params.wcid)
    ) {
      // TODO: Nuxt claims returning an object like this is how you set a
      // non-404 response but if you enable this block, you get an infinite
      // redirect. So we just return which sets 404 and makes us look dumb.
      //
      // See: https://nuxt.com/docs/getting-started/routing#route-validation
      //
      // return {
      // statusCode: 400, statusMessage: "Invalid value for weenie class ID."
      // }
      return false;
    }

    return true;
  },
});

const { data } = await useFetch(`/api/weenie/${wcid}`);
// TODO: Handle bad fetch
weenie.value = data.value?.data;

title.value = weenie?.value.name;
route.meta.title = weenie?.value.name;
route.matched[route.matched.length - 1].meta.title = weenie?.value.name;

const links = [
  {
    label: "Trophies",
    to: route.path + "#trophies",
  },
  {
    label: "Sounds",
    to: route.path + "#sounds",
  },
];

const sections = [
  {
    label: "Trophies",
    key: "trophies",
    content: "Trophy Section content",
  },
  {
    label: "Sounds",
    key: "sounds",
    content: "Sound Section content",
  },
];
</script>
