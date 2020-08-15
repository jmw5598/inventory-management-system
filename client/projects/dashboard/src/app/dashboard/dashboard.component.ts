import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthenticatedUser, Stockroom } from '@inv/core';
import { IAppState } from '@dashboard/core/store/state';
import { selectAuthenticatedUser, selectCurrentStockrooms } from '@dashboard/core/store/selectors';
import { fadeAnimation } from '@dashboard/shared/animations';

@Component({
  selector: 'inv-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [fadeAnimation]
})
export class DashboardComponent implements OnInit {
  public isCollapsed: boolean = false;
  public stockroomState$: Observable<Stockroom[]>;
  public authenticatedUser$: Observable<AuthenticatedUser>;

  constructor(private _store: Store<IAppState>) { }

  ngOnInit(): void {
    this.stockroomState$ = this._store.select(selectCurrentStockrooms);
    this.authenticatedUser$ = this._store.select(selectAuthenticatedUser);
  }

  public getUserInitials(user: AuthenticatedUser): string {
    return user ? user.userDetails.username.substring(0, 2).toUpperCase() : 'U'
  }

  public onSiderCollapse(isCollapsed: boolean): void {
    this.isCollapsed = isCollapsed;
  }
}
