import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {Observable, of, Subject} from "rxjs";
import {Character} from "../model/character";

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  private breakingBadApiUrl = 'https://www.breakingbadapi.com/api/';  // URL to web api

  searchSource = new Subject<boolean>();
  searched$ = this.searchSource.asObservable();

  searchSourceValue:string ='';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  searchValue(term: string): void {
    this.searchSourceValue = term;
  }


  search(term: boolean): void {
    this.searchSource.next(term);
  }

  /** GET characters from the Breaking bad API */
  getCharacters(): Observable<Character[]> {
    return this.http.get<Character[]>(this.breakingBadApiUrl + 'characters')
      .pipe(
        catchError(this.handleError<Character[]>('getCharacters', []))
      );
  }
  /** GET characterById from the Breaking bad API */
  getCharacterById(char_id: number): Observable<Character[]> {
    return this.http.get<Character[]>(this.breakingBadApiUrl + 'characters/' + char_id)
      .pipe(
        catchError(this.handleError<Character[]>('getCharacterById'))
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
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /* GET characters whose name contains search term */
  getCharactersFiltred(): Observable<Character[]> {
    if (!this.searchSourceValue.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Character[]>(`${this.breakingBadApiUrl}characters?name=${this.searchSourceValue}`);
  }


  constructor(private http: HttpClient) {
  }
}
