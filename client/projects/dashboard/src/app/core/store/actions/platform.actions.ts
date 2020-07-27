import { createAction } from '@ngrx/store';
import { Platform } from '@inv/core';

export enum PlatformActions {
  GET_PLATFORMS = '[Platform] Get Platforms',
  GET_PLATFORMS_SUCCESS = '[Platform] Get Platforms Success',
};

export const getPlatforms = createAction(
  PlatformActions.GET_PLATFORMS
);

export const getPlatformsSuccess = createAction(
  PlatformActions.GET_PLATFORMS_SUCCESS,
  (platforms: Platform[]) => ({ payload: platforms })
);
