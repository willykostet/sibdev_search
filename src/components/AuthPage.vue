<template>
  <div class="auth-wrapper">
    <div class="auth">
      <img src="../assets/logo.svg" alt="">
      <h1>Вход</h1>
      <form class="form-login" action="" @submit="loginUser()">
        <div class="form-login-input">
          <label>Логин</label>
          <input v-model="login" type="text">
        </div>
        <div class="form-login-input">
          <label>Пароль</label>
          <input v-model="password" :type="!showPass ? 'password' : 'text'">
          <div class="passShow" @click="showPass = !showPass">
            <img class="" v-if="!showPass" src="../assets/eye-off.svg" alt="eye">
            <img class="" v-else src="../assets/eye.svg" alt="eye">
          </div>
        </div>

        <button class="form-login-btn" type="submit">Войти</button>
      </form>


    </div>
  </div>
</template>

<script>
import { users } from '../fakeDB/users.js'
export default {
  name: 'AuthPage',
  data() {
    return {
      login: null,
      password: null,
      showPass: false
    }
  },
  methods: {
    loginUser() {
      if (users.find((user) => user.name === this.login && user.password === this.password)) {
        localStorage.setItem('sibdevAccess', Math.random().toString(36).substr(2))
        localStorage.setItem('currentUser', this.login.toString())
        let array = []
        if (!localStorage.getItem(this.login.toString())) { localStorage.setItem(this.login.toString(), JSON.stringify(array)) }
        this.$router.push('/')
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/index.scss';
.auth-wrapper {
	height: 100vh;
	background: $semi-white;
	position: relative;
	min-height: 550px;
}
img {
	width: 88px;
	height: 88px;
}
.auth {
	display: flex;
	flex-direction: column;
	align-items: center;
	max-width: 510px;
	width: 100%;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background: $white;
	padding: 49px 88px 60px;
	border: 1px solid $light-black;
	border-radius: 10px;
}
.passShow {
	img {
		width: 100%;
	}
	position: absolute;
	right: 15px;
	top: 0;
	max-width: 22px;
	filter: grayscale(1);
	cursor: pointer;
}
.form-login-input {
	&:focus {
		.passShow {
			filter: none;
		}
	}
	position: relative;
	width: 100%;
}
h1 {
	font-weight: 700;
	font-size: 18px;
	margin: 20px auto;
	line-height: 28px;
}
label {
	align-self: flex-start;
	font-size: 16px;
	line-height: 22px;
	color: $dark-blue;
}
input {
	align-self: flex-start;
	border: 1px solid $dark-blue;
	background: $white;
	margin-bottom: 20px;
	font-size: 20px;
	line-height: 24px;
	color: $lightern-black;
	width: 100%;
	border-radius: 10px;
	padding: 10px;
}
.form-login {
	display: flex;
	flex-direction: column;
	align-items: center;
}
.form-login-btn {
	cursor: pointer;
	background: $primary;
	border-radius: 5px;
	font-size: 20px;
	line-height: 24px;
	color: $white;
	padding: 15px 60px;
	border: 0;
	margin: 40px auto 0;
}
@media screen and (max-width: 600px) {
	.auth {
		max-width: 90%;
	}
}
@media screen and (max-width: 445px) {
	.auth {
		max-width: 90%;
		padding: 50px 15px 60px;
	}
}

</style>
