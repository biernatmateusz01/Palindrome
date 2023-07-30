<template>
  <div class="container">
    <form @submit.prevent="sendForm">
      <input
        class="input-field"
        v-model="newItem"
        @keydown.enter="addItem"
        placeholder="Enter item"
      />
      <button type="submit" class="add-button">Add</button>
    </form>
    <ul class="item-container">
      <li
        class="item"
        :style="item.isPalindrome ? 'color: green; border: green' : 'color: red; border: red;'"
        v-for="(item, index) in store.palindromes"
        :key="index"
      >
        <span>
          {{ item.value }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '../stores/store'
const store = useStore()
const elements = store.palindromes
const router = useRouter()
const newItem = ref('')

function isPalindrome(str) {
  const sanitizedStr = str.toLowerCase().replace(/[^a-z0-9]/g, '')

  return sanitizedStr === sanitizedStr.split('').reverse().join('')
}

const sendForm = () => {
  if (newItem.value.trim() !== '') {
    const checkPalindrome = isPalindrome(newItem.value)
    store.addPalindrome({
      isPalindrome: checkPalindrome,
      value: newItem.value,
      id: Date.now().toString()
    })
    newItem.value = ''
  }
}

if (store.isLogged === false) {
  router.push('/')
}
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f2f2f2;
}

.form {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
}

.input-field {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
}

.add-button {
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 12px;
}

.add-button:hover {
  background-color: #0056b3;
}

.item-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr); 
  gap: 10px;
  max-width: 100%;
}

.item {
  font-size: 16px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  list-style: none;
}

.palindrome {
  background-color: #d4edda; 
}

.green {
  color: green;
}

.red {
  color: red;
}
@media (max-width: 768px) {
  .item-container {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 480px) {
  .item-container {
    grid-template-columns: repeat(2, 1fr); 
  }
}

@media (max-width: 320px) {
  .item-container {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
