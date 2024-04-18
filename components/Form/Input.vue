<template>
  <div
    class=" rounded-none border-2 border-t-primary-400 border-r-primary-800 border-b-primary-700 border-l-primary-500 bg-acred-700"
    :class="[classes]"
  >
    <!-- has-[input:focus]:ring-primary-500 rounded-lg p-1 ring-2 ring-inset-->
    <div class="flex space-x-2">
      <div class="flex-1">
        <UInput
          ref="input"
          v-model="modelValue"
          :type
          :size
          :loading
          :variant
          :icon
          :autocomplete
          :disabled
          :padded
          :placeholder
          :autofocus
          :ui="mergedUI"
        >
          <template
            v-if="$slots?.leading"
            #leading
          >
            <slot name="leading" />
          </template>
          <template
            v-if="$slots?.trailing"
            #trailing
          >
            <slot name="trailing" />
          </template>
        </UInput>
      </div>
      <div class="flex-0 space-x-0.5">
        <slot name="default" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { merge } from "lodash-es";

defineOptions({
  inheritAttrs: false
})

const input = ref(null);

interface Props {
  type?: string
  placeholder?: string | null,
  size?: string,
  color?: string,
  icon?: string | null,
  variant?: string,
  disabled?: string,
  padded?: string,
  trailing?: string,
  loading?: string,
  ui?: string,
  autocomplete?: string,
  autofocus?: string,
}

const props = defineProps<Props>();

// eslint-disable-next-line vue/require-prop-types
const modelValue = defineModel("modelValue");
const {
  type,
  placeholder,
  size,
  color,
  variant,
  disabled,
  padded,
  loading,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  trailing,
  ui,
  autofocus
} = toRefs(props);

const defaultUI = {
  placeholder: "placeholder-primary-700 font-serif",
  color: {
    white: {
      outline: "bg-transparent shadow-none ring-0 focus:ring-0 text-white",
    },
    gray: {
      outline: "shadow-none ring-0 focus:ring-0",
    },
  },
  variant: {
    outline: "shadow-none ring-0 focus:ring-0",
  },
};

const parentUI = {
  color: {
    white: {
      outline: "bg-transparent",
      none: 'bg-white'
    },
    gray: {
      outline: "",
    },
  },
  variant: {
    outline: "bg-transparent",
    none: ""
  },
};

const classes = computed(() => {

  let classes;

  if (color.value) {

    if (variant.value) {
      classes = parentUI.color[color.value][variant.value];
    } else {
      classes = parentUI.color[color.value].none;
    }

  } else if (variant.value) {
    classes = parentUI.variant[variant.value];
  }

    return classes;

})

const mergedUI = computed(() => merge(defaultUI, ui.value));
</script>
