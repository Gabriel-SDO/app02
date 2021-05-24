import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AboutviewPageRoutingModule } from './aboutview-routing.module';

import { AboutviewPage } from './aboutview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AboutviewPageRoutingModule
  ],
  declarations: [AboutviewPage]
})
export class AboutviewPageModule {}
