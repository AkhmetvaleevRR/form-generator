<template>
  <select
    :id="id"
    v-model="value"
    class="form-select"
    :required="required"
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
  required?: boolean
  modelValue: string | number | boolean
  options?: Option[]
}

interface Emits {
  (e: 'update:modelValue', value: string | number): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const value = computed({
  get: () => (typeof props.modelValue === 'boolean' ? '' : props.modelValue),
  set: (val) => emit('update:modelValue', val)
})
</script>

<style lang="scss" scoped>
@import '../styles/mixins.scss';

.form-select {
  @include form-field-base;
}
</style>