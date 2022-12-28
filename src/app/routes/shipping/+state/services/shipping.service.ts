import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Country, Expedition, ShippingMethod } from '@models';

@Injectable()
export class ShippingService {
  url = environment.apiUrl + '/v1/private';

  constructor(private http: HttpClient) {}

  getExpedition() {
    return this.http.get<Expedition>(`${this.url}/shipping/expedition`);
  }

  updateExpedition(data: Partial<Expedition>) {
    return this.http.post<Expedition>(`${this.url}/shipping/expedition`, data);
  }

  countries() {
    return this.http.get<Country[]>(`${this.url}/shipping/country`);
  }

  getMethods() {
    return this.http.get<ShippingMethod[]>(`${this.url}/modules/shipping`);
  }
}
