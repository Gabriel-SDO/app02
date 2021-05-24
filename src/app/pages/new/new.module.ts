import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NewPageRoutingModule } from './new-routing.module';
import { NewPage } from './new.page';

// Importa módulo driver do "Reactive Forms"
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewPageRoutingModule,

    // Declara driver do "Reactive Forms"
    ReactiveFormsModule
  ],
  declarations: [NewPage]
})
export class NewPageModule {}
