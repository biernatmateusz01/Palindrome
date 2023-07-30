import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useStore = defineStore('counter', () => {
  const palindromes = reactive([])
  const isLogged = ref(false)
  const user = 'Admin12'
  const pass = 'pass123'

  const addPalindrome = (el) => {
    palindromes.push(el)
  }

  const login = () => {
    isLogged.value = !isLogged.value
  }
  return { palindromes, isLogged, user, pass, addPalindrome, login}
})
