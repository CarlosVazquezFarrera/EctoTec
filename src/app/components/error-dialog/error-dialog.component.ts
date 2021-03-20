import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.css']
})
export class ErrorDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ErrorDialogComponent>, @Inject(MAT_DIALOG_DATA)public form: FormGroup) { }

  ngOnInit(): void {
  }

  public Cerrar(){
    this.dialogRef.close();
  }

  
  //#region  Get
  get nombreFiel(){
    return this.form.get('nombre');
  }
  get mailFiel(){
    return this.form.get('mail');
  }
  get telefonoFiel(){
    return this.form.get('telefono');
  }
  get fechaFiel(){
    return this.form.get('fecha');
  }
  get direccionFiel(){
    return this.form.get('direccion');
  }
  get getFechaActual(){
    let fecha = new Date(Date.now());
    return `${fecha.getDay()}-${fecha.getMonth()}-${fecha.getFullYear()}`;
  }

  get getFechaAnterior(){
    let fechaAnterior  = new Date(Date.now());
    fechaAnterior.setFullYear(fechaAnterior.getFullYear()-100);
    return   `${fechaAnterior.getDay()}-${fechaAnterior.getMonth()}-${fechaAnterior.getFullYear()}`;
  }
  //#endregion

}


