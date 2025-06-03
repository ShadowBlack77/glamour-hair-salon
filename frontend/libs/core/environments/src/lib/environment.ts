import { InjectionToken } from "@angular/core";

export const ENV_CONFIG: InjectionToken<EnvConfig> = new InjectionToken<EnvConfig>('ENV_CONFIG');

export interface EnvConfig {
  readonly backendUrl: string;
  readonly apiKey: string;
  readonly stripePublicKey: string;
}