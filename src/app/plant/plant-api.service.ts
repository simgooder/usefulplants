import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable({
    providedIn: 'root'
})

export class PlantService {

    constructor(private http : HttpClient) { }


    private URI = 'api/plant/';


    add(plant: object): Observable<any> {

        return Observable.create(observer => {

            this.http.post(this.URI + 'add', plant)
            .subscribe( (data: any) => {

                observer.next(data);
                observer.complete();

            }, (err) => {
                console.log("Error: ", err);
            });
        })
        
    }
    

    getAll(): Observable<any> {

        return Observable.create(observer => {

            this.http.get(this.URI)
            .subscribe( (data: any) => {

                observer.next(data);
                observer.complete();

            }, (err) => {
                console.log("Error: ", err);
            });
        })
        
    }


    getById(id): Observable<any> {

        return Observable.create(observer => {

            this.http.get(this.URI + id)
            .subscribe( (data: any) => {

                observer.next(data);
                observer.complete();

            }, (err) => {
                console.log("Error: ", err);
            });
        })
        
    }

    search(query): Observable<any> {

        return Observable.create(observer => {

            this.http.get(this.URI + 'q/' + query)
            .subscribe( (data: any) => {

                observer.next(data);
                observer.complete();

            }, (err) => {
                console.log("Error: ", err);
            });
        })
        
    }

    update(id, data): Observable<any> {

        return Observable.create(observer => {

            this.http.put(this.URI + id, data)
            .subscribe( (data: any) => {

                observer.next(data);
                observer.complete();

            }, (err) => {
                console.log("Error: ", err);
            });
        })

    }

    delete(id): Observable<any> {
        
        return Observable.create(observer => {

            this.http.delete(this.URI + id)
            .subscribe( (data: any) => {

                observer.next(data);
                observer.complete();

            }, (err) => {
                console.log("Error: ", err);
            });

        })
    }


}
