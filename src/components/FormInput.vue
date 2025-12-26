<template>
  <input
    :id="id"
    :type="type"
    :placeholder="placeholder"
    :required="required"
    v-model="value"
    class="form-input"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  id: string
  type?: string
  placeholder?: string
  required?: boolean
  modelValue: string
}

interface Emits {
  (e: 'update:modelValue', value: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const value = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})
</script>

<style lang="scss" scoped>
.form-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: $border-radius;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: $primary-color;
  }
}
</style>