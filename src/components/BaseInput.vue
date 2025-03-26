<template>
  <div class="flex flex-col gap-0">
    <label :for="id" class="text-xs">{{ label }}</label>
    <input
        class="border-b"
        :id="id"
        :type="type"
        :placeholder="placeholder"
        v-maska="mask"
        :class="{ invalid: errorMessage }"
        v-model="innerValue"
    />
    <p v-if="errorMessage" class="error-message text-xs">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { vMaska } from "maska/vue"

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: "Preencha o campo...",
  },
  id: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "text",
  },
  mask: {
    type: String,
    default: null,
  },
  validate: {
    type: Function,
    default: null,
  },
  attributes: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["update:modelValue", "input-error"]);

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