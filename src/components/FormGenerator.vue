<template>
  <form @submit.prevent="handleSubmit" class="form-generator">
    <div v-for="field in fields" :key="field.name" class="form-field">
      <label :for="field.name" class="form-label">{{ field.label }}</label>
      
      <!-- делаем под каждый тип отдельный компонент -->
      <FormInput
        v-if="field.type === 'input'"
        :id="field.name"
        :type="field.inputType"
        :placeholder="field.placeholder"
        v-model="formData[field.name]"
      />
      
      <FormSelect
        v-else-if="field.type === 'select'"
        :id="field.name"
        :placeholder="field.placeholder"
        :options="field.options"
        v-model="formData[field.name]"
      />
      
      <FormCheckbox
        v-else-if="field.type === 'checkbox'"
        :id="field.name"
        :label="field.checkboxLabel"
        v-model="formData[field.name]"
      />
      
      <FormTextarea
        v-else-if="field.type === 'textarea'"
        :id="field.name"
        :placeholder="field.placeholder"
        :rows="field.rows"
        v-model="formData[field.name]"
      />     
    </div>
    
    <div class="form-actions">
      <button type="submit" class="btn btn-primary">Сохранить</button>
      <button type="button" @click="handleCancel" class="btn btn-secondary">Отмена</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import FormInput from './FormInput.vue'
import FormSelect from './FormSelect.vue'
import FormCheckbox from './FormCheckbox.vue'
import FormTextarea from './FormTextarea.vue'

interface FormField {
  name: string
  type: 'input' | 'select' | 'checkbox' | 'textarea'
  label: string
  placeholder?: string
  inputType?: string
  rows?: number
  required?: boolean
  checkboxLabel?: string
  options?: Array<{ value: string | number; label: string }>
}

interface Props {
  fields: FormField[]
  modelValue:  any
}

interface Emits {
  (e: 'update:modelValue', value: Record<string, string | number | boolean>): void
  (e: 'submit', value: Record<string, string | number | boolean>): void
  (e: 'cancel'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const formData = reactive({ ...props.modelValue })
watch(() => props.modelValue, (newVal) => {
  Object.assign(formData, newVal)
}, { deep: true })

watch(formData, (newVal) => {
  emit('update:modelValue', { ...newVal })
})

const handleSubmit = () => {
  emit('submit', props.modelValue)
}

const handleCancel = () => {
  emit('cancel')
}
</script>

<style lang="scss" scoped>
.form-generator {
  max-width: 600px;
  margin: 0 auto;
}

.form-field {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
  color: $text-color;
}

.form-input,
.form-select,
.form-textarea {
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

.form-checkbox-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
}

.form-checkbox {
  width: auto;
}

.form-actions {
  display: flex;
  gap: 10px;
  margin-top: 30px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: $border-radius;
  cursor: pointer;
  font-size: 14px;
  
  &.btn-primary {
    background-color: $primary-color;
    color: white;
    
    &:hover {
      background-color: $secondary-color;
    }
  }
  
  &.btn-secondary {
    background-color: #6c757d;
    color: white;
    
    &:hover {
      background-color: #5a6268;
    }
  }
}
</style>