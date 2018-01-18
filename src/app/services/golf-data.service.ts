import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';

@Injectable()
export class GolfDataService {

  private golfUrl = 'https://golf-courses-api.herokuapp.com/courses';
  private localObj: object = {latitude: 40.4426135, longitude: -111.8631115, radius: 20};

  constructor(private httpClient: HttpClient) {
  }

  getGolfData(): Observable<any> {
    return this.httpClient.post(this.golfUrl, this.localObj).pipe(catchError(this.handleError));
  }

  setLocation(latitude: number, longitude: number, radius: number): void {
    this.localObj = {latitude, longitude, radius};
  }

  handleError(error) {
    console.log('no good: ', error);
    return Observable.throw(error.error || 'Server error');
  }
}
