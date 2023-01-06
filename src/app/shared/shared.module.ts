import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { NgxPermissionsModule } from 'ngx-permissions';
import { NgProgressModule } from 'ngx-progressbar';
import { NgProgressHttpModule } from 'ngx-progressbar/http';
import { NgProgressRouterModule } from 'ngx-progressbar/router';
import { ToastrModule } from 'ngx-toastr';
import { MaterialExtensionsModule } from '../material-extensions.module';
import { MaterialModule } from '../material.module';

import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { AutocompleteSelectComponent } from './components/autocomplete-select/autocomplete-select.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { DescriptionsComponent } from './components/descriptions/descriptions.component';
import { DynaTableModule } from './components/dyna-table';
import { ErrorCodeComponent } from './components/error-code/error-code.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { RichEditorComponent } from './components/rich-editor/rich-editor.component';
import { SelectionListComponent } from './components/selection-list/selection-list.component';
import { SimpleTreeComponent } from './components/simple-tree/simple-tree.component';
import { TreeSelectComponent } from './components/tree-select/tree-select.component';
import { DisableControlDirective } from './directives/disable-control.directive';
import { FileDropDirective } from './directives/file-drop.directive';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { ToObservablePipe } from './pipes/to-observable.pipe';

const MODULES: any[] = [
  CommonModule,
  RouterModule,
  ReactiveFormsModule,
  FormsModule,
  MaterialModule,
  MaterialExtensionsModule,
  FlexLayoutModule,
  NgProgressModule,
  NgProgressRouterModule,
  NgProgressHttpModule,
  NgxPermissionsModule,
  ToastrModule,
  TranslateModule,
  DynaTableModule,
  EditorModule,
];
const COMPONENTS: any[] = [
  BreadcrumbComponent,
  PageHeaderComponent,
  ErrorCodeComponent,
  ConfirmDialogComponent,
  FileUploadComponent,
  SimpleTreeComponent,
  RichEditorComponent,
  TreeSelectComponent,
  AutocompleteSelectComponent,
  SelectionListComponent,
  DescriptionsComponent,
];
const COMPONENTS_DYNAMIC: any[] = [];
const DIRECTIVES: any[] = [DisableControlDirective, FileDropDirective];
const PIPES: any[] = [SafeUrlPipe, ToObservablePipe];

@NgModule({
  imports: [...MODULES],
  exports: [...MODULES, ...COMPONENTS, ...DIRECTIVES, ...PIPES],
  providers: [{ provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC, ...DIRECTIVES, ...PIPES],
})
export class SharedModule {}
