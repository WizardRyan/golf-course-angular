import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {AuthService} from "../core/auth.service";
import {User} from "firebase/app";
import {Player} from "../model/interfaces";

@Injectable()
export class GolfDataService {

  private golfUrl = 'https://golf-courses-api.herokuapp.com/courses';
  private localObj: object = {latitude: 40.4426135, longitude: -111.8631115, radius: 20};
  private currentCourse;
  private numOfPlayers: number;
  private teeType: string;
  private userExists;
  private userHasData;
  private user: any;
  private golfData: Player = {
    playerScoreInputs: [],
    playerScores: [],
    playerNames: ['Player 1', 'Player 2', 'Player 3', 'Player 4'],
    courseID: null,
    selectedTee: null,
    numberOfPlayers: null
  };
  private courseURL;
  private dataSet = false;

  constructor(private httpClient: HttpClient, private auth: AuthService) {
    auth.user.subscribe((data) => {
      if (!this.dataSet) {
        this.userExists = !!data;
        if (this.userExists) {
          this.user = data;
          // if there is no golf data on the user, initialize it
          if (!data.golfData) {
            this.auth.setUserScores(this.golfData);
            this.dataSet = true;
          }
          // if data already exists, set it
          if (data.golfData) {
            this.golfData = data.golfData;
            this.dataSet = true;
          }
          this.userHasData = true;
        }
        else {
          console.log('there was no user');
        }
      }
    });


  }

  getGolfData(): Observable<any> {
    return this.httpClient.post(this.golfUrl, this.localObj).pipe(catchError(this.handleError));
  }

  setLocation(latitude: number, longitude: number, radius: number): void {
    this.localObj = {latitude, longitude, radius};
  }

  setCurrentCourse(course): void {
    if (this.userHasData) {
      this.golfData.courseID = course;
      this.auth.setUserScores(this.golfData);
    }
    this.currentCourse = course;
  }

  getCourse(): Observable<any> {
    let course = this.golfData.courseID ? this.golfData.courseID : this.currentCourse;
    return this.httpClient.get(this.golfUrl + '/' + course);
  }


  getSetnumOfPlayers(num?): number {
    if (num) {
      if (this.userHasData) {
        this.golfData.numberOfPlayers = num;
        this.auth.setUserScores(this.golfData);
      }
      this.numOfPlayers = num;
    }
    else {
      return this.golfData.numberOfPlayers ? this.golfData.numberOfPlayers : this.numOfPlayers;
    }
  }

  getSetTeeType(tee?): string {
    if (tee) {
      if (this.userHasData) {
        this.golfData.selectedTee = tee;
        this.auth.setUserScores(this.golfData);
      }
      this.teeType = tee;
    }
    else {
      return this.golfData.selectedTee ? this.golfData.selectedTee : this.teeType;
    }
  }

  getSetPlayerNames(names?: string[]) {
    if (names) {
      this.golfData.playerNames = names;
      this.auth.setUserScores(this.golfData);
    }
    else {
      return this.golfData.playerNames;
    }
  }

  getSetPlayerScoreInputs(scores?: number[]) {
    if (scores) {
      this.golfData.playerScoreInputs = scores;
      this.auth.setUserScores(this.golfData);
    }
    else {
      return this.golfData.playerScoreInputs;
    }
  }

  handleError(error) {
    console.log('no good: ', error);
    return Observable.throw(error.error || 'Server error');
  }

  hasData() {
    return this.userHasData;
  }
}
