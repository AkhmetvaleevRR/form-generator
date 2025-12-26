<template>
  <select
    :id="id"
    v-model="value"
    class="form-select"
  >
    <option value="">{{ placeholder || 'Выберите опцию' }}</option>
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.label }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Option {
  value: string | number
  label: string
}

interface Props {
  id: string
  placeholder?: string
  modelValue: string | number | boolean
  options?: Option[]
}

interface Emits {
  (e: 'update:modelValue', value: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const value = computed({
  get: () => String(props.modelValue || ''),
  set: (val) => emit('update:modelValue', val)
})
</script>

<style lang="scss" scoped>
.form-select {
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