import { Component, OnInit } from '@angular/core';
import {GolfDataService} from '../services/golf-data.service';

@Component({
  selector: 'app-course-setup',
  templateUrl: './course-setup.component.html',
  styleUrls: ['./course-setup.component.css']
})
export class CourseSetupComponent implements OnInit {

  golfObject;
  cardTitle = "Select a Course";
  cardImage = "http://www.hdwallpaperup.com/wp-content/uploads/2015/07/Golf-Ball-Wallpaper.jpg";
  cardContent = "Select a course to get started, then an amount of players and a tee type. When you're satisfied with your selection, head on over to the Score Card page";
  cardCourses;
  selectedCourse;
  location = {latitude: 40.4426135, longitude: -111.8631115, radius: 20};
  numOfPlayers = [1, 2, 3, 4];
  numPlayers;
  teeType;

  constructor(private golfData: GolfDataService) {
  }

  ngOnInit() {
    this.golfObject = this.golfData.getGolfData().subscribe(data => {
      this.golfObject = data;
      this.cardCourses = this.golfObject.courses;
    });

  }

  setCourse(course) {
    this.golfData.setCurrentCourse(course);
    this.golfData.getCourse().subscribe(p => {
      this.selectedCourse = p;
      console.log(this.selectedCourse);
    });
    course.thumbnail ? this.cardImage = course.thumbnail : this.cardImage = "http://www.hdwallpaperup.com/wp-content/uploads/2015/07/Golf-Ball-Wallpaper.jpg";
    this.cardTitle = course.name;

  }

  setCourseLocation() {
    this.golfData.setLocation(this.location.latitude, this.location.longitude, this.location.radius);
    this.ngOnInit();
  }

  setNumOfPlayers(num) {
    this.numPlayers = num;
  }

  setTeeType(tee) {
    this.teeType = tee;
  }

}

