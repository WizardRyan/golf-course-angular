import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {AuthService} from "../core/auth.service";

@Injectable()
export class GolfDataService {

  private golfUrl = 'https://golf-courses-api.herokuapp.com/courses';
  private localObj: object = {latitude: 40.4426135, longitude: -111.8631115, radius: 20};
  private currentCourse;
  private numOfPlayers: number;
  private teeType: string;


  constructor(private httpClient: HttpClient, private auth: AuthService) {
    if (auth.user !== null) {

    }
  }

  getGolfData(): Observable<any> {
    return this.httpClient.post(this.golfUrl, this.localObj).pipe(catchError(this.handleError));
  }

  setLocation(latitude: number, longitude: number, radius: number): void {
    this.localObj = {latitude, longitude, radius};
  }

  setCurrentCourse(course): void {
    this.currentCourse = course;
  }

  getCourse(): Observable<any> {
    return this.httpClient.get(this.golfUrl + '/' + this.currentCourse.id);
  }

  getCurrentCourse() {
    return this.currentCourse;
  }

  getSetnumOfPlayers(num?): number {
    if (num) {
      this.numOfPlayers = num;
    }
    return this.numOfPlayers;
  }

  getSetTeeType(tee?): string {
    if (tee) {
      this.teeType = tee;
    }
    return this.teeType;
  }

  handleError(error) {
    console.log('no good: ', error);
    return Observable.throw(error.error || 'Server error');
  }
}
