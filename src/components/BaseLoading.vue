<script setup lang="ts">
interface BaseLoadingProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '5xl';
}

withDefaults(defineProps<BaseLoadingProps>(), {
  size: 'xs',
});

const sizes = {
  xs: 'w-3 h-3 sm:w-4 sm:h-4',
  sm: 'w-4 h-4 sm:w-5 sm:h-5',
  md: 'w-5 h-5 sm:w-6 sm:h-6',
  lg: 'w-6 h-6 sm:w-7 sm:h-7',
  xl: 'w-7 h-7 sm:w-8 sm:h-8',
  '5xl': 'w-12 h-12'
}
</script>

<template>
  <div class="loading-spinner border-2 rounded-full" :class="sizes[size]"></div>
</template>

<style scoped lang="scss">
@use '@assets/styles/_theme.scss' as *;

.loading-spinner {
  border-color: $button-disabled-text-color;
  border-top-color: $button-enabled-text-color;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>