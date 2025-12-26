<template>
  <div class="home-page">
    <h1>Генератор форм Vue.js</h1>
    
    <div class="demo-section">
      <h2>Быстрый пример</h2>
      <FormGenerator
        :fields="contactFields"
        v-model="contactData"
        @submit="handleContactSubmit"
      />
      
      <div v-if="result" class="result">
        <h3>Результат:</h3>
        <pre>{{ JSON.stringify(result, null, 2) }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FormGenerator from '../components/FormGenerator.vue'

const contactFields = [
  {
    name: 'name',
    type: 'input' as const,
    label: 'Имя',
    placeholder: 'Введите ваше имя',
    required: true
  },
  {
    name: 'email',
    type: 'input' as const,
    label: 'Email',
    inputType: 'email',
    placeholder: 'example@mail.com',
    required: true
  },
  {
    name: 'message',
    type: 'textarea' as const,
    label: 'Сообщение',
    placeholder: 'Ваше сообщение...',
    rows: 3
  }
]

const contactData = ref({
  name: '',
  email: '',
  message: ''
})

const result = ref<Record<string, string | number | boolean> | null>(null)

const handleContactSubmit = (data: Record<string, string | number | boolean>) => {
  result.value = data
  console.log('Контактная форма отправлена:', data)
}
</script>

<style lang="scss" scoped>
.home-page {
  text-align: center;
  padding: 50px 20px;
  
  h1 {
    color: #42b983;
    margin-bottom: 40px;
  }
  
  .demo-section {
    max-width: 500px;
    margin: 0 auto 40px;
    text-align: left;
    
    h2 {
      color: #2c3e50;
      margin-bottom: 20px;
      text-align: center;
    }
  }
  
  .result {
    margin-top: 20px;
    padding: 15px;
    background-color: #f8f9fa;
    border-radius: 5px;
    
    h3 {
      margin-bottom: 10px;
      color: #2c3e50;
    }
    
    pre {
      background-color: #e9ecef;
      padding: 10px;
      border-radius: 3px;
      font-size: 12px;
      overflow-x: auto;
    }
  }
  
  .demo-link {
    display: inline-block;
    padding: 12px 24px;
    background-color: #42b983;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    font-weight: 500;
    
    &:hover {
      background-color: #369870;
    }
  }
}
</style>