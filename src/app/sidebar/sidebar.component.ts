import { Component, OnInit } from '@angular/core';
import { AppState } from '../app-state';
import { StateService } from '../state.service';
import { CurrencyItem } from '../currencies-select';
import { sortCondition } from '../sorting-helper';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private stateService: StateService) { }

  currencies$: CurrencyItem[];
  appState$: AppState;
  selectedValue: string;

  ngOnInit() {
    this.stateService.getCurrenciesList()
      .subscribe(currencies => this.currencies$ = currencies);
    this.stateService.getAppState()
      .subscribe(appState => this.appState$ = appState);
  }

  prepareData(data) {
    if(data.rates)
      return Object.keys(data.rates).map(key => (
        {
          marked: this.currencies$.some(e => e.id === key),
          label: key, 
          buyValue: data.rates[key] + (data.rates[key]/100)*5,
          sellValue: data.rates[key] - (data.rates[key]/100)*5
        })).sort(sortCondition.bind(this));
    return [];
  }

  onClick() {
    this.appState$.rates = null;
    this.appState$.pending = true;
    this.stateService.getRates(this.appState$.currentDate, this.appState$.currentCurrency)
      .subscribe(data => {
        this.appState$.rates = this.prepareData(data);
        this.appState$.pending = false;
      });

  }
}
