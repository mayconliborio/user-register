<script setup lang="ts">
import BaseLoading from "@/components/BaseLoading.vue";

interface BaseButtonProps {
  loading?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const props = withDefaults(defineProps<BaseButtonProps>(), {
  loading: false,
  disabled: false,
  type: 'button',
});

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit("click", event);
  }
};
</script>

<template>
  <button
      :type="props.type"
      :disabled="disabled"
      class="flex items-center justify-center text-sm sm:text-base px-3 sm:px-4 min-h-[28px] sm:min-h-[40px] py-1 sm:py-2 btn rounded-full shadow-md"
      :class="{ 'btn-enabled': !disabled, 'btn-disabled': disabled, 'pointer-events-none': loading }"
      @click="handleClick"
  >
    <span v-if="!loading">
      <slot/>
    </span>

    <BaseLoading v-else size="md"/>
  </button>
</template>

<style scoped lang="scss">
@use '@assets/styles/_theme.scss' as *;

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