import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { ProductService } from 'src/app/services/product.service';
import { ProductsDataSource } from './products-data-source';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, AfterViewInit {
  dataSource: ProductsDataSource;
  displayedColumns = ['code', 'name', 'price', 'details', 'update', 'delete'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.dataSource = new ProductsDataSource(this.productService);
    this.dataSource.loadProducts();
  }

  ngAfterViewInit(): void {
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadProductsPaginated();
        })
      )
      .subscribe();

    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadProductsPaginated()))
      .subscribe();
  }

  loadProductsPaginated() {
    this.dataSource.loadProducts(
      this.input.nativeElement.value,
      this.sort.active,
      this.sort.direction,
      this.paginator.pageIndex + 1,
      this.paginator.pageSize
    );
  }

  onRowClicked(row: any) {
    console.log('Row clicked: ', row);
  }

  public redirectToDetails = (id: string) => {};
  public redirectToUpdate = (id: string) => {};
  public redirectToDelete = (id: string) => {};
}
