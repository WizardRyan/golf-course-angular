import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreCardDialogComponent } from './score-card-dialog.component';

describe('ScoreCardDialogComponent', () => {
  let component: ScoreCardDialogComponent;
  let fixture: ComponentFixture<ScoreCardDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoreCardDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreCardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
