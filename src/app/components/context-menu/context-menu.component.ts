import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ContextMenuModel } from '../../Interfaces/context-menu-model';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss'],
})
export class ContextMenuComponent {
  @Input()
  contextMenuItems: Array<ContextMenuModel> = [];

  @Output()
  onContextMenuItemClick: EventEmitter<any> = new EventEmitter<any>();

  public onContextMenuClick(event: any, data: any): any {
    this.onContextMenuItemClick.emit({
      event,
      data,
    });
  }
}
