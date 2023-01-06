import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { ContentFolder, ContentImage } from '@models/content';
import { v4 } from 'uuid';

@Injectable()
export class ContentImageService {
  url = environment.apiUrl + '/v1/private/content/images';
  contentUrl = environment.apiUrl + '/v1/private/content';
  constructor(private http: HttpClient) {}

  list(parentPath: string) {
    return this.http.get<ContentImage[]>(`${this.contentUrl}/list`, { params: { parentPath } });
  }

  add(file: File, fileName: string) {
    const formData = new FormData();
    formData.append('qqfile', file);
    formData.append('qqfilename', fileName);
    formData.append('qquuid', v4());
    return this.http.post<{
      error: string;
      preventRetry: boolean;
      success: boolean;
    }>(`${this.url}/add`, formData);
  }

  remove(path: string) {
    return this.http.delete(`${this.url}/remove`, { params: { path } });
  }

  rename(data: { newName: string; path: string }) {
    return this.http.post(`${this.url}/rename`, null, { params: data });
  }

  folder(path: string) {
    return this.http.get<ContentFolder>(`${this.contentUrl}/folder`, { params: { path } });
  }

  download(path: string) {
    return this.http.get(`${this.url}/download`, { params: { path }, responseType: 'blob' });
  }
}
