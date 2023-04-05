import { Component, HostListener } from '@angular/core';
import { ContextMenuModel } from './Interfaces/context-menu-model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { DataService } from './services/data.service';
import { Position } from './Interfaces/position-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @HostListener('document:click') public documentClick(): void {
    this.isDisplayContextMenu = false;
  }

  @HostListener('mousemove', ['$event']) onMouseMove(event: {
    clientX: number;
    clientY: number;
    currentTarget: { offsetLeft: number; offsetTop: number };
  }) {
    this.position = {
      clientX: event.clientX - event.currentTarget.offsetLeft,
      clientY: event.clientY - event.currentTarget.offsetTop,
    };
  }

  private position = { clientX: 0, clientY: 0 };
  public isOpenPrompt = false;
  public isDisplayContextMenu: boolean = false;
  public rightClickMenuItems: Array<ContextMenuModel> = [];
  public rightClickMenuPositionX: number = 0;
  public rightClickMenuPositionY: number = 0;
  public zoomScale = 1;
  private noOfItemsToShowInitially: number = 5;

  private itemsToLoad: number = 5;

  private items = [
    {
      src: 'assets/1.png',
    },
    {
      src: 'assets/2.png',
    },
    {
      src: 'assets/3.png',
    },
    {
      src: 'assets/4.png',
    },
    {
      src: 'assets/5.png',
    },
  ];

  public itemsToShow = this.items.slice(0, this.noOfItemsToShowInitially);
  public isFullListDisplayed: boolean = false;

  public openDialog(isImage: boolean = false) {
    this.dialog.open(DialogComponent, {
      data: {
        isImage,
        position: this.getCursorPostitionStyle(),
      },
    });
  }

  constructor(public dialog: MatDialog, public dataService: DataService) {}

  public zoomIn(): void {
    this.zoomScale *= 1.1;
  }

  public zoomOut(): void {
    this.zoomScale *= 0.9;
  }

  public displayContextMenu(event: { clientX: number; clientY: number }) {
    this.isDisplayContextMenu = true;

    this.rightClickMenuItems = [
      {
        menuText: 'Image',
        menuEvent: 'Handle',
      },
      {
        menuText: 'Notion',
        menuEvent: 'Handle',
      },
    ] as ContextMenuModel[];

    this.rightClickMenuPositionX = event.clientX;
    this.rightClickMenuPositionY = event.clientY;
  }

  public getRightClickMenuStyle(): Position {
    return {
      position: 'fixed',
      left: `${this.rightClickMenuPositionX}px`,
      top: `${this.rightClickMenuPositionY}px`,
    };
  }

  public getCursorPostitionStyle(): Position {
    return {
      position: 'fixed',
      left: `${this.position.clientX}px`,
      top: `${this.position.clientY}px`,
    };
  }

  public handleMenuItemClick(event: { data: any }) {
    switch (event.data) {
      case this.rightClickMenuItems[0].menuEvent:
        this.openDialog(true);
        this.isOpenPrompt = true;
        break;
      case this.rightClickMenuItems[1].menuEvent:
        this.openDialog(false);
        console.log('To handle formatting');
    }
  }

  public onWheel(event: WheelEvent): void {
    event.preventDefault();
    const delta = event.deltaY < 0 ? 1.1 : 0.9;
    this.zoomScale *= delta;
  }

  public removeItem(index: number, isImage: boolean = false) {
    if (isImage) {
      return this.dataService.images.next(
        this.dataService.images.getValue().filter((_, i) => i !== index)
      );
    }
    this.dataService.notion.next(
      this.dataService.notion.getValue().filter((_, i) => i !== index)
    );
  }

  public onScroll() {
    if (this.noOfItemsToShowInitially <= this.items.length) {
      this.noOfItemsToShowInitially += this.itemsToLoad;
      this.itemsToShow = this.items.slice(0, this.noOfItemsToShowInitially);
      console.log('scrolled');
    } else {
      this.isFullListDisplayed = true;
    }
  }
}
