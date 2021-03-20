import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../Models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class MailServiceService {

   //#region  Constructor
   constructor(private http: HttpClient) { 
    this.urlApi = `${environment.UrlApi}Mail/`; 
  }
  //#endregion

  //#region  Propiedades
  urlApi: string;
  //#endregion

  //#region 
  enviarMail(usuario: Usuario){
    return this.http.post(`${this.urlApi}EnviarCorreo`, usuario);
  }
  //#endregion
}
