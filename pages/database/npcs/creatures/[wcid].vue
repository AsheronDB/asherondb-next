<template>
  <div>
    <PageBreadcrumb :key="title" />
    <div class="p-4">
      <div class="border-2 border-primary-800 bg-primary-950 mb-6">
        <div class="border-b-2 border-primary-800 p-6">
          <h2
            class="text-3xl font-serif text-primary-400 font-normal text-center"
          >
            {{ weenie?.name }}
          </h2>
        </div>
        <div class="flex w-full rounded-lg text-gray-800">
          <div class="mr-auto flex flex-1 items-center">
            <p class="p-6 text-gray-400">
              Icon
            </p>
          </div>
          <nav
            class="flex-0 hidden items-center lg:flex text-center p-3 font-serif font-normal text-gray-400"
          >
            Species<br>Title<br>Attackable
          </nav>
          <div class="ml-auto flex flex-1 justify-end items-stretch">
            <div
              class="border-l-2 border-primary-800 px-6 py-3 text-center leading-none flex flex-col items-center justify-center"
            >
              <p class="text-gray-400 text-sm font-serif leading-none">
                Level
              </p>
              <p
                class="text-primary-400 text-4xl font-normal font-serif leading-none"
              >
                {{ weenie?.level }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <!-- <UTabs :items="items" /> -->
        <UHorizontalNavigation
          :links="links"
          class="border-b border-gray-700 bg-gray-800/40 px-2 rounded-t"
        />

        <div class="bg-gray-800 py-6 px-4 rounded-b">
          <div
            v-for="section in sections"
            v-show="route.hash === '#' + section.key"
          >
            {{ section.content }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const title = ref(null);

const wcid = route.params.wcid;
console.log("wcid is", wcid);
// TODO: type
const weenie = ref()

definePageMeta({
  // title: weenie?.name, // Might need to make reactive, it's only a ref right now
  validate: async (route) => {
    if (typeof route.params.wcid !== "string" || !/^\d+$/.test(route.params.wcid)) {
      // TODO: Nuxt claims returning an object like this is how you set a
      // non-404 response but if you enable this block, you get an infinite
      // redirect. So we just return which sets 404 and makes us look dumb.
      //
      // See: https://nuxt.com/docs/getting-started/routing#route-validation
      //
      // return {
        // statusCode: 400, statusMessage: "Invalid value for weenie class ID."
      // }
      return false
    }

    return true;
  }
});

const { data } = await useFetch(`/api/weenie/${wcid}`);
// TODO: Handle bad fetch
weenie.value = data.value?.data
console.log("weenie is now", weenie)

// console.log(route);

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

// const selected = ref(0);

// title.value = creature.value.name;
// route.meta.title = creature.value.name;
// route.matched[route.matched.length - 1].meta.title = creature.value.name;

// // const defaultTabIndex = ref(route.hash ? items.findIndex(item => ('#' + item.slot) === route.hash) : 0);


// const selected = computed({
//   get() {
//     console.log("selected getter");

//     if (route.hash) {
//       const index = items.findIndex((item) => "#" + item.slot === route.hash);
//       console.log(selected);
//       if (index === -1) {
//         return 0;
//       }
//       return index;
//     } else {
//       return 0;
//     }

//   },
//   set(value) {
//     console.log("selected setter");
//     // Hash is specified here to prevent the page from scrolling to the top
//     router.replace({ hash: `#${items[value].slot}` });
//   },
// });

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
