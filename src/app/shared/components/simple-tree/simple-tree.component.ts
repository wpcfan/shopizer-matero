import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { NestedTreeControl } from '@angular/cdk/tree';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { getFlatNodes, getFlatNodeStates, SimpleTreeNode } from './model';

@Component({
  selector: 'ngx-simple-tree',
  templateUrl: './simple-tree.component.html',
  styleUrls: ['./simple-tree.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleTreeComponent implements OnInit, OnDestroy {
  @Input() dataSource!: Observable<SimpleTreeNode[]>;
  @Input() menuTemplate!: TemplateRef<any>;
  @Input() loadMoreTemplate!: TemplateRef<any>;
  @Input() showLoadMore = false;
  @Input() selectedNodeId!: string;
  @Input() enableDragDrop = false;
  @Output() nodeSelected = new EventEmitter<any>();
  menuToggle!: { [id: string]: boolean };
  treeNodeStates!: { [id: string]: boolean };
  nestedTreeControl!: NestedTreeControl<SimpleTreeNode>;
  nestedDataSource!: MatTreeNestedDataSource<SimpleTreeNode>;
  subs: Subscription[] = [];
  constructor(private cd: ChangeDetectorRef) {}
  ngOnInit(): void {
    this.nestedDataSource = new MatTreeNestedDataSource();

    this.subs.push(
      this.dataSource.pipe(filter(val => !!val)).subscribe(data => {
        this.treeNodeStates = {
          ...getFlatNodeStates(data),
          ...this.treeNodeStates,
        };
        this.nestedDataSource.data = data;
        const flatData = getFlatNodes(this.nestedDataSource.data);
        if (!this.nestedTreeControl) {
          return;
        }
        for (const key in flatData) {
          const expand = this.treeNodeStates[key];
          if (expand) {
            this.nestedTreeControl.expand(flatData[key].node);
          } else {
            this.nestedTreeControl.collapse(flatData[key].node);
          }
        }
        this.cd.markForCheck();
      })
    );
    this.nestedTreeControl = new NestedTreeControl<SimpleTreeNode>(this.getChildren);
  }
  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
    this.subs = [];
  }
  hasNestedChild = (_: number, nodeData: SimpleTreeNode) => nodeData.children.length > 0;

  private getChildren = (node: SimpleTreeNode) => node.children;

  handleNodeSelect(node: SimpleTreeNode) {
    this.nodeSelected.emit(node.value);
    this.selectedNodeId = node.id;
  }

  handleToggleMenu(state: boolean, id: string) {
    this.menuToggle = { [id]: state };
  }

  refreshTree() {
    const data = this.nestedDataSource.data;
    this.nestedDataSource.data = [];
    this.nestedDataSource.data = data;
  }

  toggleTreeNodeState(node: SimpleTreeNode) {
    this.treeNodeStates = {
      ...this.treeNodeStates,
      [node.id]: this.nestedTreeControl.isExpanded(node),
    };
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log(event);
  }
}
