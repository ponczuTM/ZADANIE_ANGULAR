import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { PersonDto } from '../../list-of-smart-guys/dtos/person-dto';

@Injectable({
    providedIn: 'root'
})
export class BrainiacsService {
    private _url: string = "https://reqres.in/api/users";

    constructor(private httpClient: HttpClient) { }

    public getBrainiacs(): Observable<PersonDto[]> {
        return this.httpClient.get<any>(`${this._url}`)
        .pipe(
            map((response: any) => {
                return response.data as PersonDto[];
            }),
            catchError(this.handleError)
        );
    }

    public createBrainiac(brainiacData: PersonDto): Observable<PersonDto> {
        return this.httpClient.post<PersonDto>(`${this._url}`, brainiacData)
        .pipe(
            map((response: any) => {
                const brainiac: PersonDto = {
                    id: response.id,
                    first_name: response.firstName,
                    last_name: response.lastName,
                    email: response.email
                };

                return brainiac;
            }),
            catchError(this.handleError)
        );
    }

    public updateBrainiac(brainiacData: PersonDto, id: number): Observable<PersonDto> {
        return this.httpClient.patch<PersonDto>(`${this._url}/${id}`, brainiacData)
        .pipe(
            map((response: any) => {
                const brainiac: PersonDto = {
                    id: response.id,
                    first_name: response.firstName,
                    last_name: response.lastName,
                    email: response.email,
                };

                return brainiac;
            }),
            catchError(this.handleError)
        );
    }
    
    public deleteBrainiac(id: number): any {
        return this.httpClient.delete<any>(`${this._url}/${id}`)
        .pipe(
            map((response: any) => {
                return response;
            }),
            catchError(this.handleError)
        );
    }

    private handleError(error: HttpErrorResponse): Observable<never> {
        const errorMessage: string = error.error instanceof ErrorEvent ?
        error.error.message : 
        error.error;

        return throwError(`Error occurred: ${errorMessage}`);
      }
}