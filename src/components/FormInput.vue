<template>
  <input
    :id="id"
    :type="type"
    :placeholder="placeholder"
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