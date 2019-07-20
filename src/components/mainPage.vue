<template>
  <div>
    <div class="nav">
      <!--仅在未登录状态下, 才能看到log in-->
      <button v-if="!isLoggedIn" class="login">
        <router-link to="/login">Login</router-link>
      </button>
      <!--仅在登录状态下, 才能看到log out-->
      <div class="logout-list">
        <button v-if="isLoggedIn" @click="logout()" class="logout">Logout</button>
        <button v-if="isLoggedIn" class="login">{{currentUser}}</button>
      </div>
    </div>

    <v-buyCar />
    <router-link to="/sellCar">
      <div class="word">
        <div id="nouse">转</div>
        <div id="circle"></div>
      </div>
    </router-link>

    <!--<v-bottom />-->
  </div>
</template>

<script>
import firebase from "firebase";
import buyCar from "./buyCar.vue";
import bottom from "./bottom.vue";

export default {
  components: {
    "v-buyCar": buyCar,
    "v-bottom": bottom
  },

  data() {
    return {
      isLoggedIn: false,
      currentUser: false
    };
  },

  created() {
    if (firebase.auth().currentUser) {
      this.isLoggedIn = true;
      this.currentUser = firebase.auth().currentUser.email;
    }
  },

  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.go({ path: this.$router.path });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>


<style lang="scss" scoped>
.nav {
  overflow: hidden;
  position: fixed;
  width: 100%;
  height: 3rem;
  z-index: 999;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
a {
  color: white;
  font-weight: 600;
}
.login {
  float: right;
  color: white;
  margin-top: 1.35%;
  background-color: #ff9966;
  padding: 2%;
  font-weight: 600;
}
.logout {
  float: right;
  margin: 1.35% 7% 0 0;
  color: white;
  background-color: #cccccc;
  padding: 2%;
  font-weight: 600;
}

#nouse {
  height: 60%;
  margin-bottom: -3.25rem;
  text-align: center;

  font-size: 1.5rem;
  color: white;
  font-weight: 800;
  z-index: 999;
}
#circle {
  width: 4rem;
  height: 4rem;
  border-radius: 50rem;
  margin: auto;
  background-color: #ff9966;
  border: none;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.6);
}

.word {
  position: fixed;
  bottom: 0;
  margin-bottom: 2%;
}
</style>
