import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ToastService } from '../shared/toast/toast.service';

@Injectable({
    providedIn: 'root'
})
export class WikipediaService {

    constructor(
        private http : HttpClient,
        private toast : ToastService    
    ) { }


    search(query: string): Observable<any> {

        return Observable.create(observer => {

            this.http.get("/api/wiki/q/" + query)
            .subscribe( (data: any) => {

                observer.next(data);
                observer.complete();

            }, (err) => {
                
                this.toast.show(2, "Couldn't reach Wikipedia. Sorry!", 0)
                console.log("Error: ", err);

            });
        })
        
    }

    getDb(letter: string): Observable<any> {

        return Observable.create(observer => {

            this.http.get("/api/wiki/pfaf/" + letter)
            .subscribe( (data: any) => {

                observer.next(data);
                observer.complete();

            }, (err) => {
                
                this.toast.show(2, "Couldn't get the PFAF database for " + letter + ".", 0)
                console.log("Error: ", err);

            });
        })
        
    }

}
