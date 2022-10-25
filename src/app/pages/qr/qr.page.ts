import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { v4 } from 'uuid';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage implements OnInit {

  elementType = 'canvas';
  id_asis = '';
  datosClase = {};
  listaClases = [];
  KEY_asis='asistencia'


  asistencia : any = {
    id_asis: '',
    id_clase: '',
    fecha_ho: new Date(),
    alumno: []}


  constructor(private alertController: AlertController, public ruta: ActivatedRoute,private storage: StorageService) { }

  async ngOnInit() {
    await this.cargarClase()
  }

  generarCodigo(){
    if (this.id_asis == '') {
      this.id_asis = v4();
    }
  }

  async cargarClase(){
    this.ruta.paramMap.subscribe( us =>{
      this.datosClase = this.storage.getDatoById('clase',us.get('claseID')).then(res =>
        this.listaClases.push(res))
    })
  }

  async crearAsistencia(id_clase){
      this.id_asis = v4();
      this.asistencia.id_asis = this.id_asis 
      this.asistencia.id_clase = id_clase 
      var respuesta: boolean = await this.storage.agregarAsis(this.KEY_asis, this.asistencia);
      if (respuesta) {
        let alert = await this.alertController.create({
          message: 'Registrado',
          buttons: ['OK']
        })
        alert.present();
      //alert('Registrado');
       }else{
        let alert = await this.alertController.create({
          message: 'clase no registrada',
          buttons: ['OK']
        })
        alert.present();
        //alert('clase no registrada')
      }}
}

