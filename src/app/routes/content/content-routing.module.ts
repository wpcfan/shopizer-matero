import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentBoxListComponent } from './box-list/box-list.component';
import { ContentCreateBoxComponent } from './create-box/create-box.component';
import { ContentCreateImageComponent } from './create-image/create-image.component';
import { ContentCreatePageComponent } from './create-page/create-page.component';
import { ContentImageListComponent } from './image-list/image-list.component';
import { ContentPageListComponent } from './page-list/page-list.component';
import { ContentUpdaetBoxComponent } from './updaet-box/updaet-box.component';
import { ContentUpdaetImageComponent } from './updaet-image/updaet-image.component';
import { ContentUpdaetPageComponent } from './updaet-page/updaet-page.component';

const routes: Routes = [
  {
    path: 'pages',
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ContentPageListComponent },
      { path: 'create', component: ContentCreatePageComponent },
      { path: 'update/:id', component: ContentUpdaetPageComponent },
    ],
  },
  {
    path: 'boxes',
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ContentBoxListComponent },
      { path: 'create', component: ContentCreateBoxComponent },
      { path: 'update/:id', component: ContentUpdaetBoxComponent },
    ],
  },
  {
    path: 'images',
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ContentImageListComponent },
      { path: 'create', component: ContentCreateImageComponent },
      { path: 'update/:id', component: ContentUpdaetImageComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentRoutingModule {}
