import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

@Injectable()
export class FileUploadService {
  fileUrl = environment + '/v1/private/file';
  filesUrl = environment + '/v1/private/files';
  constructor(private http: HttpClient) {}

  upload(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(this.fileUrl, formData);
  }

  uploadMultiple(files: File[]) {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));
    return this.http.post(this.filesUrl, formData);
  }
}
