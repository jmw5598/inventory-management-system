import { createFeatureSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';

export const selectAuthenticationState = createFeatureSelector<IAppState>('authentication');
