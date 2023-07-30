<template>
  <div class="login-page">
    <div class="login-form">
      <h2 class="login-form__title">Logowanie</h2>
      <form @submit.prevent="submitForm">
        <div class="login-form__field">
          <label for="username" class="login-form__label">Nazwa użytkownika</label>
          <input
            type="text"
            id="username"
            v-model.trim="vLogin"
            class="login-form__input"
            required
          />
        </div>
        <div class="login-form__field">
          <label for="password" class="login-form__label">Hasło</label>
          <input
            type="password"
            id="password"
            v-model.trim="vPass"
            class="login-form__input"
            required
            autocomplete="off"
          />
        </div>
        <span v-if="wrongLogin" style="color: red">Dane logowania są niepoprawne!</span>

        <button type="submit" class="login-form__button">Zaloguj się</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from '../stores/store'
import { RouterLink, useRouter } from 'vue-router'
const router = useRouter()
const store = useStore()
const vLogin = ref<string>('')
const vPass = ref<string>('')
const wrongLogin = ref(null)

const submitForm = () => {
  if (vLogin.value === store.user && vPass.value === store.pass) {
    store.login()
    router.push('/dashboard')
  } else {
    wrongLogin.value = true
  }
}
</script>

<style>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f2f2f2;
}

.login-form {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
}
.login-form__title {
  font-size: 24px;
  margin-bottom: 20px;
}

.login-form__field {
  margin-bottom: 20px;
}

.login-form__label {
  display: block;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
}

.login-form__input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.login-form__button {
  width: 100%;
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 12px;
}

.login-form__button:hover {
  background-color: #0056b3;
}
</style>
