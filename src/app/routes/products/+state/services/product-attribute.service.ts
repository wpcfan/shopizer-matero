import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Pageable, ProductAttribute } from '@models';
import { map } from 'rxjs';

@Injectable()
export class ProductAttributeService {
  url = environment.apiUrl + '/v1/private/product';

  constructor(private http: HttpClient) {}

  list(
    productId: number,
    page = 0,
    filterParams?: Record<string, string>,
    pageSize = environment.defaultPageSize
  ) {
    const params = { count: pageSize.toString(), page: page.toString() };
    if (filterParams) {
      Object.assign(params, filterParams);
    }
    return this.http
      .get<{
        totalPages: number;
        recordsTotal: number;
        recordsFiltered: number;
        number: number;
        attributes: ProductAttribute[];
      }>(`${this.url}/${productId}/attributes`, { params })
      .pipe(
        map(it => {
          return {
            totalPages: it.totalPages,
            recordsTotal: it.recordsTotal,
            recordsFiltered: it.recordsFiltered,
            number: it.number,
            data: it.attributes,
          } as Pageable<ProductAttribute>;
        })
      );
  }

  update(productId: number, id: number, manufacturer: Partial<ProductAttribute>, lang: string) {
    return this.http.put<ProductAttribute>(
      `${this.url}/${productId}/attribute/${id}`,
      manufacturer,
      {
        params: { lang },
      }
    );
  }

  delete(productId: number, id: number) {
    return this.http.delete(`${this.url}/${productId}/attribute/${id}`);
  }

  create(productId: number, manufacturer: Partial<ProductAttribute>) {
    return this.http.post<ProductAttribute>(`${this.url}/${productId}/attribute`, manufacturer);
  }

  getById(productId: number, id: number, lang: string) {
    return this.http.get<ProductAttribute>(`${this.url}/${productId}/attribute/${id}`, {
      params: { lang },
    });
  }
}
