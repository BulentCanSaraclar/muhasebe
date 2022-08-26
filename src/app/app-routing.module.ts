import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MusterilerComponent} from "./components/musteriler/musteriler.component";
import {BorclarComponent} from "./components/borclar/borclar.component";

const routes: Routes = [
  {path:"musteriler",component:MusterilerComponent},
  {path:"borclar/:MusteriId",component:BorclarComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
