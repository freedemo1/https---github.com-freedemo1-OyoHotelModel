import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { appRouter } from './app.routes';
import { bootstrapApplication } from '@angular/platform-browser';

bootstrapApplication(AppComponent, {
  providers: [appRouter, provideHttpClient()]
});
