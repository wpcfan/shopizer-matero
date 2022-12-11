import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ContentRoutingModule } from './content-routing.module';
import { ContentPageListComponent } from './page-list/page-list.component';
import { ContentBoxListComponent } from './box-list/box-list.component';
import { ContentImageListComponent } from './image-list/image-list.component';
import { ContentCreatePageComponent } from './create-page/create-page.component';
import { ContentCreateBoxComponent } from './create-box/create-box.component';
import { ContentCreateImageComponent } from './create-image/create-image.component';
import { ContentUpdaetImageComponent } from './updaet-image/updaet-image.component';
import { ContentUpdaetBoxComponent } from './updaet-box/updaet-box.component';
import { ContentUpdaetPageComponent } from './updaet-page/updaet-page.component';

const COMPONENTS: any[] = [ContentPageListComponent, ContentBoxListComponent, ContentImageListComponent, ContentCreatePageComponent, ContentCreateBoxComponent, ContentCreateImageComponent, ContentUpdaetImageComponent, ContentUpdaetBoxComponent, ContentUpdaetPageComponent];
const COMPONENTS_DYNAMIC: any[] = [];

@NgModule({
  imports: [
    SharedModule,
    ContentRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ]
})
export class ContentModule { }
