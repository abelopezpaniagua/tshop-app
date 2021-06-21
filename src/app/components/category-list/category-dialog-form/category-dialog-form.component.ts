import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FormState } from 'src/app/enums/form-states.enum';
import { HttpResponse } from 'src/app/interfaces/http-response';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-dialog-form',
  templateUrl: './category-dialog-form.component.html',
  styleUrls: ['./category-dialog-form.component.css'],
})
export class CategoryDialogFormComponent implements OnInit {
  form: FormGroup;

  id: number = 0;
  code: string;
  name: string;
  description: string;

  formState: FormState = FormState.Create;

  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CategoryDialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) data: Category,
    private toastr: ToastrService
  ) {
    if (data) {
      this.formState = FormState.Update;

      this.id = data.id;
      this.code = data.code;
      this.name = data.name;
      this.description = data.description;
    } else {
      this.formState = FormState.Create;
    }
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [this.id, []],
      code: [this.code, [Validators.required]],
      name: [this.name, [Validators.required]],
      description: [this.description, []],
    });
  }

  onSubmit(formValue: any) {
    if (this.form.valid) {
      if (this.formState === FormState.Create) {
        this.categoryService
          .createCategory(formValue)
          .subscribe((resp: HttpResponse) => {
            if (resp.succeeded) {
              this.toastr.success('Category Created!', 'Success!');
              this.dialogRef.close({ success: true });
            }
          });
      } else if (this.formState === FormState.Update) {
        this.categoryService
          .updateCategory(this.id, formValue)
          .subscribe((resp) => {
            console.log(resp);
          });
      } else {
        this.toastr.error('Action Unknown', 'Error!');
      }
    }
  }

  close() {
    this.dialogRef.close();
  }
}
