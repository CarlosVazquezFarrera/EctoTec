import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DireccionesServiceService {
//#region  Constructor
  constructor(private http: HttpClient) { 
    this.urlApi = `${environment.UrlApi}Direccion/`; 
  }
  //#endregion

  //#region  Propiedades
  urlApi: string;
  //#endregion

  ObtenerDirecciones(){
    return this.http.get(
      ` ${this.urlApi}ObtenerTodasLasDirecciones`
    );
  }
}
