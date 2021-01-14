import { NgModule } from '@angular/core';
import { DateRangeColumnFilterComponent } from './date-range/date-range-filter.component';
import { RemoteCompleterColumnFilterComponent } from './remote-completer/remote-completer-filter.component';
import { Ng2CompleterModule } from 'ng2-completer';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbButtonModule, NbCardModule } from '@nebular/theme';
import { SandfoxNebuFormControlsModule } from 'sandfox-nebu-form-controls';

@NgModule({
  declarations: [DateRangeColumnFilterComponent, RemoteCompleterColumnFilterComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,

    NbCardModule,
    NbButtonModule,

    Ng2CompleterModule,
    Ng2SmartTableModule,

    SandfoxNebuFormControlsModule,
  ],
  exports: [DateRangeColumnFilterComponent, RemoteCompleterColumnFilterComponent]
})
export class SandfoxNebuTableFiltersModule { }
