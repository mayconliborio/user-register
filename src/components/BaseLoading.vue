<script setup>
defineProps({
  size: {
    type: String,
    default: 'xs',
    validator(value) {
      return ['xs', 'sm', 'md', 'lg', 'xl', '5xl'].includes(value)
    }
  }
})

const sizes = {
  xs: 'w-4 h-4',
  sm: 'w-5 h-5',
  md: 'w-6 h-6',
  lg: 'w-7 h-7',
  xl: 'w-8 h-8',
  '5xl': 'w-12 h-12'
}
</script>


<template>
  <div class="loading-spinner border-2 rounded-full" :class="sizes[size]"></div>
</template>

<style scoped lang="scss">
@import '@assets/styles/_theme.scss';

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