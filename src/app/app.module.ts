import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {environment} from "../environments/environment";
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import { NavigationComponent } from './components/navigation/navigation.component';
import {MaterialModule} from "./material/material/material.module";
import { MusterilerComponent } from './components/musteriler/musteriler.component';
import { MusteriDialogComponent } from './components/dialogs/musteri-dialog/musteri-dialog.component';
import {MatTableModule} from "@angular/material/table";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatDialogModule} from "@angular/material/dialog";
import { BorclarComponent } from './components/borclar/borclar.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import { BorcDialogComponent } from './components/dialogs/borc-dialog/borc-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    MusterilerComponent,
    MusteriDialogComponent,
    BorclarComponent,
    BorcDialogComponent,
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
        MaterialModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatIconModule,
        MatDialogModule,
        FormsModule,
        MatTooltipModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
