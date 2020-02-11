<template lang="html">
<div>
  <h2>privado Component</h2>
  <nav class="navbar navbar-dark bg-primary">
    <a style=" color:black;">{{usuarioConectado.email}}</a>
    <a @click="logout" style="cursor: pointer; color:black;" class="btn btn-danger" >Logout</a>
  </nav> 
  <div class="container">
    <div class="row mt-5">
      <div class="col-sm-4">
        <div class="card">
          <div class="car-header">
            Añadir nota
          </div>
          <div class="car-body">
            <form @submit.prevent="addNota">
                <!-- <div class="form-group">
                  <input type="text" class="form-control" v-model="nuevaNota.Autor" placeholder="Autor">
                </div> -->
                <div class="form-group">
                  <input type="text" class="form-control" v-model="nuevaNota.Texto" placeholder="Texto">
                </div>
                <div class="form-group">
                  <input type="file" class="form-control-file" @change="subirNota" accept="*" placeholder="Seleccionar archivo">
                </div>
                 <div class="form-group">
                  <button type="submit" class="btn btn-primary">Añadir</button>
                  </div>
              </form>
          </div>
        </div>

      </div>
      <div class="col-sm-8 text-center">
        <div class="card">
          <div class="card-header">
            Lista tareas
          </div>
          <div class="card-body">
            <table class="table table-stripped table-bordered">
                <tr>
                  <th>Autor</th>
                  <th>Texto</th>
                  <th>Archivo</th>
                  <td></td>
                </tr>
                <tr v-for="(nota, index) in listaNotas" v-bind:key="index">
                  <td>{{nota.Autor}}</td>
                  <td>{{nota.Texto}}</td>
                  <td><a :href="nota.Archivo['URL']">{{nota.Archivo["Nombre"]}}</a></td>
                  <td><button class="form-control btn btn-primary" @click="borrarNota(nota.id)">Borrar</button></td>
                </tr>
            </table>
          </div>
        </div>
      </div>
        

    </div>
  </div>

</div>
  

</template>


<script lang="js">
import  firebase  from 'firebase' 
import { db } from "../db.js";

  export default  {
    name: 'privado',
    props: [],
    mounted () {
    },
    data () {
      return {
        listaNotas:[],
        nuevoArchivo:null,
        nuevaNota:{
          Autor:'',
          Texto:'',
          Archivo:{
            Nombre:'',
            URL:''
          }
        }, 
      }
    },
    firestore: {
      listaNotas: db.collection('listaNotas'),
      
    },
    methods: {
      addNota: function () {

        firebase.storage().ref(`${this.nuevoArchivo.name}`).put(this.nuevoArchivo);
        firebase.storage().ref().child(this.nuevoArchivo.name).getDownloadURL().then(
          url=>{
            this.nuevoArchivo.url=url
             db.collection('listaNotas').add({
               Texto: this.nuevaNota.Texto,
               Autor: firebase.auth().currentUser.email ,
               Archivo:{
                 Nombre: this.nuevoArchivo.name,
                 URL: url
               }
              });
              
            this.nuevaNota.Texto="";
            this.nuevaNota.Autor="";
          });


       
      },
      borrarNota: function(id){
        db.collection('listaNotas').doc(id).delete()
      },
      logout: function () {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      }).catch((e)=>{
        alert(e.nessage)
      })
      },

      subirNota:function(e){
        this.nuevoArchivo=e.target.files[0]
      }
    },
    computed: {
       usuarioConectado:function(){
         
          return firebase.auth().currentUser;
      } 
    }
}


</script>

<style scoped >
/*.privado {

  }*/
</style>
