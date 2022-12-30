import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PublicService } from '@core';
import { environment } from '@env/environment';
import { Address, Expedition, ShippingMethod, ShippingPackage } from '@models';
import { materialize } from 'rxjs';

@Injectable()
export class ShippingService {
  url = environment.apiUrl + '/v1/private';

  constructor(private http: HttpClient, private publicService: PublicService) {}

  getExpedition() {
    return this.http.get<Expedition>(`${this.url}/shipping/expedition`);
  }

  updateExpedition(data: Partial<Expedition>) {
    return this.http.post<Expedition>(`${this.url}/shipping/expedition`, data);
  }

  shippingCountries() {
    return this.publicService.shippingCountries();
  }

  zones(countryCode: string) {
    return this.publicService.zones(countryCode);
  }

  getMethods() {
    return this.http.get<ShippingMethod[]>(`${this.url}/modules/shipping`);
  }

  getOrigin() {
    return this.http.get<Address>(`${this.url}/shipping/origin`).pipe(materialize());
  }

  updateOrigin(data: Partial<Address>) {
    return this.http.post<void>(`${this.url}/shipping/origin`, data);
  }

  packages(params: Record<string, string>) {
    return this.http.get<ShippingPackage[]>(`${this.url}/shipping/packages`, { params });
  }

  createPackage(data: Partial<ShippingPackage>) {
    return this.http.post<void>(`${this.url}/shipping/package`, data);
  }

  updatePackage(code: string, data: Partial<ShippingPackage>) {
    return this.http.put<void>(`${this.url}/shipping/package/${code}`, data);
  }

  getPackageByCode(code: string) {
    return this.http.get<ShippingPackage>(`${this.url}/shipping/package/${code}`);
  }

  deletePackage(code: string) {
    return this.http.delete<void>(`${this.url}/shipping/package/${code}`);
  }
}
