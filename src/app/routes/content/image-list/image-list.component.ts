import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentImage } from '@models/content';
import { LocalStorageService } from '@shared';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';
import { concatMap, filter, from, map, switchMap, take } from 'rxjs';
import { v4 } from 'uuid';
import { ContentImageService } from '../+state/services/content-image.service';
import { ContentUpdateImageComponent } from '../update-image/update-image.component';
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
          queryParams: {
            seed: v4(),
            page: 0,
            lang: this.local.get('settings').language,
          },
          queryParamsHandling: 'merge',
        });
      });
  }

  public handleEdit(row: ContentImage): void {
    const dialogRef = this.dialog.open(ContentUpdateImageComponent, {
      data: row,
    });

    dialogRef
      .afterClosed()
      .pipe(
        take(1),
        filter(result => result),
        switchMap(result => this.service.rename(result))
      )
      .subscribe(_ => {
        this.router.navigate([], {
          queryParams: {
            seed: v4(),
            page: 0,
            lang: this.local.get('settings').language,
          },
          queryParamsHandling: 'merge',
        });
      });
  }

  handleAdd(): void {}

  onFileSelected(files: File[]) {
    from(files)
      .pipe(concatMap(file => this.service.add(file, file.name)))
      .subscribe({
        complete: () => {
          this.router.navigate([], {
            queryParams: {
              seed: v4(),
              page: 0,
              lang: this.local.get('settings').language,
            },
            queryParamsHandling: 'merge',
          });
        },
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
