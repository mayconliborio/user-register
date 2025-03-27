<script setup>
import BaseLoading from "@/components/BaseLoading.vue";

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["click"]);

const handleClick = (event) => {
  if (!props.disabled && !props.loading) {
    emit("click", event);
  }
};
</script>

<template>
  <button
      :disabled="disabled"
      class="flex items-center justify-center text-sm sm:text-base px-3 sm:px-4 min-h-[28px] sm:min-h-[40px] py-1 sm:py-2 btn rounded-full shadow-md"
      :class="{ 'btn-enabled': !disabled, 'btn-disabled': disabled, 'pointer-events-none': loading }"
      @click="handleClick"
  >

    <span v-if="!loading"><slot/></span>
    <BaseLoading v-else size="md"/>
  </button>
</template>

<style scoped lang="scss">
@import "@assets/styles/_theme.scss";

.btn {
  transition: all 0.3s ease-in-out;

  &.btn-enabled {
    color: $button-enabled-text-color;
    background-color: $button-enabled-bg-color;
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }

    &:focus {
      outline: none;
    }
  }

  &.btn-disabled {
    cursor: not-allowed;
    color: $button-disabled-text-color;
    background-color: $button-disabled-bg-color;
  }
}
</style>