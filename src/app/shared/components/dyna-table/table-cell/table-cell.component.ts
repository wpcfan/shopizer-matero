import {
  ChangeDetectionStrategy,
  Component,
  ComponentFactoryResolver,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ColumnConfig } from '../column-config.model';
import { CellComponent } from './cell-types';
import { CellDirective } from './cell.directive';
import { CellService } from './cell.service';

@Component({
  selector: 'ngx-table-cell',
  template: '<ng-template ngxCellHost></ng-template>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableCellComponent implements OnInit {
  @ViewChild(CellDirective, { read: CellDirective, static: true })
  cellHost!: CellDirective;

  @Input() row!: object;
  @Input() column!: ColumnConfig;

  constructor(
    private readonly cellService: CellService,
    private readonly componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit() {
    this.initCell();
  }

  initCell() {
    const cellComponent = this.cellService.getCell(this.column.type);
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(cellComponent);
    const viewContainerRef = this.cellHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    const cell = componentRef.instance as CellComponent;
    cell.row = this.row;
    cell.column = this.column;
  }
}
