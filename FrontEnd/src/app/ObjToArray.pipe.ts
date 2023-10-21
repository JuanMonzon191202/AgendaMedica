import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'ObjToArray' })
export class ObjToArray implements PipeTransform {
  transform(object: any = []): any {
    return Object.values(object);
  }
}
