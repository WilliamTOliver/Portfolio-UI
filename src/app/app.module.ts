
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { MatSidenavModule } from '@angular/material';
import { Store, StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { ROUTES } from './app.routes';
import { playlistReducer } from './shared/reducers/playlist/playlist.reducer';

/**
 * @module
 * @name AppModule
 * @description exposes appComponent
 */
@NgModule({
  declarations: [
    AppComponent
  ],
  exports: [
    MatSidenavModule
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpModule,
    MatSidenavModule,
    RouterModule.forRoot(
      ROUTES,
      {
        enableTracing: false // <-- Debugging purposes only.
      }
    ),
    StoreModule.forRoot({
      playlistReducer
    }),
  ],
  providers: [
    Store
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
