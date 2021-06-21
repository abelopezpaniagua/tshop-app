import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { HttpPaginatedResponse } from 'src/app/interfaces/http-paginated-response';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

export class ProductsDataSource implements DataSource<Product> {
  private productsSubject = new BehaviorSubject<Product[]>([]);
  private totalProductsSubject = new BehaviorSubject<number>(0);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();
  public totalProducts$ = this.totalProductsSubject.asObservable();

  constructor(private productService: ProductService) {}

  connect(collectionViewer: CollectionViewer): Observable<Product[]> {
    return this.productsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.productsSubject.complete();
    this.totalProductsSubject.complete();
    this.loadingSubject.complete();
  }

  loadProducts(
    filter: string = '',
    sortColumn: string = 'code',
    sortDirection: string = 'asc',
    pageNumber: number = 1,
    pageSize: number = 3
  ) {
    this.loadingSubject.next(true);
    this.productService
      .populateProducts(filter, sortColumn, sortDirection, pageNumber, pageSize)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((resp: any) => {
        this.productsSubject.next(resp.data);
        this.totalProductsSubject.next(resp.totalRecords);
      });
  }
}
