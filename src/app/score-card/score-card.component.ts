import {AfterViewInit, Component, OnInit} from '@angular/core';
import {GolfDataService} from '../services/golf-data.service';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {GolfTableDataObject, PlayerScore} from '../model/interfaces';
import {ScoreCardDialogComponent} from './score-card-dialog/score-card-dialog.component';
import {AuthService} from "../core/auth.service";
import * as _ from 'lodash';

@Component({
  selector: 'app-score-card',
  templateUrl: './score-card.component.html',
  styleUrls: ['./score-card.component.css'],
})

export class ScoreCardComponent implements OnInit {
  displayedColumns = ['hole_num', 'par', 'yardage', 'handicap'];
  holes;
  holeObjects: GolfTableDataObject[] = [];
  dataSource = new MatTableDataSource();
  numOfPlayers: number;
  numPlayersArray: number[] = [];
  playerNames: string[] = ['Player 1', 'Player 2', 'Player 3', 'Player 4'];
  playerScores: PlayerScore[] = [];
  playerScoreInputs: number[][] = [[], [], [], []];
  par = 0;
  load = false;
  fillPlayerScores = true;

  constructor(private golfService: GolfDataService, public dialog: MatDialog, public auth: AuthService) {
  }

  ngOnInit() {

    let sub = this.auth.user.subscribe(dat => {
      this.golfService.getCourse().subscribe(course => {
        this.initUserData(course);
        this.setupTable(course);
      });
      sub.unsubscribe();
    });
  }

  setupTable(currentCourse) {
    currentCourse ? this.load = true : this.load = false;
    this.holes = currentCourse.course.holes;
    this.numOfPlayers = this.golfService.getSetnumOfPlayers();


    if (this.fillPlayerScores) {
      // fill player scores with 0
      for (let i = 0; i < this.numOfPlayers; i++) {
        for (let j = 0; j < this.holes.length; j++) {
          this.playerScoreInputs[i].push(0);
        }
      }

      // fill players with total scores
      for (let i = 0; i < this.numOfPlayers; i++) {
        this.playerScores.push({in_score: 0, out_score: 0, total: 0});
      }
    }

    else{
      this.totalTheScores(currentCourse);
    }

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
          this.par += teeBox.par;
        }
      }
    }

    for (let k = 0; k < this.numOfPlayers; k++) {
      this.displayedColumns.push(`player${k + 1}`);
      this.numPlayersArray.push(k + 1);
    }

    this.dataSource.data = this.holeObjects;
  }

  onScoreInput(event: any, num, holeNum) {
    let n = num - 1;
    this.playerScoreInputs[n][holeNum] = Number(event.target.value);
    this.pushPlayerScores();

    let half = this.holes.length / 2;
    let inScore = 0;
    let outScore = 0;
    for (let i = 0; i < half; i++) {
      outScore += this.playerScoreInputs[n][i];
    }
    for (let i = half; i < this.holes.length; i++) {
      inScore += this.playerScoreInputs[n][i];
    }
    this.playerScores[n].total = inScore + outScore;
    this.playerScores[n].out_score = outScore;
    this.playerScores[n].in_score = inScore;

    if (holeNum + 1 === this.holes.length) {
      this.openDialog(n);
    }
  }

  openDialog(num): void {
    this.dialog.open(ScoreCardDialogComponent, {
      width: '250px',
      data: {name: this.playerNames[num], score: this.playerScores[num], par: this.par}
    });
  }

  pushPlayerScores() {
    let singleScores = [];
    for (let i = 0; i < this.golfService.getSetnumOfPlayers(); i++) {
      for (let k = 0; k < this.holes.length; k++) {
        singleScores.push(this.playerScoreInputs[i][k]);
      }
    }
    this.golfService.getSetPlayerScoreInputs(singleScores);
  }

  pushPlayerNames() {
    this.golfService.getSetPlayerNames(this.playerNames);
  }

  initUserData(course) {
    let a = this.golfService.getSetPlayerScoreInputs();
    debugger;
    if (this.golfService.getSetPlayerScoreInputs().length > 0) {
      let single = this.golfService.getSetPlayerScoreInputs();
      debugger;
      this.playerScoreInputs = _.chunk(single, course.course.holes.length);
      this.fillPlayerScores = false;
    }
    if(this.golfService.getSetPlayerScoreInputs().length === 0) {
      let single = [];
      for (let i = 0; i < this.numOfPlayers; i++) {
        for (let j = 0; j < this.holes.length; j++) {
          this.playerScoreInputs[i].push(0);
          single.push(this.playerScoreInputs[i]);
          debugger;
        }
      }
      this.golfService.getSetPlayerScoreInputs(single);
    }
    if (this.golfService.getSetPlayerNames()) {
      this.playerNames = this.golfService.getSetPlayerNames();
    }
  }

  totalTheScores(course) {
    // fill players with total scores
    for (let i = 0; i < this.numOfPlayers; i++) {
      this.playerScores.push({in_score: 0, out_score: 0, total: 0});
    }

    let column = course.course.holes.length / this.golfService.getSetnumOfPlayers();
    debugger;
    for (let i = 0; i < this.golfService.getSetnumOfPlayers(); i++) {
      let inscore = 0;
      let outscore = 0;
      let total = 0;

      for (let k = 0; k < column / 2; k++) {
        inscore += this.playerScoreInputs[i][k];
      }
      for (let k = column / 2; k < column; k++) {
        outscore += this.playerScoreInputs[i][k];
      }
      this.playerScores[i].in_score = inscore;
      this.playerScores[i].out_score = outscore;
      this.playerScores[i].total = inscore + outscore;

    }
  }

}

