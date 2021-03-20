import { AbstractControl, FormGroup } from '@angular/forms';
    
export function DateValidator(fecha: string){
    return (formGroup: FormGroup) => {
        let fechainput:AbstractControl = formGroup.controls[fecha];
        let fechaIngresada = new Date(fechainput.value);
        let fechaActual = new Date(Date.now());
        let fechaAnterior = new Date(Date.now());
        fechaAnterior.setFullYear((fechaActual.getFullYear()-100));
        if (fechainput.errors && !fechainput.errors.dateValidator) {
            return;
        }
        if (fechaIngresada >= fechaAnterior && fechaIngresada<= fechaActual) {
            fechainput.setErrors(null);
        } else {
            fechainput.setErrors({dateValidator: true});
        }
    }
}