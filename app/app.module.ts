import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { AppComponent }   from './app.component';
import {ClaimServices} from './Services/claims.field.service';
import { ClaimComponent }   from './claim.component';
import { TravelComponent }   from './travel.component';
import { LodgingComponent }   from './lodging.component';
import { DailyAllowanceComponent }   from './daily.allowance.component';
import { LocalConveyanceComponent} from './local.conveyance.component';
import { HRAComponent} from './hra.component';
import { MobileComponent} from './mobile.component';
import {MiscComponent} from './misc.component';

@NgModule({
  imports:      [ BrowserModule,
                    FormsModule ],
  declarations: [ AppComponent,
                  ClaimComponent,
                  TravelComponent,
                  LodgingComponent,
                  DailyAllowanceComponent,
                  LocalConveyanceComponent,
                  HRAComponent,
                  MobileComponent,
                  MiscComponent ],
  providers: [ClaimServices],
  bootstrap:    [ AppComponent]
})

export class AppModule { }