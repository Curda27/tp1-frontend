import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonsComponent } from './persons/persons.component';
import { HomeComponent } from './home/home.component';
import { Page404Component } from './page404/page404.component';
import { CategoriesComponent } from './categories/categories.component';

const routes: Routes = [
	{ path: 'persons', component: PersonsComponent },
	{ path: 'categories', component: CategoriesComponent },
	{ path: '', component: HomeComponent },
	{ path: '**', pathMatch: 'full', component: Page404Component },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
