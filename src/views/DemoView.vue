<template>
  <div class="demo">
    <h1>Демонстрация генератора форм</h1>
    
    <FormGenerator
      :fields="formFields"
      v-model="formData"
      @submit="handleSubmit"
      @cancel="handleCancel"
    />
    
    <div v-if="submittedData" class="result">
      <pre>{{ JSON.stringify(submittedData, null, 2) }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FormGenerator from '../components/FormGenerator.vue'

const formFields = [
  {
    name: 'name',
    type: 'input',
    label: 'Имя',
    placeholder: 'Введите ваше имя'
  },
  {
    name: 'email',
    type: 'input',
    label: 'Email',
    inputType: 'email',
    placeholder: 'example@mail.com'
  },
  {
    name: 'country',
    type: 'select',
    label: 'Страна',
    placeholder: 'Выберите страну',
    options: [
      { value: 'ru', label: 'Россия' },
      { value: 'us', label: 'США' },
      { value: 'de', label: 'Германия' }
    ]
  },
  {
    name: 'subscribe',
    type: 'checkbox',
    label: 'Подписка',
    checkboxLabel: 'Подписаться на рассылку'
  },
  {
    name: 'message',
    type: 'textarea',
    label: 'Сообщение',
    placeholder: 'Введите ваше сообщение',
    rows: 4
  }
]

const formData = ref({
  name: '',
  email: '',
  country: '',
  subscribe: false,
  message: ''
})

const submittedData = ref(null)

const handleSubmit = (data: any) => {
  submittedData.value = data
  console.log('Form submitted:', data)
}

const handleCancel = () => {
  formData.value = {
    name: '',
    email: '',
    country: '',
    subscribe: false,
    message: ''
  }
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