import { LOCALE_ID, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import {from, Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Direccion } from 'src/app/Models/Api/Direccion';
import { DireccionesServiceService } from 'src/app/services/direcciones-service.service';
import Swal from 'sweetalert2';
import { Response } from 'src/app/models/Api/Response';
import { environment } from 'src/environments/environment';
import { MY_DATE_FORMATS } from 'src/app/Date_formats/formato';
import { DateValidator } from 'src/app/Validator/CustomValidator/DateValidator';
import { ErrorDialogComponent } from 'src/app/components/error-dialog/error-dialog.component'
import { MatDialog } from '@angular/material/dialog';
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
    private dialog: MatDialog){
    this.generarFormulario();
  }
  //#endregion

  //#region  Propiedades
  form: FormGroup;
  direccionesFiltradas: Observable<Direccion[]>;
  direcciones: Array<Direccion> = [];
  minLength = 2;
  regex = /^(\+[0-9])?[-]*(8|9)[ -]*([0-9][ -]*){8} $/;

  //#endregion

  //#endregion Métodos
  ngOnInit(): void {
    console.log(this.form.get('nombre'));
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
      telefono: ['', [Validators.required], Validators.pattern(this.regex)],
      fecha: [Date.now, [Validators.required]],
      direccion: [null,[Validators.required]]
    },
    {
      validators: DateValidator('fecha')});
  }
  //Evento del registro
  registro(event: Event):void{
    event.preventDefault();
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
  //#endregion
 
  //#endregion
}
