import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { AlumnoAsistenciaPage } from '../alumno-asistencia/alumno-asistencia.page';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-alumno-page',
  templateUrl: './alumno-page.page.html',
  styleUrls: ['./alumno-page.page.scss'],
})
export class AlumnoPagePage implements OnInit {


  usuario : any [];
  KEY_sesion = 'sesion';
  codigo = '';
  KEY_asis = 'asistencia';


  constructor(private alertController: AlertController, private router : Router, private ActivatedRoute : ActivatedRoute,private storageService : StorageService) { }

  async ngOnInit() {
    this.usuario = this.router.getCurrentNavigation().extras.state.usuario;
  }
  logout(){
    this.storageService.cerrarSesion()
  }
  
  async registrarClase(rut){
    var respuesta: boolean  = await this.storageService.guardarAlumno(this.KEY_asis,this.codigo,rut)
    if(respuesta){
      let alert = await this.alertController.create({
        message: 'Asistencia registrada exitosamente!',
        buttons: ['OK']
      })
      alert.present();
      //alert('Asistencia registrada exitosamente!');
    }else{
      let alert = await this.alertController.create({
        message: 'Clase no registrada',
        buttons: ['OK']
      })
      alert.present();
      //alert('Clase no registrada')
    }

  }

}
