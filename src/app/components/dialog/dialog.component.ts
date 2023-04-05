import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { UploadForm } from 'src/app/Interfaces/upload-form-model';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: FormBuilder,
    private dataService: DataService
  ) {
    console.log(data);

    this.uploadForm = this.fb.group<UploadForm>({
      avatar: new FormControl('', { nonNullable: true }),
      notion: new FormControl('', { nonNullable: true }),
    });
  }

  public uploadForm: FormGroup;

  public showPreview(event: Event) {
    const file = (event.target as any).files[0];
    this.uploadForm.patchValue({
      avatar: file,
    });

    (this.uploadForm.get('avatar') as any).updateValueAndValidity();

    const reader: FileReader = new FileReader();
    reader.onload = () => {
      this.dataService.images.next([
        ...this.dataService.images.getValue(),
        {
          image: reader.result as string,
          position: this.data.position,
        },
      ]);
    };
    reader.readAsDataURL(file);
  }

  public submit() {
    console.log(this.uploadForm.value);
    this.dataService.notion.next([
      ...this.dataService.notion.getValue(),
      {
        notion: this.uploadForm.value.notion,
        position: this.data.position,
      },
    ]);
  }
}
