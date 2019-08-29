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

    // Defines the fields that define the plant forms
    public plantFields =  [

        {
            type: "section",
            label: "identity",
        },
        {
            type: "text",
            label: "common name",
            model: "name"
        },
        {
            type: "text",
            label: "scientific name",
            model: "scientificName"
        },
        {
            type: "text",
            label: "other common names",
            model: "aka"
        },
        {
            type: "image",
            label: "image",
            model: "image"
        },
        {
            type: "textarea",
            label: "summary",
            model: "summary"
        },
        {
            type: "select",
            label: "growth habit",
            options: ["perennial", "annual"],
            model: "growthHabit"
        },

        {
            type: "subsection",
            label: "habitat"
        },
        
        {
            type: "number",
            label: "hardiness zone min",
            min: 0,
            max: 12,
            model: "hardinessZoneMin"
        },
        {
            type: "number",
            label: "hardiness zone max",
            min: 0,
            max: 12,
            model: "hardinessZoneMax"
        },

        {
            type: "text",
            label: "regions",
            model: "regions"
        },
        {
            type: "text",
            label: "habitat",
            model: "habitat"
        },

        {
            type: "subsection",
            label: "description"
        },
        {
            type: "textarea",
            label: "description",
            model: "general"
        },
        {
            type: "text",
            label: "leaf shape",
            model: "leafShape"
        },
        {
            type: "text",
            label: "leaf color",
            model: "leafColor"
        },
        {
            type: "select",
            label: "leaf habit",
            options: ['deciduous', 'evergreen'],
            model: "leafHabit"
        },

        {
            type: "text",
            label: "flowers",
            model: "flowers"
        },
        {
            type: "text",
            label: "seeds",
            model: "seeds"
        },
        {
            type: "select",
            label: "profile",
            options: ['shrub', 'tree', 'groundcover', 'vine', 'small straight-stem'],
            model: "profile"
        },

        {
            type: "section",
            label: "uses"
        },

        {
            type: "subsection",
            label: "edibility"
        },
        {
            type: "boolean",
            label: "Is it edible?",
            default: false,
            model: "edibility"
        },
        {
            type: "textarea",
            label: "edibility notes",
            model: "edibilityNotes"
        },

        {
            type: "subsection",
            label: "wildcraft",
        },
        {
            type: "boolean",
            label: "Is it useful for wildcrafting?",
            default: false,
            model: "wildcrafting"
        },
        {
            type: "textarea",
            label: "wildcrafting notes",
            model: "wildcraftingNotes"
        },

        {
            type: "subsection",
            label: "medicinal"
        },
        {
            type: "boolean",
            label: "Does it have medicinal value?",
            default: false,
            model: "medicinal"
        },
        {
            type: "textarea",
            label: "medicinal notes",
            model: "medicinalNotes"
        },

        {
            type: "subsection",
            label: "agricultural"
        },
        {
            type: "boolean",
            label: "Does it have agricultural value?",
            default: false,
            model: "agricultural"
        },
        {
            type: "textarea",
            label: "agricultural notes",
            model: "agriculturalNotes"
        },

        {
            type: "subsection",
            label: "animal habitat"
        },
        {
            type: "boolean",
            label: "Does it provide animal habitat?",
            default: false,
            model: "animalHabitat"
        },
        {
            type: "textarea",
            label: "animal habitat notes",
            model: "animalHabitatNotes"
        },


        {
            type: "section",
            label: "care"
        },
        {
            type: "text",
            label: "planting schedule",
            model: "plantingSchedule"
        },
        {
            type: "number",
            label: "days to maturity",
            model: "daysToMaturity"
        },
        {
            type: "textarea",
            label: "caring instructions",
            model: "description"
        },
        {
            type: "textarea",
            label: "germination instructions",
            model: "germination"
        },
        {
            type: "number",
            min: 0,
            max: 10,
            label: "soil PH",
            model: "soilPh"
        },
        {
            type: "textarea",
            label: "nutrition requirements",
            model: "nutrition"
        },
        {
            type: "select",
            label: "light requirements",
            options: ['shade', 'low light', 'partial sun', 'full sun'],
            model: "light"
        },
        {
            type: "select",
            label: "moisture requirements",
            options: ['drought tolerant', 'low moisture', 'high moisture', 'wet feet'],
            model: "moisture"
        },


        {
            type: "section",
            label: "warnings"
        },
        {
            type: "boolean",
            label: "poisonous",
            default: false,
            model: "poisonous"
        },
        {
            type: "boolean",
            label: "invasive",
            default: false,
            model: "invasive"
        },
        {
            type: "boolean",
            label: "allelopathic",
            default: false,
            model: "allelopathic"
        },


        {
            type: "section",
            label: "references"
        },
        {
            type: "text",
            label: "references and sources",
            model: "references"
        }

    ]


}
