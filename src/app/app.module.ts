import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CanvasComponent } from './canvas/canvas.component';
import { MenusComponent } from './menus/menus.component';
import { StoreModule } from '@ngrx/store';
import {reducers } from "./store/reducers";
import { undoRedo } from "ngrx-undo-redo";
@NgModule({
  declarations: [
    AppComponent,
    CanvasComponent,
    MenusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, { metaReducers: [undoRedo()] }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
