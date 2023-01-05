import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentImage } from '@models/content';
import { LocalStorageService } from '@shared';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';
import { filter, map, switchMap, take } from 'rxjs';
import { ContentImageService } from '../+state/services/content-image.service';

@Component({
  selector: 'app-content-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentImageListComponent {
  list$ = this.route.queryParamMap.pipe(
    map(params => params.get('parentPath') ?? ''),
    switchMap(parentPath => this.service.list(parentPath))
  );
  public handleDelete(row: ContentImage): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete User',
        message: 'Are you sure you want to delete this user?',
        type: 'warning',
      },
    });
    dialogRef
      .afterClosed()
      .pipe(
        take(1),
        filter(result => result),
        switchMap(_ => this.service.remove(row.id))
      )
      .subscribe(_ => {
        this.router.navigate([], {
          queryParams: { page: 0, lang: this.local.get('settings').language },
          queryParamsHandling: 'merge',
        });
      });
  }

  public handleEdit(row: ContentImage): void {}

  handleAdd(): void {}

  onFileSelected(file: File) {
    this.service
      .add(file, file.name)
      .pipe(take(1))
      .subscribe(_ => {
        this.router.navigate([], {
          queryParams: { page: 0, lang: this.local.get('settings').language },
          queryParamsHandling: 'merge',
        });
      });
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private local: LocalStorageService,
    private service: ContentImageService,
    public dialog: MatDialog
  ) {}
}
