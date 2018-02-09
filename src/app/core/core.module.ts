import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AngularFireAuth, AngularFireAuthModule} from "angularfire2/auth";
import {AngularFirestoreModule} from "angularfire2/firestore";
import {AuthService} from "./auth.service";

@NgModule({
  imports: [
    CommonModule,
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  declarations: [],
  providers: [AuthService]
})
export class CoreModule { }
