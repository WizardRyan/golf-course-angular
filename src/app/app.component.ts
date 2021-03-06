import {Component, OnInit} from '@angular/core';
import {GolfDataService} from './services/golf-data.service';
import {AuthService} from "./core/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  data;


  constructor(private golfService: GolfDataService, private auth: AuthService) {
  }

  ngOnInit() {
    this.golfService.getGolfData().subscribe(data => {
      this.data = data;
      console.log(this.data);
    });
  }
}
