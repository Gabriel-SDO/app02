import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ContactsPageRoutingModule } from './contacts-routing.module';
import { ContactsPage } from './contacts.page';

// Importa módulo driver do "Reactive Forms"
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactsPageRoutingModule,

    // Declara driver do "Reactive Forms"
    ReactiveFormsModule
  ],
  declarations: [ContactsPage]
})
export class ContactsPageModule {}
