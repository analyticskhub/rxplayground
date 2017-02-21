import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing, routedComponents } from './app.routing';
// Material 2 
import { MdCoreModule } from '@angular2-material/core'
import { MdButtonModule } from '@angular2-material/button';
import { MdCardModule } from '@angular2-material/card';
import { MdRadioModule } from '@angular2-material/radio';
import { MdCheckboxModule } from '@angular2-material/checkbox'
import { MdTooltipModule } from '@angular2-material/tooltip';
import { MdSliderModule } from '@angular2-material/slider';
import { MdButtonToggleModule } from '@angular2-material/button-toggle'
import { MdGridListModule } from '@angular2-material/grid-list';
import { MdProgressCircleModule } from '@angular2-material/progress-circle';
import { MdInputModule } from '@angular2-material/input';
import { MdListModule } from '@angular2-material/list'
import { MdMenuModule } from '@angular2-material/menu';
import { MdProgressBarModule } from '@angular2-material/progress-bar';
import { MdSidenavModule} from '@angular2-material/sidenav';
//import { MdSliderModule } from '@angular2-material/slider';
import { MdSlideToggleModule } from '@angular2-material/slide-toggle';
import { MdTabsModule } from '@angular2-material/tabs';
import { MdToolbarModule } from '@angular2-material/toolbar';
import { MdIconModule, MdIconRegistry } from '@angular2-material/icon';
import 'hammerjs';



import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SidenavComponent } from './shared/sidenav/sidenav.component';
import { StreamsComponent } from './components/streams/streams.component';
import { StreampgComponent } from './components/streampg/streampg.component';

import {StreamsService} from './components/streampg/streams.service'
import {ReportService} from './components/streampg/report.service';
import {AnalyticsService} from './components/streampg/analytics.service';
import { ReportComponent } from './components/streampg/report.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidenavComponent,
    StreamsComponent,
    StreampgComponent,
    ReportComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    MdCoreModule.forRoot(),
    MdCardModule.forRoot(),
    MdSidenavModule.forRoot(),
    MdMenuModule.forRoot(),
    MdProgressCircleModule.forRoot(),
    MdRadioModule.forRoot(),
    MdCheckboxModule.forRoot(),
    MdTooltipModule.forRoot(),
    MdSliderModule.forRoot(),
    MdIconModule.forRoot(),
    MdTabsModule.forRoot(),
    MdSlideToggleModule.forRoot(),
    MdProgressBarModule.forRoot(),
    MdListModule.forRoot(),
    MdInputModule.forRoot(),
    MdGridListModule.forRoot(),
    MdButtonToggleModule.forRoot(),
    MdToolbarModule.forRoot(),
    MdButtonModule.forRoot()

  ],
  providers: [MdIconRegistry,
    StreamsService, ReportService, AnalyticsService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(mdIconRegistry: MdIconRegistry) {
    mdIconRegistry
      .registerFontClassAlias('fontawesome', 'fa');
  }
}
