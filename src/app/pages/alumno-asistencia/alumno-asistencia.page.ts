import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-alumno-asistencia',
  templateUrl: './alumno-asistencia.page.html',
  styleUrls: ['./alumno-asistencia.page.scss'],
})
export class AlumnoAsistenciaPage implements OnInit {

  usuario : any [];
  KEY_asistencia= 'clase';
  clases : any [];
  codigo = '';


  constructor(private alertController: AlertController, public router : Router, public ruta: ActivatedRoute,private storageService : StorageService) { }

  async ngOnInit() {
    await this.cargarPersona();
    await console.log(this.usuario);
  }


  async cargarPersona(){
    let usuID = this.ruta.snapshot.paramMap.get('usuarioID');
      this.usuario = await this.storageService.getDatoById('usuarios',usuID)
    }

    async registrarClase(rut){
      var respuesta: boolean  = await this.storageService.guardarAlumno('asistencia',this.codigo,rut)
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