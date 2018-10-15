import { Component, OnInit } from '@angular/core';
import { AppState } from '../app-state';
import { StateService } from '../state.service';
import { sortCondition } from '../sorting-helper';

@Component({
  selector: 'app-gridview',
  templateUrl: './gridview.component.html',
  styleUrls: ['./gridview.component.css']
})
export class GridviewComponent implements OnInit {

  appState$: AppState;


  constructor(private stateService: StateService) { }

  ngOnInit() {
    this.stateService.getAppState()
      .subscribe(appState => this.appState$ = appState);
  }

  toggleSortingDirection() {
    this.appState$.sortDirect = this.appState$.sortDirect === 'asc' ? 'desc' : 'asc';

    if (this.appState$.rates)
      this.appState$.rates.sort(sortCondition.bind(this));
  }

  onClick() {
    this.toggleSortingDirection();  
  }
}
