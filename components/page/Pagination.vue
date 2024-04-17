<template>
  <UButtonGroup
    size="md"
    orientation="horizontal"
  >
    <UButton
      size="md"
      color="acred"
      :disabled="isFirst"
      icon="i-heroicons-chevron-double-left"
      @click="onFirst"
    >
      First
    </UButton>
    <UButton
      size="md"
      color="acred"
      :disabled="isFirst"
      icon="i-heroicons-chevron-left"
      @click="onPrev"
    >
      Previous
    </UButton>
    <UButton
      size="md"
      color="acred"
    >
      {{ resultsRange }}
    </UButton>
    <UButton
      size="md"
      color="acred"
      :disabled="isLast"
      trailing-icon="i-heroicons-chevron-right"
      @click="onNext"
    >
      Next
    </UButton>
    <UButton
      size="md"
      color="acred"
      :disabled="isLast"
      trailing-icon="i-heroicons-chevron-double-right"
      @click="onLast"
    >
      Last
    </UButton>
  </UButtonGroup>
</template>

<script setup lang="ts">

const offsetFirst = ref(0);

const props = defineProps(['offsetSize', 'total']);
const { offsetSize, total } = toRefs(props);

const offset = defineModel();

const offsetLast = computed(() => Math.floor(total.value / offsetSize.value) * offsetSize.value);

const isLast = computed(() => offset.value === offsetLast.value);
const isFirst = computed(() => offset.value === offsetFirst.value);

const resultsRange = computed(() => {

    const startIndex = offset.value + 1;

    const endIndex = Math.min(offset.value + offsetSize.value, total.value);
    return `${startIndex}-${endIndex} of ${total.value}`;
});

const onFirst = () => offset.value = offsetFirst.value;

const onPrev = () => {
    if (offset.value >= offsetSize.value) {
        offset.value -= offsetSize?.value;
    }
}

const onNext = () => {

    if ((total.value - offset.value) > offsetSize.value) {
        offset.value += offsetSize?.value;
    }
}
const onLast = () => offset.value = offsetLast.value;

</script>
