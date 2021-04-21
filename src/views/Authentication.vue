<template>
  <div class='auth'>
    <div class='auth-container'>
      <div class='auth-header'>
        {{headerText}}
      </div>
      <div class='auth-body'>
        <form>
          <label for='login-email'>Email</label>
          <input id='login-email' type='email' name='Email'>
          <label for='login-password'>Password</label>
          <input id='login-password' type='password' name='Password'>
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
      headerText: 'Вход'
    }
  },
  mounted () {
    console.log(this.$route)
  }
}
</script>
