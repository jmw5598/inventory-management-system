import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IPlatformState } from '../state/platform.state';

export const selectPlatformState = createFeatureSelector<IPlatformState>('platforms');

export const selectPlatforms = createSelector(
  selectPlatformState, 
  (state: IPlatformState) => state.platforms
);
