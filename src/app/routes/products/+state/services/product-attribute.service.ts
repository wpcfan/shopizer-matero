import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Pageable, ProductAttribute } from '@models';
import { ProductOptionValueService } from 'app/routes/product-options/+state/services/product-option-value.service';
import { ProductOptionService } from 'app/routes/product-options/+state/services/product-option.service';
import { map } from 'rxjs';

@Injectable()
export class ProductAttributeService {
  url = environment.apiUrl + '/v1/private/product';

  constructor(
    private http: HttpClient,
    private optionService: ProductOptionService,
    private optionValueService: ProductOptionValueService
  ) {}

  list(productId: number, page: number, count = 20) {
    return this.http
      .get<{
        number: number;
        recordsFiltered: number;
        recordsTotal: number;
        totalPages: number;
        attributes: ProductAttribute[];
      }>(`${this.url}/${productId}/attributes`, { params: { page, count } })
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

  options() {
    return this.optionService.list(0, undefined, 1000).pipe(map(it => it.data));
  }

  optionValues() {
    return this.optionValueService.list(0, undefined, 1000).pipe(map(it => it.data));
  }
}
