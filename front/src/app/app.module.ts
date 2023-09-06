import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersonsComponent } from './persons/persons.component';
import { Page404Component } from './page404/page404.component';
import { HeaderComponent } from './header/header.component';
import { CategoriesComponent } from './categories/categories.component';
import { CreatePersonComponent } from './dialogs/create-person.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
	declarations: [
		AppComponent,
		PersonsComponent,
		Page404Component,
		HeaderComponent,
		CategoriesComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		CreatePersonComponent
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
