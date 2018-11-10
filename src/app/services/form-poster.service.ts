import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Employee } from '../../models/employee.model';
import { Observable } from 'rxjs';
import { catchError, map, delay } from 'rxjs/operators';

@Injectable()
export class FormPoster {
  constructor(private http: Http) {}

  private extractData(res: Response) {
    const body = res.json();
    return body.data || {};
  }
  private extractLanguages(res: Response) {
    const body = res.json();
    return body.data || {};
  }

  private handleError(error: any) {
    console.log('POST error: ', error);
    return Observable.throw(error.statusText);
  }

  getLanguages(): Observable<any> {
    return this.http.get('http://localhost:3100/getlanguages').pipe(
      delay(5000),
      map(this.extractLanguages),
      catchError(this.handleError)
    );
  }

  postEmployeeForm(employee: Employee): Observable<any> {
    const body = JSON.stringify(employee);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http
      .post('http://localhost:3100/postemployee', body, options).pipe(
        map(this.extractData),
        catchError(this.handleError)
      );
  }
}
