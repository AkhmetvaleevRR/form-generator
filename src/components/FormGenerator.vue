<template>
  <form @submit.prevent="handleSubmit" class="form-generator" novalidate>
    <div v-for="field in fields" :key="field.name" class="form-field">
      <label :for="field.name" class="form-label">
        {{ field.label }}
        <span v-if="field.required" class="required-mark">*</span>
      </label>
      
      <FormInput
        v-if="field.type === 'input'"
        :id="field.name"
        :type="field.inputType"
        :placeholder="field.placeholder"
        :required="field.required"
        :class="{ 'input-error': errors[field.name] }"
        v-model="formData[field.name]"
      />
      
      <FormSelect
        v-else-if="field.type === 'select'"
        :id="field.name"
        :placeholder="field.placeholder"
        :options="field.options"
        :required="field.required"
        :class="{ 'input-error': errors[field.name] }"
        v-model="formData[field.name]"
      />
      
      <FormCheckbox
        v-else-if="field.type === 'checkbox'"
        :id="field.name"
        :label="field.checkboxLabel"
        :required="field.required"
        :class="{ 'input-error': errors[field.name] }"
        v-model="formData[field.name]"
      />
      
      <FormTextarea
        v-else-if="field.type === 'textarea'"
        :id="field.name"
        :placeholder="field.placeholder"
        :rows="field.rows"
        :required="field.required"
        :class="{ 'input-error': errors[field.name] }"
        v-model="formData[field.name]"
      />
      <span v-if="errors[field.name]" class="error-message">Поле обязательно для заполнения</span>
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
  modelValue: any
}

interface Emits {
  (e: 'update:modelValue', value: Record<string, string | number | boolean>): void
  (e: 'submit', value: Record<string, string | number | boolean>): void
  (e: 'cancel'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const errors = reactive<Record<string, boolean>>({})
const formData = reactive({ ...props.modelValue })

watch(() => props.modelValue, (newVal) => {
  Object.assign(formData, newVal)
}, { deep: true })

watch(formData, (newVal) => {
  emit('update:modelValue', { ...newVal })
  // Очистка ошибок при изменении полей
  for (const key in errors) {
    if (errors[key]) {
      const val = newVal[key]
      if (val !== '' && val !== null && val !== undefined && val !== false) {
        errors[key] = false
      }
    }
  }
})

const handleSubmit = () => {
  let isValid = true

  for (const field of props.fields) {
    if (field.required) {
      const value = formData[field.name]
      const isEmpty = value === null || value === undefined || value === ''
      const isUnchecked = field.type === 'checkbox' && value === false
      
      if (isEmpty || isUnchecked) {
        errors[field.name] = true
        isValid = false
      } else {
        errors[field.name] = false
      }
    }
  }
  
  if (isValid) {
    emit('submit', props.modelValue)
  }
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

.error-message {
  display: block;
  font-size: 12px;
  color: #e74c3c;
  margin-top: 4px;
}

.required-mark {
  color: #e74c3c;
  margin-left: 4px;
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

:deep(.input-error) {
  border-color: #e74c3c !important;
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