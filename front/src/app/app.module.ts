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
import { CreateRecordComponent } from 'src/app/dialogs/create-record.component';
import { MedicalRecordComponent } from './medical-record/medical-record.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { ReservationComponent } from './reservations/reservations.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonsComponent,
    Page404Component,
    HeaderComponent,
    CategoriesComponent,
    MedicalRecordComponent,
    ReservationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CreatePersonComponent,
    CreateRecordComponent,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
