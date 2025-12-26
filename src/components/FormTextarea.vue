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
  modelValue: string | number | boolean
}

interface Emits {
  (e: 'update:modelValue', value: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const value = computed({
  get: () => String(props.modelValue ?? ''),
  set: (val) => emit('update:modelValue', val)
})
</script>

<style lang="scss" scoped>
@import '../styles/mixins.scss';

.form-textarea {
  @include form-field-base;
  resize: vertical;
}
</style>