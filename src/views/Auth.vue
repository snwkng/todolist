<template>
  <div class='auth'>
    <div class='auth-container'>
      <div class='auth-header'>
        <h1>{{headerText}}</h1>
      </div>
      <div class='auth-body'>
        <form @submit.prevent='submit'>
          <div class="form-group">
            <label class="label" for='login-name'>Name</label>
            <input class="auth-input" id='login-name' type='text' name='Name' v-model='form.username'>
          </div>
          <div class="form-group">
            <label class="label" for='login-password'>Password</label>
            <input class="auth-input" id='login-password' type='password' name='Password' v-model='form.password'>
          </div>
          <button class="auth-submit" type="submit">{{submitText}}</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Authentication',
  data () {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  computed: {
    headerText () {
      return this.$route.name === 'Login' ? 'Вход' : 'Регистрация'
    },
    submitText () {
      return this.$route.name === 'Login' ? 'Войти' : 'Зарегистрироваться'
    }
  },
  methods: {
    ...mapActions({
      login: 'auth/GET_LOGIN'
    }),

    submit () {
      if (this.$route.name === 'Login') {
        this.login(this.form).then(() => {
          this.$router.replace({
            name: 'TodoList'
          })
        })
      } else {
      }
    }
  }
}
</script>
