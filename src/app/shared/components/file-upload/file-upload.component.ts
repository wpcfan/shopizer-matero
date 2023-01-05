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
  @Input() dropZoneWidth = '200px';
  @Input() dropZoneHeight = '200px';
  @Output() fileSelected = new EventEmitter<File>();

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

  onFileDropped(files: File[]) {
    if (files && files.length > 0) {
      const file = files[0];
      this.fileName = file.name;
      this.fileSelected.emit(file);
    }
  }
}
