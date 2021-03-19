import { LOCALE_ID, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Direccion } from 'src/app/Models/Api/Direccion';


export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD-MMMM-yyyy',
  },
  display: {
    dateInput: 'DD-MMM-yyyy',
    monthYearLabel: 'DD-MMM-yyyy',
    dateA11yLabel: 'DD-MMM-yyyy',
    monthYearA11yLabel: 'DD-MMM-yyyy',
  },
};

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
  constructor(private formBuilder: FormBuilder){
    this.generarFormulario();
  }
  //#endregion

  //#region  Propiedades
  form: FormGroup;
  options: string[] = ['One', 'Two', 'Three'];
  direccionesFiltradas: Observable<Direccion[]>;

  direcciones: Array<Direccion> = [];
  minLength = 2;
  //#endregion

  //#endregion Métodos
  ngOnInit(): void {

    let monterreyUno = new Direccion();
    monterreyUno.pais = "México";
    monterreyUno.entidad = "Nuevo Leon";
    monterreyUno.ciudad = "Monterrey"

    let monterreyDos = new Direccion();
    monterreyDos.pais = "México";
    monterreyDos.entidad = "Chiapas";
    monterreyDos.ciudad = "Monterrey"

    let tuxtla = new Direccion();
    tuxtla.pais = "México";
    tuxtla.entidad = "Chiapas";
    tuxtla.ciudad = "Tuxtla"
    this.direcciones.push(monterreyUno);
    this.direcciones.push(monterreyDos);
    this.direcciones.push(tuxtla);

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
      direccion: [new Direccion(),[Validators.required]]
    });
  }
  //Evento del registro
  registro(event: Event):void{
    console.log(this.form.get('fecha').value);

    event.preventDefault();
    if (this.form.invalid){
      this.form.markAllAsTouched();
      return;
    };
  }

  //Filtro personalizado para la búsqueda
  private filtroDireccion(direccion: string){
    console.log(direccion);
    if (direccion.length>=3){
      const filterValue = direccion.toLowerCase();
      return this.direcciones.filter(direccion => direccion.ciudad.toLowerCase().includes(filterValue));
    }
    else
      return [];
  }

  getNombreCompleto(direccion: Direccion){
    console.log(direccion.pais);
    return typeof  direccion.pais === 'undefined'? '' : `${direccion.ciudad} - ${direccion.entidad} - ${direccion.pais}`;
  }
  //#endregion
}
