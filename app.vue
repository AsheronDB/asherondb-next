<template>
  <div class="bg-gray-950 text-white min-h-screen flex flex-col">
    <NuxtLayout><NuxtPage /></NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const { isCrawler } = useDevice();

const titlePhrases = ref([
  "Portal 2 Teth?",
  "It's people! Mushed nanners is people!",
  "Entering damn portal-space!",
  "Made with the help of Rytheran and, in beneficence, His Eternal Splendor.",
  'White Rabbit says, "I feel the devil inside."',
  "Heed the call!",
  "A pleasant day, is it not, fellow human?",
  "LF PPGSA",
  'You say, "Shurov Thiloi"',
  "You are truly the master of bunnies!",
  "You have not offended the xuta recently, so I will grant you passage.",
]);

const randomTitlePhrase = () =>
  titlePhrases.value[Math.floor(Math.random() * titlePhrases.value.length)];

useHead({
  titleTemplate: (title) => {
    if (title) {
      return `${title} - AsheronDB`;
    } else {
      if (!isCrawler) {
        return `AsheronDB - ${randomTitlePhrase()}`;
      } else {
        return `AsheronDB - Asheron's Call Database`;
      }
    }
  },
});

onMounted(() => {
  // if (!isCrawler) {
  //   document.title = this.pageTitle + " - " + randomTitlePhrase();
  // }
});

</script>
