import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContentImage } from '@models/content';

@Component({
  selector: 'app-content-updaet-image',
  templateUrl: './update-image.component.html',
  styleUrls: ['./update-image.component.scss'],
})
export class ContentUpdateImageComponent implements OnInit {
  form!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<ContentUpdateImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ContentImage,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      path: [{ value: this.data.id, disabled: true }],
      newName: [this.data.name, [Validators.required]],
    });
  }

  handleSubmit(ev: Event) {
    ev.preventDefault();
    if (this.form.valid) {
      this.dialogRef.close({ ...this.form.value, path: this.data.id });
    }
  }
}
