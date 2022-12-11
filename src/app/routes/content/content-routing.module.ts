import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentPageListComponent } from './page-list/page-list.component';
import { ContentBoxListComponent } from './box-list/box-list.component';
import { ContentImageListComponent } from './image-list/image-list.component';
import { ContentCreatePageComponent } from './create-page/create-page.component';
import { ContentCreateBoxComponent } from './create-box/create-box.component';
import { ContentCreateImageComponent } from './create-image/create-image.component';
import { ContentUpdaetImageComponent } from './updaet-image/updaet-image.component';
import { ContentUpdaetBoxComponent } from './updaet-box/updaet-box.component';
import { ContentUpdaetPageComponent } from './updaet-page/updaet-page.component';

const routes: Routes = [{ path: 'page-list', component: ContentPageListComponent },
{ path: 'box-list', component: ContentBoxListComponent },
{ path: 'image-list', component: ContentImageListComponent },
{ path: 'create-page', component: ContentCreatePageComponent },
{ path: 'create-box', component: ContentCreateBoxComponent },
{ path: 'create-image', component: ContentCreateImageComponent },
{ path: 'updaet-image', component: ContentUpdaetImageComponent },
{ path: 'updaet-box', component: ContentUpdaetBoxComponent },
{ path: 'updaet-page', component: ContentUpdaetPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule { }
