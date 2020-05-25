import { Component, OnInit, ViewChild, Input } from '@angular/core';

import { PlantService } from '../plant-api.service'

@Component({
    selector: 'app-plant-search',
    templateUrl: './plant-search.component.html',
    styleUrls: ['./plant-search.component.scss']
})
export class PlantSearchComponent implements OnInit {

    @ViewChild('searchInput') protected searchInput:any;
    @Input() private placeholder = "";

    constructor(
        private plantService : PlantService,
    ) { }

    private results:any;
    private loading = false;
    private active = false;
    private pageUrl = "";

    ngOnInit() {
    }

    search(q) {

        this.loading = true;
        
        this.plantService.search(q).subscribe((res) => {
            
            this.loading = false;
            this.results = res;
            this.active = true;
            
            this.pageUrl = "['/plants/', " + this.results[0]._id + ", " + this.results[0].scientificName.replace(" ", "_")+ "]";
            
        
        }, (err) => {
        
            console.log("Get plant Error: ", err);
        
        });

    }

    select(id) {
        
        this.results = [];
        this.searchInput.nativeElement.value = "";

        this.close();
    }

    close() {
        this.active = false;
    }

    onFocus() {
        if (this.searchInput.nativeElement.textLength > 0) {
            this.active = true;
        }
    }

}
