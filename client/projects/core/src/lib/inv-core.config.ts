import { InjectionToken } from '@angular/core';

export const INV_CORE_CONFIG = new InjectionToken<InvCoreConfig>('INV_CORE_CONFIG');

export interface InvCoreConfig{
  auth: AuthConfig,
  api: ApiConfig    
}

interface AuthConfig {
  baseUrl: string;
}

interface ApiConfig {
  baseUrl: string;
}
