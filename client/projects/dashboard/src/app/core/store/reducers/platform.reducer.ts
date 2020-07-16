import { createReducer, on } from '@ngrx/store';
import { getPlatformsSuccess } from '../actions/platform.actions';
import { initialPlatformState } from '../state/platform.state';

const _platformReducer = createReducer(
  initialPlatformState,
  on(getPlatformsSuccess, (state, { payload }) => {
    return {
      ...state,
      platforms: payload
    }
  })
);

export function platformReducer(state, action) {
  return _platformReducer(state, action);
}
