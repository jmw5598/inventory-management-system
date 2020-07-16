import { Platform } from '../../models/platform.model';

export interface IPlatformState {
  platforms: Platform[]
};

export const initialPlatformState: IPlatformState = {
  platforms: []
};
