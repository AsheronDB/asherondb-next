<template>
  <div class="bg-gray-950 text-white min-h-screen flex flex-col">
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">

console.log('APP.vue setup');
const store = useStore();
const { titlePhrase, now } = storeToRefs(store);
const { isCrawler } = useDevice();
const route = useRoute();

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

const randomTitlePhrase = () => {
  titlePhrase.value = titlePhrases.value[Math.floor(Math.random() * titlePhrases.value.length)];
}


if (!titlePhrase.value) {

  console.log('app.vue setup, checking titlePhrase')
  console.log(titlePhrase.value);

  randomTitlePhrase();
  console.log(titlePhrase.value);
}



useHead({
  titleTemplate: (title) => {

    if (title) {
      return `${title} - AsheronDB`;
    } else {

      if (!isCrawler) {
        return `AsheronDB - ${titlePhrase.value}`;
      } else {
        return `AsheronDB - Asheron's Call Database`;
      }
    }
  },
  bodyAttrs: () => {
    return {
      class: 'bg-gray-900'
    };
  },
});



onMounted(() => {

  console.log('mounted')
  // if (!isCrawler) {
  //   document.title = this.pageTitle + " - " + randomTitlePhrase();
  // }

  // console.log('Title phrase')
  // console.log(titlePhrase.value);
  // if (!titlePhrase.value) {

  //   console.log('app.vue mounted hook, checking titlePhrase')
  //   console.log(titlePhrase.value);
  // }




  setInterval(() => {
    now.value = Date.now();
    console.log('app timestamp updated')
  }, 60000)

});



</script>
