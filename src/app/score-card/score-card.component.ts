import { Component, OnInit } from '@angular/core';
import {GolfDataService} from '../services/golf-data.service';

@Component({
  selector: 'app-score-card',
  templateUrl: './score-card.component.html',
  styleUrls: ['./score-card.component.css']
})

export class ScoreCardComponent implements OnInit {

  courseData: any[];

  constructor(private golfService: GolfDataService) { }

  ngOnInit() {
    const currentCourse = this.golfService.getCurrentCourse();
  }

}
