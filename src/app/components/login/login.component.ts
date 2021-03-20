import { LOCALE_ID, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Direccion } from 'src/app/Models/Api/Direccion';
import { DireccionesServiceService } from 'src/app/services/direcciones-service.service';
import Swal from 'sweetalert2';
import { Response } from 'src/app/models/Api/Response';
import { environment } from 'src/environments/environment';
import { fixDate, MY_DATE_FORMATS } from 'src/app/Date_formats/formato';
import { DateValidator } from 'src/app/Validator/CustomValidator/DateValidator';
import { ErrorDialogComponent } from 'src/app/components/error-dialog/error-dialog.component'
import { MatDialog } from '@angular/material/dialog';
import { UsuarioServiceService } from 'src/app/services/usuario-service.service';
import { Usuario } from 'src/app/Models/Usuario';
import { Moment } from 'moment';

import * as moment from 'moment';
import { BasicResponse } from 'src/app/Models/Api/BasicResponse';
import { Router } from '@angular/router';
import { MailServiceService } from 'src/app/services/mail-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS},
    { provide: LOCALE_ID, useValue: 'es' }
  ],
})
export class LoginComponent implements OnInit {

  //#region Constructor
  constructor(private formBuilder: FormBuilder, 
    private servicioDirecciones:DireccionesServiceService,
    private servicioUsuario: UsuarioServiceService,
    private servicioMail: MailServiceService,
    private dialog: MatDialog,
    private router: Router,){
    this.generarFormulario();
  }
  //#endregion

  //#region  Propiedades
  form: FormGroup;
  direccionesFiltradas: Observable<Direccion[]>;
  direcciones: Array<Direccion> = [];
  minLength = 2;
  regex = /^(\+[0-9])?[-]*(8|9)[ -]*([0-9][ -]*){8} $/;
  usuario = new Usuario();

  //#endregion

  //#endregion Métodos
  ngOnInit(): void {
    this.cargarDirecciones();
    this.direccionesFiltradas = this.form.get('direccion').valueChanges.pipe(
      startWith(),
      map(direccion => this.filtroDireccion(direccion))
    );
  }
  //Formulario reactivo
  generarFormulario():void{
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      mail: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required]],
      fecha: [Date.now, [Validators.required]],
      direccion: [null,[Validators.required]]
    },
    {
      validators: DateValidator('fecha')});
  }
  //Evento del registro
  registro(event: Event):void{
    event.preventDefault();
    this.registrarUsuario()
    if (this.form.invalid){
      this.form.markAllAsTouched();
      this.abrirDialog();
      return;
    };
  }

  //Filtro personalizado para la búsqueda
  private filtroDireccion(direccion: string){
    if (direccion.length>=3){
      const filterValue = direccion.toLowerCase();
      return this.direcciones.filter(direccion => direccion.ciudad.toLowerCase().includes(filterValue));
    }
    else
      return [];
  }
  //Abrir Dialogo
  abrirDialog(){
    const dialogRef = this.dialog.open(ErrorDialogComponent,{
      width: '300',
      disableClose: true,
      data: this.form
    });
  }

  //Da formaro a la opción del autocomplete
  getNombreCompleto(direccion: Direccion){
    return direccion === null? '' : `${direccion.ciudad} - ${direccion.entidad} - ${direccion.pais}`;
  }
  //Consulta el método del Api para obtener las direcciones de la base de datos
  cargarDirecciones(){
    Swal.fire({
      icon:'info',
      allowOutsideClick: false,
      text: 'Cargando datos'
    });
    Swal.showLoading();
    this.servicioDirecciones.ObtenerDirecciones().subscribe((responseDirecciones: Response<Array<Direccion>>)=>{
      if (responseDirecciones.exito){ //Respuesta exitosa del api
        this.direcciones = responseDirecciones.data;
        Swal.close();
      }
      else{ //Respuesta negativa del api
        Swal.fire({
          icon:'warning',
          allowOutsideClick: false,
          text: responseDirecciones.mensaje
        });
      }
    }, ()=>{
      Swal.fire({ //Error inesperado
        icon:'error',
        allowOutsideClick: false,
        text: environment.errorApiMensaje
      });
    });
  }

  
//Ejecuta el método de la api que registra el usuario
  registrarUsuario(){
    this.usuario.nombre = this.form.get('nombre').value;
    this.usuario.mail = this.form.get('mail').value;
    this.usuario.telefono = this.form.get('telefono').value;
    this.usuario.idCiudad = this.form.get('direccion').value.idPais;
    let inputFecha: Moment = this.form.get('fecha').value;
    this.usuario.fecha = fixDate(inputFecha.year(), inputFecha.month(), inputFecha.date());
    
    Swal.fire({
      icon:'info',
      allowOutsideClick: false,
      text: 'Registrando usuuario'
    });
    Swal.showLoading();
    this.servicioUsuario.RegistrarUsuario(this.usuario).subscribe((responseRegistro: BasicResponse)=>{
      if (responseRegistro.exito){ //Respuesta exitosa del api
        Swal.close();
        this.enviarCorreo();
      }
      else{ //Respuesta negativa del api
        Swal.fire({
          icon:'warning',
          allowOutsideClick: false,
          text: responseRegistro.mensaje
        });
      }
    }, ()=>{
      Swal.fire({ //Error inesperado
        icon:'error',
        allowOutsideClick: false,
        text: environment.errorApiMensaje
      });
    });
  }

  enviarCorreo(){
    Swal.showLoading();
    this.servicioMail.enviarMail(this.usuario).subscribe((mailResponse: BasicResponse)=>{
      if (mailResponse.exito){ //Respuesta exitosa del api
        Swal.close();
        localStorage.setItem('usuario', JSON.stringify(this.usuario));
        localStorage.setItem('direccion', JSON.stringify(this.form.get('direccion').value));
        this.router.navigateByUrl('completo');
      }
      else{ //Respuesta negativa del api
        Swal.fire({
          icon:'warning',
          allowOutsideClick: false,
          text: mailResponse.mensaje
        });
      }
    }, ()=>{
      Swal.fire({ //Error inesperado
        icon:'error',
        allowOutsideClick: false,
        text: environment.errorApiMensaje
      });
    });
  }
  //#endregion
 
  //#endregion
}
