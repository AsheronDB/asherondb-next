<template>
  <nav class="sticky top-[--header-height] bg-background/75 backdrop-blur group overflow-y-auto">
    <div class="py-3 lg:py-8 border-b border-dashed border-gray-200 dark:border-gray-800 lg:border-0 space-y-3">
      <button
        class="flex items-center gap-1.5 lg:cursor-text lg:select-text w-full"
        tabindex="-1"
      >
        <span class="font-semibold text-sm/6 truncate">Table of Contents</span><span
          class="i-heroicons-chevron-down-20-solid lg:hidden w-5 h-5 ms-auto transform transition-transform duration-200 flex-shrink-0 mr-1.5 text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200 -rotate-90"
        />
      </button>
      <ul class="space-y-1 hidden lg:block">
        <PageToCNavItem
          v-for="(item, index) in headingsData"
          :id="item.id"
          :key="index"
          :text="item.text"
          :active-ids="activeTocIds"
          :children="item.children"
        />
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { forEach, get, set } from "lodash-es";

console.log('ToC');

const props = defineProps(["target"]);
const activeTocId = ref(null);
const activeTocIds = ref([]);
const headingsData = ref([]);

const observer = ref(null);

const observerOptions = reactive({
  root: props.target,
  threshold: 1.0,
});

function createNestedJsonStructureWithLodash(headings) {
  // const parentElement = document.getElementById(parentId);
  // if (!parentElement) {
  //     console.log("Element with the specified ID not found.");
  //     return;
  // }


  const structure = [];
  const currentLevelNodes = [structure];

  forEach(headings, (heading) => {
    const level = parseInt(heading.tagName.substring(1));
    const node = {
      tag: heading.tagName,
      text: heading.textContent,
      id: heading.id,
      children: [],
    };

    console.log(`Processing: ${node.tag}, Level: ${level}`); // Debug log

    let parentArray = get(currentLevelNodes, level - 2);
    if (!parentArray) {
      console.log(
        `No parent array found for level ${level}, resetting to root`
      );
      parentArray = structure;
    }

    parentArray.push(node);

    if (level < 6) {
      currentLevelNodes[level - 1] = node.children;
    }

    console.log(`Current Structure:`, JSON.stringify(structure, null, 2)); // Debug log
  });

  return structure;
}

// await nextTick();
// const tocData = createNestedJsonStructureWithLodash("page-content");
// headings.value = tocData;

onMounted(async () => {
  console.log('ToC Mounted');
  await nextTick();

  observer.value = new IntersectionObserver((entries) => {

    console.log(entries);


    entries.forEach((entry) => {


      const id = entry.target.getAttribute("id");

      if (entry.isIntersecting) {
        activeTocId.value = id;
        activeTocIds.value.push(id);
      } else {
        activeTocIds.value.splice(activeTocIds.value.indexOf(id), 1);
      }
    });
  }, observerOptions);

  const headings = props.target.querySelectorAll("h1, h2, h3, h4, h5, h6");

  headings.forEach(heading => observer.value?.observe(heading));

  const tocData = createNestedJsonStructureWithLodash(headings);
  console.log("tocData");
  console.log(tocData);

  headingsData.value = tocData;
  // document.querySelectorAll("h3").forEach((heading) => {

  //   console.log(heading);
  // });
});

onUnmounted(() => {
  observer.value?.disconnect();
});

// onUpdated(async () => {

//   await nextTick();
//   const tocData = createNestedJsonStructureWithLodash("page-content");
//   console.log("tocData");
//   console.log(tocData);

//   headings.value = tocData;
// });
</script>
