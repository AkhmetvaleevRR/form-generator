<template>
  <div class="demo">
    <h1>Демонстрация генератора форм</h1>
    
    <FormGenerator
      :fields="formFields"
      v-model="formData"
      @submit="handleSubmit"
      @cancel="handleCancel"
    >
      <template #field-email="{ field, error }">
        <div class="custom-field">
          <label :for="field.name" class="custom-label">
            {{ field.label }}
            <span v-if="field.required" class="required-mark">*</span>
          </label>
          <input
            :id="field.name"
            type="email"
            :placeholder="field.placeholder"
            v-model="email"
            :class="['custom-input', { 'input-error': error }]"
          />
          <span v-if="error" class="error-message">Поле обязательно для заполнения</span>
        </div>
      </template>
      
      <template #actions="{ submit, cancel }">
        <div class="custom-actions">
          <button @click="submit" class="btn btn-success">✅ Отправить</button>
          <button @click="cancel" class="btn btn-warning">🔄 Сбросить</button>
        </div>
      </template>
    </FormGenerator>
    
    <div v-if="submittedData" class="result">
      <pre>{{ JSON.stringify(submittedData, null, 2) }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import FormGenerator from '../components/FormGenerator.vue'

const store = useStore()

const formFields = computed(() => store.state.formFields)

const formData = computed({
  get: () => store.state.formData,
  set: (value) => store.commit('UPDATE_FORM_DATA', value)
})

const email = computed({
  get: () => formData.value.email,
  set: (val: string) => {
    store.commit('UPDATE_FORM_DATA', { ...formData.value, email: val })
  }
})

const submittedData = ref<typeof formData.value | null>(null)

const handleSubmit = (data: Record<string, string | number | boolean>) => {
  submittedData.value = { ...formData.value, ...data }
  console.log('Form submitted:', data)
}

const handleCancel = () => {
  store.commit('UPDATE_FORM_DATA', {
    name: '',
    email: '',
    country: '',
    subscribe: false,
    message: ''
  })
  submittedData.value = null
  console.log('Form cancelled')
}
</script>

<style lang="scss" scoped>
.demo {
  padding: 20px;
  
  h1 {
    color: #2c3e50;
    margin-bottom: 30px;
  }
}

.custom-field {
  margin-bottom: 20px;
}

.custom-label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #2980b9;
  font-size: 16px;
}

.custom-input {
  width: 100%;
  padding: 12px;
  border: 2px solid #3498db;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.3s;
  
  &:focus {
    outline: none;
    border-color: #2980b9;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
  }
  
  &.input-error {
    border-color: #e74c3c;
  }
}

.custom-actions {
  display: flex;
  gap: 15px;
  margin-top: 30px;
  justify-content: center;
}

.btn-success {
  background-color: #27ae60;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  
  &:hover {
    background-color: #229954;
  }
}

.btn-warning {
  background-color: #f39c12;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  
  &:hover {
    background-color: #e67e22;
  }
}

.result {
  margin-top: 30px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 5px;
  
  h3 {
    margin-bottom: 15px;
    color: #2c3e50;
  }
  
  pre {
    background-color: #e9ecef;
    padding: 15px;
    border-radius: 3px;
    overflow-x: auto;
  }
}
</style>