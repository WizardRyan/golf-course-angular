import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatCardModule, MatDialogModule, MatGridListModule, MatInputModule, MatListModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSelectModule, MatSpinner,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';
import { AppComponent } from './app.component';
import {GolfDataService} from './services/golf-data.service';
import {HttpClientModule} from '@angular/common/http';
import { CourseSetupComponent } from './course-setup/course-setup.component';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import { ScoreCardComponent } from './score-card/score-card.component';
import { ScoreCardDialogComponent } from './score-card/score-card-dialog/score-card-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    CourseSetupComponent,
    ScoreCardComponent,
    ScoreCardDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatListModule,
    MatTableModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatDialogModule,
    RouterModule.forRoot([
      { path: 'course-setup', component: CourseSetupComponent },
      { path: 'score-card', component: ScoreCardComponent },
      { path: '**', component: CourseSetupComponent }
    ])

  ],
  providers: [GolfDataService],
  bootstrap: [AppComponent],
  entryComponents: [ScoreCardDialogComponent]
})
export class AppModule { }
