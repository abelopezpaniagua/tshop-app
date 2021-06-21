import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';

export class CategoryDataSource implements DataSource<Category> {
  private categoriesSubject = new BehaviorSubject<Category[]>([]);
  private totalCategoriesSubject = new BehaviorSubject<number>(0);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();
  public totalCategories$ = this.totalCategoriesSubject.asObservable();

  constructor(private categoryService: CategoryService) {}

  connect(collectionViewer: CollectionViewer): Observable<Category[]> {
    return this.categoriesSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.categoriesSubject.complete();
    this.totalCategoriesSubject.complete();
    this.loadingSubject.complete();
  }

  loadCategories(
    filter: string = '',
    sortColumn: string = 'code',
    sortDirection: string = 'asc',
    pageNumber: number = 1,
    pageSize: number = 3
  ) {
    this.loadingSubject.next(true);
    this.categoryService
      .populateCategories(
        filter,
        sortColumn,
        sortDirection,
        pageNumber,
        pageSize
      )
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((resp: any) => {
        this.categoriesSubject.next(resp.data);
        this.totalCategoriesSubject.next(resp.totalRecords);
      });
  }
}
