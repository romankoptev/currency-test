import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppState } from './app-state';
import { CurrencyItem } from './currencies-select';
import { HttpClient } from '@angular/common/http';
 
@Injectable({
  providedIn: 'root'
})

export class StateService {

  appState: AppState = {
    currentCurrency: 'EUR',
    sortBy: 'label',
    sortDirect: 'asc',
    currentDate: new Date().toISOString().slice(0,10),
    pending: false,
    rates: null
  };

  currenciesList: CurrencyItem[] = [
    {id: 'EUR', value: 'EUR'},
    {id: 'USD', value: 'USD'},
    {id: 'GBP', value: 'GBP'},
    {id: 'AUD', value: 'AUD'},
    {id: 'CAD', value: 'CAD'},
    {id: 'JPY', value: 'JPY'}
  ];

  constructor(private http: HttpClient) {}

  getAppState(): Observable<AppState> {
    return of(this.appState);
  }

  getCurrenciesList(): Observable<CurrencyItem[]> {
    return of(this.currenciesList);
  }

  getRates(date: string, base: string) {
    const url = `https://api.exchangeratesapi.io/${date}?base=${base}`;
    return this.http.get(url);
  }
}
