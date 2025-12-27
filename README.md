# Form Generator Vue.js

Универсальный генератор форм на Vue 3

## Запуск

```
npm install
```

```
npm run dev
```

### Props

| Prop         | Тип                                           | Описание                    |
| ------------ | --------------------------------------------- | --------------------------- |
| `fields`     | `FormField[]`                                 | Массив описаний полей формы |
| `modelValue` | `Record<string, string \| number \| boolean>` | Объект с данными формы      |

### Events

| Event     | Параметры                                           | Описание                       |
| --------- | --------------------------------------------------- | ------------------------------ |
| `@submit` | `data: Record<string, string \| number \| boolean>` | Срабатывает при отправке формы |
| `@cancel` | -                                                   | Срабатывает при отмене формы   |

### Типы полей

#### Input

```typescript
{
  name: 'fieldName',
  type: 'input',
  label: 'Название поля',
  placeholder?: 'Подсказка',
  inputType?: 'text' | 'email' | 'password' | 'number',
  required?: boolean
}
```

#### Select

```typescript
{
  name: 'fieldName',
  type: 'select',
  label: 'Название поля',
  placeholder?: 'Выберите опцию',
  required?: boolean,
  options: [
    { value: 'value1', label: 'Опция 1' },
    { value: 'value2', label: 'Опция 2' }
  ]
}
```

#### Checkbox

```typescript
{
  name: 'fieldName',
  type: 'checkbox',
  label: 'Название поля',
  checkboxLabel: 'Текст рядом с чекбоксом',
  required?: boolean
}
```

#### Textarea

```typescript
{
  name: 'fieldName',
  type: 'textarea',
  label: 'Название поля',
  placeholder?: 'Подсказка',
  rows?: number,
  required?: boolean
}
```

## Кастомизация через слоты

### Слоты для полей

**Именование:** `#field-{fieldName}`

**Доступные параметры:**

- `field` - объект поля с настройками
- `value` - текущее значение поля
- `error` - состояние ошибки валидации

### Слот для кнопок

**Именование:** `#actions`

**Доступные параметры:**

- `submit` - функция отправки формы
- `cancel` - функция отмены формы
