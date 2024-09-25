import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { enableProdMode } from '@angular/core';


export function getBaseUrl(){
  if(!environment.production)
    return '';
  return '';
}

export function getEnvironment(){
  return 2;
}

const providers = [
  { provide: 'BASE_URL', useFactory: getBaseUrl, deps: []}
]

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic(providers).bootstrapModule(AppModule)
  .catch(err => console.error(err));

export function copyWith<T>(original: T, updates: Partial<T>): T {
  return { ...original, ...updates };
}