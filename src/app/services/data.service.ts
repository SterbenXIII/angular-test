import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ImagesModel } from '../Interfaces/images-model';
import { NotionModel } from '../Interfaces/notion-model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public images: BehaviorSubject<Array<ImagesModel>> = new BehaviorSubject([
    {
      image: '',
      position: { left: '', top: '' },
    },
  ]);

  public notion: BehaviorSubject<Array<NotionModel>> = new BehaviorSubject([
    {
      notion: '',
      position: { left: '', top: '' },
    },
  ]);

  constructor() {}
}
