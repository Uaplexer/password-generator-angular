import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
        catchError(this.handleError)
      );
  }

  private handleError(error: {
    error?: { message?: string };
    message?: string;
  }): Observable<never> {
    const message: string =
      error?.error?.message || error?.message || 'Unknown error';

    if (message.includes('premium')) {
      return throwError(() => new PremiumFeatureError());
    }

    console.error('API error:', error);

    return throwError(() => new GenericApiError(message));
  }
}
