<template lang="html">

  <section class="login" >
    <h1>login Component</h1>
    <form @submit.prevent="login">
                <div class="form-group">
                  <input type="text" class="form-control" v-model="email" placeholder="Email">
                </div>
                <div class="form-group">
                  <input type="password" class="form-control" v-model="password" placeholder="Password">
                </div>
                 <div class="form-group">
                  <button type="submit" class="btn btn-primary">Login</button>
                  </div>
                  <section id="firebaseui-auth-container"></section>
    </form>
     <p><router-link to="/registro">
      Registrate
    </router-link></p>
  </section>

</template>

<script lang="js">
 import  firebase  from 'firebase'  
var firebaseui = require('firebaseui');
  export default  {
    name: 'login',
    props: [],
    mounted () {
      let ui = firebaseui.auth.AuthUI.getInstance();
      if (!ui) {
        ui = new firebaseui.auth.AuthUI(firebase.auth());
      }
        var uiConfig = {
            signInSuccessUrl: "/privado",
            signInOptions: [firebase.auth.FacebookAuthProvider.PROVIDER_ID, firebase.auth.GoogleAuthProvider.PROVIDER_ID]
        };
        ui.start("#firebaseui-auth-container", uiConfig)
    },
    data () {
      return {
        email:"",
        password:""
      }
    },
    methods: {
       login () {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(() => {
          this.email=""
          this.password=""
          this.$router.replace('privado')

        }).catch((err) => {
          alert(err.message)
        })
      } 
    },
    computed: {

    }
}


</script>

<style scoped >
  .login {

  }
</style>
