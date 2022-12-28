import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Pageable, ProductVariant } from '@models';
import { ProductOptionValueService } from 'app/routes/product-options/+state/services/product-option-value.service';
import { ProductOptionService } from 'app/routes/product-options/+state/services/product-option.service';
import { map } from 'rxjs';

@Injectable()
export class ProductVariantService {
  url = environment.apiUrl + '/v2/private/product';

  constructor(
    private http: HttpClient,
    private optionService: ProductOptionService,
    private optionValueService: ProductOptionValueService
  ) {}

  list(page: number, count = 20) {
    return this.http
      .get<{
        number: number;
        recordsFiltered: number;
        recordsTotal: number;
        totalPages: number;
        items: ProductVariant[];
      }>(`${this.url}/variant`, { params: { page, count } })
      .pipe(
        map(it => {
          return {
            totalPages: it.totalPages,
            recordsTotal: it.recordsTotal,
            recordsFiltered: it.recordsFiltered,
            number: it.number,
            data: it.items,
          } as Pageable<ProductVariant>;
        })
      );
  }

  update(id: number, manufacturer: Partial<ProductVariant>, lang: string) {
    return this.http.put<ProductVariant>(`${this.url}/variant/${id}`, manufacturer, {
      params: { lang },
    });
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/variant/${id}`);
  }

  create(manufacturer: Partial<ProductVariant>) {
    return this.http.post<ProductVariant>(`${this.url}/variant`, manufacturer);
  }

  getById(id: number, lang: string) {
    return this.http.get<ProductVariant>(`${this.url}/variant/${id}`, {
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
