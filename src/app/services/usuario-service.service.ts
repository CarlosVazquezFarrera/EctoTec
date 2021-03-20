import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from 'src/app/Models/Usuario';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceService {

  //#region  Constructor
  constructor(private http: HttpClient) { 
    this.urlApi = `${environment.UrlApi}Usuario/`; 
  }
  //#endregion

  //#region  Propiedades
  urlApi: string;
  //#endregion

  //#region 
  RegistrarUsuario(usuario: Usuario){
    return this.http.post(`${this.urlApi}RegistrarUsuario`, usuario, httpOptions);
  }
  //#endregion

}
