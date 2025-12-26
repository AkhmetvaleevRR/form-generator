<template>
  <textarea
    :id="id"
    :placeholder="placeholder"
    :rows="rows || 3"
    :required="required"
    v-model="value"
    class="form-textarea"
  ></textarea>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  id: string
  placeholder?: string
  rows?: number
  required?: boolean
  modelValue: string
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
.form-textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: $border-radius;
  font-size: 14px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: $primary-color;
  }
}
</style>