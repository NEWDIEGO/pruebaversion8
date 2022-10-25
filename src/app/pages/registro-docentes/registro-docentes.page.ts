import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ValidadorService } from 'src/app/services/validador.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registro-docentes',
  templateUrl: './registro-docentes.page.html',
  styleUrls: ['./registro-docentes.page.scss'],
})
export class RegistroDocentesPage implements OnInit {

  docenteForm = new FormGroup({
    rut: new FormControl('',[Validators.required, Validators.pattern('[0-9]{1,2}.[0-9]{3}.[0-9]{3}-[0-9kK]{1}')]),
    nombre: new FormControl('',[Validators.required, Validators.minLength(3)]),
    apellidos: new FormControl('',[Validators.required, Validators.minLength(3)]),
    correo: new FormControl('',[Validators.required, Validators.minLength(10),Validators.pattern('^[a-z0-9._%+-]+@profesor.duoc.cl')]),
    fecha_nac: new FormControl('',[Validators.required]),
    departamento: new FormControl('',[Validators.required, Validators.min(3), Validators.max(30)]),
    password: new FormControl('',[Validators.required, Validators.minLength(8),Validators.maxLength(21)]),
    usuario :new FormControl('docente')
  })

  verificarPass: string
  docente : any = {
    rut: '',
    nombre: '',
    apellidos: '',
    correo: '',
    fecha_nac: '',
    departamento: '',
    password: '',
    usuario: 'docente'
  }
  
  docentes: any[] = [];

  KEY_personas = 'usuarios';

  constructor(private alertController: AlertController, private usuariosService: UsuariosService, private router: Router, private validador: ValidadorService, private storage :StorageService) {
    
   }

  ngOnInit() {
    console.log(this.storage.getDatos(this.KEY_personas))
  }

  async guardar(){
    if(!this.validador.rutValidator(this.docenteForm.controls.rut.value)){
      let alert = await this.alertController.create({
        message: 'Usuario ya existe',
        buttons: ['OK']
      })
      alert.present();
      //alert('rut incorrecto');
      return;
    }
    if(!this.validador.validarEdadMinima(17,this.docenteForm.controls.fecha_nac.value)){
      let alert = await this.alertController.create({
        message: 'El usuario debe ser mayor de edad',
        buttons: ['OK']
      })
      alert.present();
      //alert('edad no valida');
      return;
    }
    if(this.docenteForm.controls.password.value != this.verificarPass){
      let alert = await this.alertController.create({
        message: 'La contraseña no coincide',
        buttons: ['OK']
      })
      alert.present();
      //alert('Las contrasenas no coinciden')
      return;
    }
    var respuesta: boolean  = await this.storage.agregar(this.KEY_personas,this.docente)
    if(respuesta){
      alert('Usuario registrado!');
      await this.docenteForm.reset();
      this.verificarPass = '';
    }else{
      let alert = await this.alertController.create({
        message: 'Usuario ya existe',
        buttons: ['OK']
      })
      alert.present();
      //alert('Usuario ya existe')
    }
  }

  limpiar(){
    this.docenteForm.reset();
    this.verificarPass = '';
  }
}
