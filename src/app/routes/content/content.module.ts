import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ContentBoxService } from './+state/services/content-box.service';
import { ContentImageService } from './+state/services/content-image.service';
import { ContentPageService } from './+state/services/content-page.service';
import { ContentBoxListComponent } from './box-list/box-list.component';
import { ContentRoutingModule } from './content-routing.module';
import { ContentCreateBoxComponent } from './create-box/create-box.component';
import { ContentCreatePageComponent } from './create-page/create-page.component';
import { ContentImageListComponent } from './image-list/image-list.component';
import { ContentPageListComponent } from './page-list/page-list.component';
import { ContentUpdateBoxComponent } from './update-box/update-box.component';
import { ContentUpdateImageComponent } from './update-image/update-image.component';
import { ContentUpdatePageComponent } from './update-page/update-page.component';

const COMPONENTS: any[] = [
  ContentPageListComponent,
  ContentBoxListComponent,
  ContentImageListComponent,
  ContentCreatePageComponent,
  ContentCreateBoxComponent,
  ContentUpdateImageComponent,
  ContentUpdatePageComponent,
  ContentUpdateBoxComponent,
];
const COMPONENTS_DYNAMIC: any[] = [];

@NgModule({
  imports: [SharedModule, ContentRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
  providers: [ContentBoxService, ContentPageService, ContentImageService],
})
export class ContentModule {}
