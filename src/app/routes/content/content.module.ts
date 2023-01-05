import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ContentBoxService } from './+state/services/content-box.service';
import { ContentImageService } from './+state/services/content-image.service';
import { ContentPageService } from './+state/services/content-page.service';
import { ContentBoxListComponent } from './box-list/box-list.component';
import { ContentRoutingModule } from './content-routing.module';
import { ContentCreateBoxComponent } from './create-box/create-box.component';
import { ContentCreateImageComponent } from './create-image/create-image.component';
import { ContentCreatePageComponent } from './create-page/create-page.component';
import { ContentImageListComponent } from './image-list/image-list.component';
import { ContentPageListComponent } from './page-list/page-list.component';
import { ContentUpdaetBoxComponent } from './updaet-box/updaet-box.component';
import { ContentUpdaetImageComponent } from './updaet-image/updaet-image.component';
import { ContentUpdaetPageComponent } from './updaet-page/updaet-page.component';

const COMPONENTS: any[] = [
  ContentPageListComponent,
  ContentBoxListComponent,
  ContentImageListComponent,
  ContentCreatePageComponent,
  ContentCreateBoxComponent,
  ContentCreateImageComponent,
  ContentUpdaetImageComponent,
  ContentUpdaetBoxComponent,
  ContentUpdaetPageComponent,
];
const COMPONENTS_DYNAMIC: any[] = [];

@NgModule({
  imports: [SharedModule, ContentRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
  providers: [ContentBoxService, ContentPageService, ContentImageService],
})
export class ContentModule {}
