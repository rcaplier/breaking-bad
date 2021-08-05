import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable, of} from "rxjs";
import {Character} from "../model/character";

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  private breakingBadApiUrl = 'https://www.breakingbadapi.com/api/characters';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  /** GET characters from the Breaking bad API */
  getCharacters(): Observable<Character[]> {
    return this.http.get<Character[]>(this.breakingBadApiUrl)
      .pipe(
        catchError(this.handleError<Character[]>('getHeroes', []))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.log("coucou");
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  constructor(private http: HttpClient) {
  }
}
