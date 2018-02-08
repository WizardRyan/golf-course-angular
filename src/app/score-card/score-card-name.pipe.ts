import {Pipe, PipeTransform} from '@angular/core';
import {GolfDataService} from "../services/golf-data.service";

@Pipe({
  name: 'scoreCardName'
})
export class ScoreCardNamePipe implements PipeTransform {

  transform(name: string, names: string[], num: number): string {
    for (let i = 0; i < names.length; i++) {
      if (names[i] === name && num !== i && name !== "") {
        return names[i] + "'s clone";
      }
    }
    return name;
  }

}
