import {AfterViewInit, Component, OnInit} from '@angular/core';
import {GolfDataService} from '../services/golf-data.service';
import {MatTableDataSource} from "@angular/material";
import {GolfTableDataObject} from "../model/interfaces";

@Component({
  selector: 'app-score-card',
  templateUrl: './score-card.component.html',
  styleUrls: ['./score-card.component.css']
})

export class ScoreCardComponent implements OnInit, AfterViewInit {
  displayedColumns = ['hole_num', 'par', 'yardage', 'handicap'];
  holes;
  holeObjects: GolfTableDataObject[] = [];
  dataSource = new MatTableDataSource();
  numOfPlayers: number;
  numPlayersArray: number[] = [];
  playerScores: number[] = [];
  playerNames: string[];


  constructor(private golfService: GolfDataService) {

  }

  ngOnInit() {
    this.playerScores.fill(0, 0, 18);
    const currentCourse = this.golfService.getCurrentCourse();
    this.holes = currentCourse.course.holes;
    this.numOfPlayers = this.golfService.getSetnumOfPlayers();

    for (let i = 0; i < currentCourse.course.holes.length; i++) {
      let holeObject: GolfTableDataObject;

      for (let k = 0; k < currentCourse.course.holes[i].tee_boxes.length; k++) {
        if (currentCourse.course.holes[i].tee_boxes[k].tee_type === this.golfService.getSetTeeType()) {
          const teeBox = currentCourse.course.holes[i].tee_boxes[k];
          holeObject = {
            handicap: teeBox.hcp,
            hole_num: i + 1,
            par: teeBox.par,
            yardage: teeBox.yards
          };
          this.holeObjects.push(holeObject);
        }
      }
    }

    for (let k = 0; k < this.numOfPlayers; k++) {
      this.displayedColumns.push(`player${k + 1}`);
      this.numPlayersArray.push(k + 1);
    }
    console.log(this.displayedColumns);
    console.log(this.numPlayersArray);
    this.dataSource.data = this.holeObjects;
  }

  ngAfterViewInit() {


  }
}

