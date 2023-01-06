import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentBoxListComponent } from './box-list/box-list.component';
import { ContentCreateBoxComponent } from './create-box/create-box.component';
import { ContentCreatePageComponent } from './create-page/create-page.component';
import { ContentImageListComponent } from './image-list/image-list.component';
import { ContentPageListComponent } from './page-list/page-list.component';
import { ContentUpdateBoxComponent } from './update-box/update-box.component';
import { ContentUpdatePageComponent } from './update-page/update-page.component';

const routes: Routes = [
  {
    path: 'pages',
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ContentPageListComponent },
      { path: 'create', component: ContentCreatePageComponent },
      { path: 'update/:id', component: ContentUpdatePageComponent },
    ],
  },
  {
    path: 'boxes',
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ContentBoxListComponent },
      { path: 'create', component: ContentCreateBoxComponent },
      { path: 'update/:code', component: ContentUpdateBoxComponent },
    ],
  },
  {
    path: 'images',
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ContentImageListComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentRoutingModule {}
