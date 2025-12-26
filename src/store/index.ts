import { createStore } from 'vuex'

export default createStore({
  state: {
    formData: {
      name: '',
      email: '',
      country: '',
      subscribe: false,
      message: '',
    },
    formFields: [
      {
        name: 'name',
        type: 'input',
        label: 'Имя',
        placeholder: 'Введите ваше имя',
      },
      {
        name: 'email',
        type: 'input',
        label: 'Email',
        inputType: 'email',
        placeholder: 'example@mail.com',
      },
      {
        name: 'country',
        type: 'select',
        label: 'Страна',
        placeholder: 'Выберите страну',
        options: [
          { value: 'ru', label: 'Россия' },
          { value: 'us', label: 'США' },
          { value: 'de', label: 'Германия' },
        ],
      },
      {
        name: 'subscribe',
        type: 'checkbox',
        label: 'Подписка',
        checkboxLabel: 'Подписаться на рассылку',
      },
      {
        name: 'message',
        type: 'textarea',
        label: 'Сообщение',
        placeholder: 'Введите ваше сообщение',
        rows: 4,
      },
    ],
  },
  mutations: {
    UPDATE_FORM_DATA(state, payload) {
      state.formData = payload
    },
    RESET_FORM(state) {
      state.formData.name = ''
      state.formData.email = ''
    },
  },
})
