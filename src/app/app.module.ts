import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LayoutComponent } from './components/layout/layout.component';

@NgModule({
  declarations: [AppComponent, LayoutComponent, HeaderComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, CommonModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
