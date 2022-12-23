import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Manufacturer, Pageable, Product } from '@models';
import { convertCategoriesToNestedTree } from '@shared/utils/tree';
import { BrandService } from 'app/routes/brands/+state/services/brand.service';
import { CategoryService } from 'app/routes/categories/+state/services/category.service';
import { ProductTypeService } from 'app/routes/product-types/+state/services/product-type.service';
import { map, Observable } from 'rxjs';

@Injectable()
export class ProductService {
  url = environment.apiUrl + '/v2/private/product';
  listUrl = environment.apiUrl + '/v2/products';

  constructor(
    private http: HttpClient,
    private brandService: BrandService,
    private categoryService: CategoryService,
    private productTypeService: ProductTypeService
  ) {}

  list(page = 0, filterParams?: Record<string, string>, pageSize = environment.defaultPageSize) {
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
        products: Product[];
      }>(`${this.listUrl}`, { params })
      .pipe(
        map(it => {
          return {
            totalPages: it.totalPages,
            recordsTotal: it.recordsTotal,
            recordsFiltered: it.recordsFiltered,
            number: it.number,
            data: it.products,
          } as Pageable<Product>;
        })
      );
  }

  update(id: number, manufacturer: Partial<Product>, lang: string) {
    return this.http.put<Product>(`${this.url}/${id}`, manufacturer, {
      params: { lang },
    });
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  create(manufacturer: Partial<Product>) {
    return this.http.post<Product>(`${this.url}`, manufacturer);
  }

  getById(id: number, lang: string) {
    return this.http.get<Product>(`${this.url}/${id}`, { params: { lang } });
  }

  manufacturers(name?: string): Observable<Manufacturer[]> {
    return name
      ? this.brandService.list(0, { name }, 1000).pipe(map(it => it.data))
      : this.brandService.list(0, undefined, 1000).pipe(map(it => it.data));
  }

  categories() {
    return this.categoryService
      .list(0, undefined, 1000)
      .pipe(map(it => convertCategoriesToNestedTree(it.data)));
  }

  productTypes() {
    return this.productTypeService.list(0, {}, 1000).pipe(map(it => it.data));
  }
}
