import { DefaultFilter } from 'ng2-smart-table';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
// https://github.com/akveo/ng2-smart-table/pull/1140#issue-392285957)\
import { CompleterService } from 'ng2-completer';

import { distinctUntilChanged, debounceTime } from 'rxjs/operators';

@Component({
  template: `
    <ng2-completer [(ngModel)]="inputValue"
                   inputClass="form-control"
                   (ngModelChange)="inputTextChanged($event)"
                   [dataService]="column.getFilterConfig().dataService"
                   [minSearchLength]="column.getFilterConfig().minSearchLength || 0"
                   [pause]="column.getFilterConfig().pause || 0"
                   [placeholder]="column.getFilterConfig().placeholder || 'Start typing...'"
                   (selected)="onSelect($event)">
    </ng2-completer>
  `,
})
export class RemoteCompleterColumnFilterComponent  extends DefaultFilter implements OnInit, OnChanges {

  inputValue = '';
  idField = 'id';

  completerContent = new Subject<any>();

  constructor(private completerService: CompleterService) {
    super();
  }

  onSelect(item) {
    console.log('onSelect', item);

    this.completerContent.next(item);
  }

  ngOnInit() {
    const config = this.column.getFilterConfig();

    this.idField = config.idField ? config.idField : 'id';

    config.dataService = this.completerService.remote(
      config.url,
      null, // For local filtering - NOT NEEDED!!!
      config.titleField,
    );

    config.dataService.urlFormater((term: any) => {
      return `${config.url}?${config.lookupField}=${term}`;
    });

    // config.dataService.descriptionField(config.descriptionField); // Maybe for details on popup list

    config.dataService.dataField(config.resultPath); // Extract the Result Array

    this.changesSubscription = this.completerContent
      .pipe(
        /*
        map((ev: any) => {

          return (ev && ev.title) || ev || '';
        }),
        */
        distinctUntilChanged(),
        debounceTime(this.delay)
      )
      .subscribe((search: any) => {
        console.log('completerContent', search);

        if (search.originalObject) {
          this.query = '' + search.originalObject[this.idField];
        } else {
          this.query = '';
        }

        console.log('setFilter', this.query);
        this.setFilter();
      });
  }

  inputTextChanged(event: string) {
    // workaround to trigger the search event when the home/end buttons are clicked
    // when this happens the [(ngModel)]="query" is set to "" but the (selected) method is not called
    // so here it gets called manually
    if (event === '') {
      this.completerContent.next(event);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.query) {
      if (changes.query) {
        const currentValue = changes.query.currentValue;

        console.log('ngOnChanges currentValue', currentValue);

        // this.inputValue =
      }
      // this.inputControl.setValue(this.query);
    }
  }
}
