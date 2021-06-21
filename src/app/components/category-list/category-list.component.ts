import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { HttpResponse } from 'src/app/interfaces/http-response';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { CategoryDataSource } from './category-data-source';
import { CategoryDialogFormComponent } from './category-dialog-form/category-dialog-form.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit, AfterViewInit {
  dataSource: CategoryDataSource;
  displayedColumns = ['code', 'name', 'details', 'update', 'delete'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  constructor(
    private categoryService: CategoryService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.dataSource = new CategoryDataSource(this.categoryService);
    this.dataSource.loadCategories();
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
    this.dataSource.loadCategories(
      this.input.nativeElement.value,
      this.sort.active,
      this.sort.direction,
      this.paginator.pageIndex + 1,
      this.paginator.pageSize
    );
  }

  openDialog(data: any = null) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
    dialogConfig.data = data;

    const dialogRef = this.dialog.open(
      CategoryDialogFormComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe((data) => {
      if (data && data.success) {
        this.paginator.pageIndex = 0;
        this.loadProductsPaginated();
      }
    });
  }

  onRowClicked(row: any) {
    console.log('Row clicked: ', row);
  }

  public redirectToDetails = (id: string) => {};
  public updateCategory = (id: number) => {
    this.categoryService.getCategory(id).subscribe((resp: HttpResponse) => {
      if (resp.succeeded) {
        this.openDialog(resp.data);
      }
    });
  };
  public redirectToDelete = (id: string) => {};
}
