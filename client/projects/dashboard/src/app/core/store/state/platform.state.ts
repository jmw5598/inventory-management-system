import { Platform } from '@inv/core';

export interface IPlatformState {
  platforms: Platform[]
};

export const initialPlatformState: IPlatformState = {
  platforms: []
};
