<template>
  <nav class="bg-background/75 group sticky top-[--header-height] overflow-y-auto backdrop-blur">
    <div class="space-y-3 border-b border-dashed border-gray-200 py-3 lg:border-0 lg:py-8 dark:border-gray-800">
      <button
        class="flex w-full items-center gap-1.5 lg:cursor-text lg:select-text"
        tabindex="-1"
      >
        <span class="truncate text-sm/6 font-semibold">Table of Contents</span><span
          class="i-heroicons-chevron-down-20-solid mr-1.5 ms-auto size-5 shrink-0 -rotate-90 text-gray-500 transition-transform duration-200 group-hover:text-gray-700 lg:hidden dark:text-gray-400 dark:group-hover:text-gray-200"
        />
      </button>
      <ul class="hidden space-y-1 lg:block">
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
import { forEach, get } from "lodash-es"

console.log("ToC")

const props = defineProps(["target"])
const activeTocId = ref(null)
const activeTocIds = ref([])
const headingsData = ref([])

const observer = ref(null)

const observerOptions = reactive({
  root: props.target,
  threshold: 1.0,
})

function createNestedJsonStructureWithLodash(headings) {
  // const parentElement = document.getElementById(parentId);
  // if (!parentElement) {
  //     console.log("Element with the specified ID not found.");
  //     return;
  // }

  const structure = []
  const currentLevelNodes = [structure]

  forEach(headings, (heading) => {
    const level = parseInt(heading.tagName.substring(1))
    const node = {
      tag: heading.tagName,
      text: heading.textContent,
      id: heading.id,
      children: [],
    }

    console.log(`Processing: ${node.tag}, Level: ${level}`) // Debug log

    let parentArray = get(currentLevelNodes, level - 2)
    if (!parentArray) {
      console.log(
        `No parent array found for level ${level}, resetting to root`,
      )
      parentArray = structure
    }

    parentArray.push(node)

    if (level < 6) {
      currentLevelNodes[level - 1] = node.children
    }

    console.log(`Current Structure:`, JSON.stringify(structure, null, 2)) // Debug log
  })

  return structure
}

// await nextTick();
// const tocData = createNestedJsonStructureWithLodash("page-content");
// headings.value = tocData;

onMounted(async () => {
  console.log("ToC Mounted")
  await nextTick()

  observer.value = new IntersectionObserver((entries) => {
    console.log(entries)

    entries.forEach((entry) => {
      const id = entry.target.getAttribute("id")

      if (entry.isIntersecting) {
        activeTocId.value = id
        activeTocIds.value.push(id)
      }
      else {
        activeTocIds.value.splice(activeTocIds.value.indexOf(id), 1)
      }
    })
  }, observerOptions)

  const headings = props.target.querySelectorAll("h1, h2, h3, h4, h5, h6")

  headings.forEach(heading => observer.value?.observe(heading))

  const tocData = createNestedJsonStructureWithLodash(headings)
  console.log("tocData")
  console.log(tocData)

  headingsData.value = tocData
  // document.querySelectorAll("h3").forEach((heading) => {

  //   console.log(heading);
  // });
})

onUnmounted(() => {
  observer.value?.disconnect()
})

// onUpdated(async () => {

//   await nextTick();
//   const tocData = createNestedJsonStructureWithLodash("page-content");
//   console.log("tocData");
//   console.log(tocData);

//   headings.value = tocData;
// });
</script>
