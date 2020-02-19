import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'medicalBoard'
})
export class MedicalBoardPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return null;
  }

}
