// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  host: 'https://site.com',
  api: {
    host: 'https://api.site.com',
    payment_create_period: 60000,
    payment_status_pending: 5000,
    payment_status_attempts: 10
  }
};
