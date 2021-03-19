import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder){
    this.generarFormulario();
  }
  form: FormGroup;
  ngOnInit(): void {

  }

  generarFormulario():void{
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      mail: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required]],
      fecha: [Date.now, [Validators.required]],
      direccion: ['', [Validators.required]]
    });
  }
}
