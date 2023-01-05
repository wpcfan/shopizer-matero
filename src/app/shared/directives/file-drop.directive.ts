import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

@Directive({ selector: '[file-drop]' })
export class FileDropDirective {
  @Output() filesChangeEmiter = new EventEmitter<File[]>();
  @HostBinding('style.background') background = '#eee';
  @HostBinding('style.border') borderStyle = '2px dashed';
  @HostBinding('style.border-color') borderColor = '#696D7D';
  @HostBinding('style.border-radius') borderRadius = '5px';

  constructor() {}

  @HostListener('dragover', ['$event']) public onDragOver(evt: Event) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = 'lightgray';
    this.borderColor = 'cadetblue';
    this.borderStyle = '3px solid';
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(evt: Event) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#eee';
    this.borderColor = '#696D7D';
    this.borderStyle = '2px dashed';
  }

  @HostListener('drop', ['$event']) public onDrop(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#eee';
    this.borderColor = '#696D7D';
    this.borderStyle = '2px dashed';

    const files = (evt?.dataTransfer?.files ?? []) as Array<File>;
    this.filesChangeEmiter.emit(files);
  }
}
