<template>
  <div>
    <div class="full-login-sm">
      <div class="login-sm" v-show="islogin">
        <nut-avatar size="large"></nut-avatar>
        <span class="title">Log In</span>
        <nut-textinput class="input-sm" size="large" v-model="loginEmail" placeholder="邮箱*" />
        <nut-textinput
          type="password"
          class="input-sm"
          size="large"
          v-model="loginPassword"
          placeholder="密码*"
        />
        <p class="hint">
          还不是用户？
          <u v-on:click="islogin = false">点击注册</u>
        </p>
        <button class="login-btn" @click="login()">登陆</button>
      </div>

      <div class="signup-sm" v-show="!islogin">
        <nut-avatar size="large"></nut-avatar>
        <span class="title">Sign Up</span>
        <nut-textinput class="input-sm" size="large" v-model="registerEmail" placeholder="邮箱*" />
        <nut-textinput
          type="password"
          class="input-sm"
          size="large"
          v-model="registerPassword"
          placeholder="密码*"
        />

        <nut-textinput
          type="password"
          class="input-sm"
          size="large"
          v-model="registerPasswordConfirm"
          placeholder="确认密码*"
        />
        <button class="signup-btn" @click="register()">注册</button>
      </div>
    </div>
  </div>
</template>


<script>
import firebase from "firebase";

export default {
  data: function() {
    return {
      showlogin: false,
      islogin: true,

      loginEmail: "",
      loginPassword: "",

      registerEmail: "",
      registerPassword: "",
      registerPasswordConfirm: ""
    };
  },

  methods: {
    login() {
      if (this.loginEmail == "") {
        alert("用户名不能为空");
        return false;
      }
      if (this.loginPassword == "") {
        alert("密码名不能为空");
        return false;
      }

      firebase
        .auth()
        .signInWithEmailAndPassword(this.loginEmail, this.loginPassword)
        .then(
          () => {
            alert(`You are logged in as ${this.loginEmail}`);
            //this.$router.go({ path: this.$router.path });
            this.$router.push("/");
          },
          err => {
            alert(err.message);
          }
        );
      e.preventDefault();
    },

    register() {
      if (this.registerEmail == "") {
        alert("用户名不能为空!");
      }
      if (this.registerPassword == "") {
        alert("密码不能为空!");
      }

      if (this.registerPassword != this.registerPasswordConfirm) {
        alert("两次密码不相符!");
      }

      firebase
        .auth()
        .createUserWithEmailAndPassword(
          this.registerEmail,
          this.registerPassword
        )
        .then(
          () => {
            alert(`Account created for ${this.registerEmail}`);

            this.$router.push("/");
          },
          err => {
            alert(err.message);
          }
        );
      e.preventDefault();
    }
  }
};
</script>


<style lang="scss" scoped>
/* login css small*/
.full-login-sm {
  padding: 10% 0 10% 0;
}
.large {
  font-size: 0.9rem;
}

.login-sm {
  margin: 0 auto;
  background-color: white;
  width: 75%;
  padding: 7% 5% 10% 5%;

  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
  transform: rotate(0deg);
}

.input-sm {
  margin-top: 10%;
  width: 100%;
  font-size: 1rem;
}

.login-btn {
  width: 100%;
  margin-top: 10%;
  background-color: rgb(246, 98, 64);
  color: white;
  font-weight: 600;
  padding: 2%;
  font-size: 0.9rem;
}

.hint {
  margin-top: 8%;
  text-align: right;
  font-size: 0.8rem;
  color: #808080;
}

.signup-sm {
  margin: 0 auto;
  background-color: white;
  width: 75%;
  padding: 7% 5% 10% 5%;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
  transform: rotate(0deg);
}

.signup-btn {
  width: 100%;
  margin-top: 10%;
  background-color: rgb(0, 178, 238);
  color: white;
  font-weight: 600;
  padding: 2%;
  font-size: 0.9rem;
}
</style>
