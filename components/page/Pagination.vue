<template>
  <UButtonGroup
    size="sm"
    orientation="horizontal"
  >
    <UButton
      color="acred"
      :disabled="isFirst"
      icon="i-heroicons-chevron-double-left"
      :ui="{ font: 'font-sans' }"
      @click="onFirst"
    >
      First
    </UButton>
    <UButton
      color="acred"
      :disabled="isFirst"
      icon="i-heroicons-chevron-left"
      :ui="{ font: 'font-sans' }"
      @click="onPrev"
    >
      Previous
    </UButton>
    <UButton
      color="acred"
      :ui="{ font: 'font-sans font-normal' }"
    >
      <span class="font-bold">{{ resultsRange.startIndex }}</span>-<span class="font-bold">{{ resultsRange.endIndex }}</span> of <span class="font-bold">{{ total }}</span>
    </UButton>
    <UButton

      color="acred"
      :disabled="isLast"
      trailing-icon="i-heroicons-chevron-right"
      :ui="{ font: 'font-sans' }"
      @click="onNext"
    >
      Next
    </UButton>
    <UButton

      color="acred"
      :disabled="isLast"
      trailing-icon="i-heroicons-chevron-double-right"
      :ui="{ font: 'font-sans' }"
      @click="onLast"
    >
      Last
    </UButton>
  </UButtonGroup>
</template>

<script setup lang="ts">
const offsetFirst = ref(0)
const props = defineProps<{ offsetSize: number, total: number }>()

const { offsetSize, total } = toRefs(props)

const offset = defineModel()

const offsetLast = computed(() => Math.floor(total.value / offsetSize.value) * offsetSize.value)

const isLast = computed(() => offset.value === offsetLast.value)
const isFirst = computed(() => offset.value === offsetFirst.value)

const resultsRange = computed(() => {
  const startIndex = offset.value + 1
  const endIndex = Math.min(offset.value + offsetSize.value, total.value)
  return {
    startIndex: startIndex,
    endIndex: endIndex,
  }
  // return `${startIndex}-${endIndex} of ${total.value}`;
})

const onFirst = () => offset.value = offsetFirst.value
const onPrev = () => {
  if (offset.value >= offsetSize.value) {
    offset.value -= offsetSize?.value
  }
}

const onNext = () => {
  if ((total.value - offset.value) > offsetSize.value) {
    offset.value += offsetSize?.value
  }
}
const onLast = () => offset.value = offsetLast.value
</script>
