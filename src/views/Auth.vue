<template>
  <div class='auth'>
    <div class='auth-container'>
      <div class='auth-header'>
        <h1>{{headerText}}</h1>
      </div>
      <div class='auth-body'>
        <form>
          <div class="form-group">
            <label class="label" for='login-name'>Name</label>
            <input class="auth-input" id='login-name' type='email' name='Name'>
          </div>
          <div class="form-group">
            <label class="label" for='login-password'>Password</label>
            <input class="auth-input" id='login-password' type='password' name='Password'>
          </div>
          <button class="auth-submit" type="submit">{{submitText}}</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Authentication',
  data () {
    return {
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
  mounted () {
    console.log(this.$route)
  }
}
</script>
