import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileUploadComponent {
  fileName = '';
  @Input() fileTypes = ['image/png', 'image/jpeg'];
  @Input() imageUrl = '';
  @Output() fileSelected = new EventEmitter<File>();
  @Output() fileRemoved = new EventEmitter<void>();

  constructor() {}

  onFileSelected(event: Event) {
    const elm = event.target as HTMLInputElement;
    if (elm) {
      const files = elm.files;
      if (files && files.length > 0) {
        const file = files[0];
        this.fileName = file.name;
        this.fileSelected.emit(file);
      }
    }
  }

  remove(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    this.fileRemoved.emit();
  }
}
