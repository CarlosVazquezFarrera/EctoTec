import { Component, OnInit } from '@angular/core';
import { Direccion } from 'src/app/Models/Api/Direccion';
import { Usuario } from 'src/app/Models/Usuario';

@Component({
  selector: 'app-terminado',
  templateUrl: './terminado.component.html',
  styleUrls: ['./terminado.component.css']
})
export class TerminadoComponent implements OnInit {

  //#region 
  constructor() { 
    this.Usuario = new Usuario();
    this.Usuario = JSON.parse(localStorage.getItem('usuario'));

    this.direccion = new Direccion();
    this.direccion = JSON.parse(localStorage.getItem('direccion'));
  }
  //#endregion

  //#region  Propiedades
  Usuario: Usuario;
  direccion: Direccion;
  //#endregion
  //#region  Métodos
  ngOnInit(): void {
  }
  
  //#endregion

  //#region  Gets
  get getFechaActual(){
    let fecha = new Date(Date.now());
    return fecha.toUTCString();
  }
  //#endregion

}
