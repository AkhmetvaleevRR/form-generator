<template>
  <div class="form-checkbox-wrapper">
    <input
      :id="id"
      type="checkbox"
      v-model="value"
      :required="required"
      class="form-checkbox"
    />
    <label :for="id" class="form-checkbox-label">{{ label }}</label>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  id: string
  label?: string
  required?: boolean
  modelValue: boolean
}

interface Emits {
  (e: 'update:modelValue', value: boolean): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const value = computed({
  get: () => !!props.modelValue,
  set: (val) => emit('update:modelValue', val)
})
</script>

<style lang="scss" scoped>
.form-checkbox-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
}

.form-checkbox {
  width: auto;
}

.form-checkbox-label {
  cursor: pointer;
  user-select: none;
}
</style>