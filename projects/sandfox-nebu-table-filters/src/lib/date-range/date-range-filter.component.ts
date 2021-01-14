import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnChanges, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { NbDialogService, NbDialogRef } from '@nebular/theme';
import { DefaultFilter } from 'ng2-smart-table';


@Component({
  template: `
    <button
      nbButton
      [status]="status"
      (click)="openDialog(dialog)"
    >{{ buttonCaption }}</button>

    <ng-template #dialog>
      <nb-card>
        <nb-card-header>Szűrés dátum tól - ig...</nb-card-header>
        <nb-card-body>
            <ngx-form-datepicker
              name="fromDate"
              caption="Kezdő dátum"
              [formGroup]="formGroup"
            ></ngx-form-datepicker>

            <ngx-form-datepicker
              name="toDate"
              caption="Vég dátum"
              [formGroup]="formGroup"
            ></ngx-form-datepicker>
        </nb-card-body>
        <nb-card-footer>
          <button
            class="cancel" nbButton status="danger"
            (click)="cancel()"
          >{{ status === 'info' ? 'Töröl' : 'Mégsem' }}</button>
          <button
            nbButton
            [disabled]=" formGroup.controls.fromDate.value === null && formGroup.controls.toDate.value === null "
            class="float-right" status="success"
            (click)="submit()"
          >Rendben</button>
        </nb-card-footer>
      </nb-card>
    </ng-template>
  `,
})
export class DateRangeColumnFilterComponent  extends DefaultFilter implements OnInit, OnChanges {

  status = 'basic';
  buttonCaption = 'Add meg...';
  formGroup: FormGroup;
  ref: NbDialogRef<any>;
  emptyValue = {
    fromDate: null,
    toDate: null,
  };

  constructor(
    private dialogService: NbDialogService,
    private formBuilder: FormBuilder,
  ) {
    super();

    this.formGroup = this.formBuilder.group(this.emptyValue);
  }

  openDialog(dialog: TemplateRef<any>) {
    this.ref = this.dialogService.open(dialog);
  }

  cancel() {
    this.ref.close();

    this.formGroup.patchValue(this.emptyValue);

    this.query = '';
    this.setFilter();
    this.status = 'basic';
    this.buttonCaption = 'Add meg...';
  }

  submit() {
    this.ref.close();

    const val = this.formGroup.getRawValue();

    this.query = FormatIsoDate(val.fromDate) + '...' + FormatIsoDate(val.toDate);

    console.log('query', {val, query: this.query});

    this.setFilter();
    this.status = 'info';
    this.buttonCaption = 'Megadva';
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.query) {
    }
  }
}

function FormatIsoDate(val) {
  if (val) {
    const retVal = val.toISOString();

    return retVal;
  } else {
    return null;
  }
}
