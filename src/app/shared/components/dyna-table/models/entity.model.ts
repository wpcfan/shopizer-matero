import { TemplateRef } from '@angular/core';

export abstract class Entity {
  abstract get id(): string | number;
  protected constructor(init?: Partial<Entity>) {
    Object.assign(this, init);
  }
}

export class EntityColumnDef<T extends Entity> {
  readonly property!: string;
  readonly header: string;
  public visible = true;
  readonly sticky?: 'start' | 'end';
  readonly template?: TemplateRef<unknown>;
  readonly displayFn?: (row: T) => string;

  public constructor(init?: Partial<EntityColumnDef<T>>) {
    Object.assign(this, init);
    this.header = this.property;
  }
}
