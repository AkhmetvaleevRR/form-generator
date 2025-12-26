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
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import FormGenerator from '../components/FormGenerator.vue'

const store = useStore()

const formFields = computed(() => store.state.formFields)

const formData = computed({
  get: () => store.state.formData,
  set: (value) => store.commit('UPDATE_FORM_DATA', value)
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