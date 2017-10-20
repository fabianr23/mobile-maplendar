import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
 
//let listaenvio: any[] = [];
@IonicPage()
@Component({
  selector: 'page-buscador',
  templateUrl: 'buscador.html',
})
export class BuscadorPage {
  //listaenvio: any[] = [];
  listaenvio: any[] = [];
  arreglofinal: any[] = [];
  usuarioenvio = {"email":""};
  usuarios: any ="";
  users: any ="";
  objetofinal: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private authprovider: AuthProvider, public alertCtrl: AlertController) {
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuscadorPage');
  }



  getUsersByName(FormSearch){
    console.log("form search: ", FormSearch);
    this.authprovider.getUsersByName(FormSearch.value).then(data=>{
      this.users = data;
      console.log("data de formsearch ts: ", this.users);
      this.usuarios = this.users.users;
      this.authprovider.refreshToken(this.users.token);
    })
  }

  sendInvites(){
    
    if(this.listaenvio.length > 0){
      for (let i in this.listaenvio){
        let indice = this.listaenvio[i];
        let object = { ID: +indice.id , Name: indice.first_name , Lastname: indice.lastname , Email:indice.email };
        this.arreglofinal.push(object);
        console.log("arreglo final: ",this.arreglofinal);
      }
      this.objetofinal = {invites: this.arreglofinal};
      console.log("objeto final: ", this.objetofinal);
    }
    else{
       let alert = this.alertCtrl.create({
        title: "Usted no ha seleccionado a ningún usuario, ¡Idiota!",
        buttons:['OK']
      });
      alert.present();
    }
  }

  userSelected(chek , index ){
    if(chek.target.checked){
      console.log ("agregar usuario al arreglo");
      console.log("Usuario: "+JSON.stringify(index));
      //this.usuarioenvio.email = index.email;
      let verifica = this.listaenvio.filter(function(el) {
        return el.id === index.id;
      });

      if (!verifica.length) {
        this.listaenvio.push(index);
        console.log ("arreglo a enviar: ", this.listaenvio);    
      }
    }
    else{
      let verifica = this.listaenvio.filter(function(el) {
        return el.id === index.id;
      });
      if (verifica.length) {
        let indice = this.listaenvio.indexOf(index);
        console.log ("indice el usuario: ", indice);
        console.log ("quita el usuario del arreglo: ", index.email);
        this.listaenvio.splice(indice,1);    
        console.log ("arreglo nuevo: ", this.listaenvio);  
      }
    }
  }


}
