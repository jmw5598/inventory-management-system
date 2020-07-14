import { createFeatureSelector } from '@ngrx/store';
import { IAuthenticationState } from '../state/authentication.state';

export const selectAuthenticationState = createFeatureSelector<IAuthenticationState>('authentication');
