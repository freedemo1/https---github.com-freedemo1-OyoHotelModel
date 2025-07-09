// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpRequest, HttpHandlerFn } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        (req: HttpRequest<any>, next: HttpHandlerFn) => {
          const token = localStorage.getItem('token');
          if (token) {
            const cloned = req.clone({
              headers: req.headers.set('Authorization', `Bearer ${token}`)
            });
            return next(cloned);
          }
          return next(req);
        }
      ])
    )
  ]
}).catch(err => console.error(err));
