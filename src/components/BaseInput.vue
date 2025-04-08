<script setup lang="ts">
import {ref, watch} from "vue";
import {vMaska} from "maska/vue"

interface InputProps {
  id: string;
  modelValue?: string;
  label: string;
  placeholder?: string;
  type?: string;
  mask?: string | string[] | null;
  validate?: ((value: string) => string | null) | null;
}

const props = withDefaults(defineProps<InputProps>(), {
  modelValue: '',
  placeholder: "Preencha o campo...",
  type: "text",
  mask: null,
  validate: null,
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "input-error", message: string): void;
}>();

const innerValue = ref(props.modelValue);
const errorMessage = ref("");

watch(innerValue, (newValue) => {
  emit("update:modelValue", newValue);

  if (props.validate) {
    errorMessage.value = props.validate(newValue) || "";
    emit("input-error", errorMessage.value);
  }
});

watch(
    () => props.modelValue,
    (newValue) => {
      innerValue.value = newValue;
    }
);
</script>

<template>
  <div class="flex flex-col gap-0">
    <label :for="id" class="text-xs">{{ label }}</label>
    <input
        class="text-sm sm:text-base border-b"
        :id="id"
        :type="type"
        :placeholder="placeholder"
        v-maska
        :data-maska="mask"
        :class="{ invalid: errorMessage }"
        v-model="innerValue"
    />
    <p v-if="errorMessage" class="error-message text-xs">{{ errorMessage }}</p>
  </div>
</template>

<style scoped lang="scss">
@import '@assets/styles/_theme.scss';

input {
  transition: border-color 0.3s ease;
  border-color: $input-default-border;

  &:focus {
    outline: none;
    border-color: $input-focus-border;
  }

  &.invalid {
    border-color: $input-invalid-color;
  }
}

.error-message {
  color: $input-invalid-color;
}
</style>