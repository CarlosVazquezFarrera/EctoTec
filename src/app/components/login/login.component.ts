import { LOCALE_ID, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';


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
  filteredOptions: Observable<string[]>;
  minLength = 2;
  //#endregion

  //#endregion Métodos
  ngOnInit(): void {
    this.filteredOptions = this.form.get('direccion').valueChanges.pipe(
      startWith(),
      map(value => this._filter(value))
    );
  }
  //Formulario reactivo
  generarFormulario():void{
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      mail: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required]],
      fecha: [Date.now, [Validators.required]],
      direccion: ['', [Validators.required]]
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

  private _filter(value: string): string[] {
    if (value.length>=3){
      const filterValue = value.toLowerCase();
      return this.options.filter(option => option.toLowerCase().includes(filterValue));
    }
    else
      return [];
  }
  //#endregion
}
