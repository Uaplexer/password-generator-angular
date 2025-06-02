import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '@environment/environment.sample';

export const ninjasApiInterceptor: HttpInterceptorFn = (req, next) => {
  const isNinjasApi = req.url.startsWith(environment.ninjasApiUrl);

  if (isNinjasApi) {
    const modifiedReq = req.clone({
      setHeaders: {
        'X-Api-Key': environment.ninjasApiKey,
      },
    });
    return next(modifiedReq);
  }

  return next(req);
};
