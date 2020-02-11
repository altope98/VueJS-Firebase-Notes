<template lang="html">

  <section class="registro">
    <h1>registro Component</h1>
    <form @submit.prevent="signup">
                <div class="form-group">
                  <input type="text" class="form-control" v-model="email" placeholder="Email">
                </div>
                <div class="form-group">
                  <input type="password" class="form-control" v-model="password" placeholder="Password">
                </div>
                 <div class="form-group">
                  <button type="submit" class="btn btn-primary">Registro</button>
                  </div>
    </form>
  </section>

</template>

<script lang="js">
 import  firebase  from 'firebase'
  export default  {
    name: 'registro',
    props: [],
    mounted () {

    },
    data () {
      return {
        email:"",
        password:""
      }
    },
    methods: {
      signup () {
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(() => {
          this.email=""
          this.password=""
          this.$router.replace('login')

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
  .registro {

  }
</style>
