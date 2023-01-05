import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { PublicService } from '@core';
import { environment } from '@env/environment';
import { Customer, Pageable } from '@models';
import { map, Observable } from 'rxjs';

@Injectable()
export class CustomerService {
  url = environment.apiUrl + '/v1/private/customer';
  listUrl = environment.apiUrl + '/v1/private/customers';
  constructor(private http: HttpClient, private publicService: PublicService) {}

  list(params: Params): Observable<Pageable<Customer>> {
    return this.http
      .get<{
        number: number;
        recordsFiltered: number;
        recordsTotal: number;
        totalPages: number;
        customers: Customer[];
      }>(this.listUrl, { params })
      .pipe(
        map(it => ({
          number: it.number,
          recordsFiltered: it.recordsFiltered,
          recordsTotal: it.recordsTotal,
          totalPages: it.totalPages,
          data: it.customers,
        }))
      );
  }

  get(id: number) {
    return this.http.get<Customer>(`${this.url}/${id}`);
  }

  update(id: number, customer: Partial<Customer>) {
    return this.http.put<Customer>(`${this.url}/${id}`, customer);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  create(customer: Partial<Customer>) {
    return this.http.post<Customer>(this.url, customer);
  }

  countries() {
    return this.publicService.countries();
  }

  zones(countryCode: string) {
    return this.publicService.zones(countryCode);
  }
}
