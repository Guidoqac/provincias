import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProvinciaService {

  constructor(public http: HttpClient) { }

  getProvincias(name: string): Observable<any> {
    return this.http.get(`https://apis.datos.gob.ar/georef/api/provincias?nombre=${name}`)
  }

}
