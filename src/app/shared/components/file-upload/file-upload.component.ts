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
  @Input() multiple = false;
  @Output() fileSelected = new EventEmitter<File[]>();

  constructor() {}

  onFileSelected(event: Event) {
    const elm = event.target as HTMLInputElement;
    if (elm) {
      const fileList = elm.files;
      const files: File[] = [];
      if (fileList && fileList.length > 0) {
        for (let index = 0; index < fileList.length; index++) {
          const element = fileList[index];
          files.push(element);
        }
        this.fileSelected.emit(files);
      }
    }
  }

  onFileDropped(files: File[]) {
    if (files && files.length > 0) {
      this.fileSelected.emit(files);
    }
  }
}
