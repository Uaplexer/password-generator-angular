import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from '@environment/environment.sample';
import {
  RandomPasswordQueryParams,
  RandomPasswordResponse,
} from './ninjas-api.model';
import { GenericApiError, PremiumFeatureError } from './ninjas-api.errors';

@Injectable({
  providedIn: 'root',
})
export class NinjasApiService {
  readonly #apiUrl = `${environment.ninjasApiUrl}/${environment.ninjasApiVersion}`;
  readonly #http = inject(HttpClient);

  getRandomPassword$(
    queryParams: RandomPasswordQueryParams
  ): Observable<string> {
    return this.#http
      .get<RandomPasswordResponse>(`${this.#apiUrl}/passwordgenerator`, {
        params: { ...queryParams },
      })
      .pipe(
        map((response: RandomPasswordResponse) => response.random_password),
        catchError(this.#handleError)
      );
  }

  #handleError(error: HttpErrorResponse): Observable<never> {
    const errorMessage = error?.error?.error;
    if (errorMessage?.includes('premium')) {
      return throwError(() => new PremiumFeatureError());
    }
    console.error('API error:', error);

    return throwError(() => new GenericApiError(errorMessage));
  }
}
