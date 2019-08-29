import { Component, OnInit, Input, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { PlantService } from '../plant-api.service'
import { Router } from '@angular/router';
import { WikipediaService } from '../wikipedia.service';
import { ToastService } from '../../shared/toast/toast.service';
import { setTimeout } from 'timers';

@Component({
    selector: 'app-plant-form',
    templateUrl: './plant-form.component.html',
    styleUrls: ['./plant-form.component.scss']
})
export class PlantFormComponent implements OnInit {

    
    @Input() plant:any;
    @ViewChild('addPlantForm') protected addPlantForm:any;

    public loadingWiki = false;

    public formData: any;

    // The form controls...

    // identity
    public name:any;
    public scientificName:any;
    public aka:any;
    public image:any;
    public summary:any;
    public growthHabit:any;

    // identity.habitat
    public hardinessZoneMin:any;
    public hardinessZoneMax:any;
    public regions:any;
    public habitat:any;

    // identity.description
    public generalDescription:any;
    public leaves:any;
    public flowers:any;
    public seeds:any;
    public profile:any;

    public plantingSchedule:any;
    public daysToMaturity:any;
    public instructions:any;
    public germination:any;
    public soilPh:any;
    public nutrition:any;
    public light:any;
    public moisture:any;

    public references:any;

    public edible:any;
    public edibleNotes:any;
    public wildcraft:any;
    public wildcraftNotes:any;
    public medicinal:any;
    public medicinalNotes:any;
    public agricultural:any;
    public agriculturalNotes:any;
    public ecological:any;
    public ecologicalNotes:any;


    constructor(
        private plantService : PlantService, 
        private router: Router,
        private Wikipedia: WikipediaService,
        private toast: ToastService
    ) {}

    ngOnInit() {
        this.fetchDatabase("a");
    }

    ngOnChanges(changes: any) {

        // Looks like there's a plant! 
        if (this.plant !== undefined) {
            this.setFields(changes['plant'].currentValue);
        }

    }

    savePlant(form: NgForm) {
        
        let val = form.value;
        

        this.formData = {
            
            updatedAt: Date.now(),

            identity: {

                name: val.name,
                scientificName: val.scientificName,
                aka: val.aka,
                images: val.image,
                summary: val.summary,
                growthHabit: val.growthHabit,
                
                habitat: {
                    hardinessZoneMin: val.hardinessZoneMin,
                    hardinessZoneMax: val.hardinessZoneMax,
                    regions: val.regions,
                    habitat: val.habitat
                },

                description: {
                    general: val.generalDescription,
                    leaves: val.leaves,
                    flowers: val.flowers,
                    seeds: val.seeds,
                    profile: val.profile
                }

            },

            uses: {

                edible: {
                    potential: Boolean(val.edible),
                    notes: val.edibleNotes
                },
                wildcraft: {
                    potential: Boolean(val.wildcraft),
                    notes: val.wildcraftNotes
                },
                medicinal: {
                    potential: Boolean(val.medicinal),
                    notes: val.medicinalNotes
                },
                agricultural: {
                    potential: Boolean(val.agricultural),
                    notes: val.agriculturalNotes
                },
                ecological: {
                    potential: Boolean(val.ecological),
                    notes: val.ecologicalNotes
                }
            },

            care: {
                plantingSchedule: val.plantingSchedule,
                daysToMaturity: val.daysToMaturity,
                caringInstructions: val.instructions,
                germination: val.germination,
                soilPH: val.soilPh,
                nutrition: val.nutrition,
                light: val.light,
                moisture: val.moisture
            },

            warnings: {
                poisonous: Boolean(val.poisonous),
                invasive: Boolean(val.invasive),
                allelopathic: Boolean(val.allelopathic)
            },

            references: val.references

        }

        if (this.plant !== undefined) {

            // Edit form
            this.plantService.update(this.plant._id, this.formData).subscribe( (res) => {

                this.toast.show(1, this.name + " was updated.", 0);
                this.router.navigate(['/plants', this.plant._id]);

                console.log("Update success: ", res)

            }, (err) => {

                console.log("Update error: ", err)

            });

        } else {

            // Create form
            this.plantService.add(this.formData).subscribe((res) => {

                this.toast.show(1, "Successfully created " + this.name + ".", 0);

                let id = res['_id'];
                this.router.navigate(['/plants', id]);
    
                console.log("Add success: ", res)
    
            }, (err) => {
    
                console.log("Add error: ", err);
    
            });

        }

    }

    // Sets the fields if a plant is passed to the component...
    setFields(plant) {

        // identity
        this.name = plant.identity.name ? plant.identity.name : "";
        this.scientificName = plant.identity.scientificName ? plant.identity.scientificName : "";
        this.aka = plant.identity.aka ? plant.identity.aka : "";
        this.image = plant.identity.images ? plant.identity.images : "";
        this.summary = plant.identity.summary ? plant.identity.summary : "";
        this.growthHabit = plant.identity.growthHabit ? plant.identity.growthHabit : "";

        // identity.habitat
        this.hardinessZoneMin = plant.identity.habitat.hardinessZoneMin ? plant.identity.habitat.hardinessZoneMin : "";
        this.hardinessZoneMax = plant.identity.habitat.hardinessZoneMax ? plant.identity.habitat.hardinessZoneMax : "";
        this.regions = plant.identity.habitat.regions ? plant.identity.habitat.regions : "";
        this.habitat = plant.identity.habitat.habitat ? plant.identity.habitat.habitat : "";
        
        // identity.description
        this.generalDescription = plant.identity.description ? plant.identity.description.general : "";
        this.flowers = plant.identity.description ? plant.identity.description.flowers : "";
        this.seeds = plant.identity.description ? plant.identity.description.seeds : "";
        this.profile = plant.identity.description ? plant.identity.description.profile : "";
        this.leaves = plant.identity.description.leaves ? plant.identity.description.leaves : "";

        // care
        this.plantingSchedule = plant.care ? plant.care.plantingSchedule : "";
        this.daysToMaturity = plant.care ? plant.care.daysToMaturity : "";
        this.instructions = plant.care ? plant.care.caringInstructions : "";
        this.germination = plant.care ? plant.care.germination : "";
        this.soilPh = plant.care ? plant.care.soilPH : "";
        this.nutrition = plant.care ? plant.care.nutrition : "";
        this.light = plant.care ? plant.care.light : "";
        this.moisture = plant.care ? plant.care.moisture : "";

        // references
        this.references = plant.references ? plant.references : "";

        // uses
        this.edible = plant.uses.edible ? plant.uses.edible.potential : "";
        this.edibleNotes = plant.uses.edible ? plant.uses.edible.notes : "";
        this.wildcraft = plant.uses.wildcraft ? plant.uses.wildcraft.potential : "";
        this.wildcraftNotes = plant.uses.wildcraft ? plant.uses.wildcraft.notes : "";
        this.medicinal = plant.uses.medicinal ? plant.uses.medicinal.potential : "";
        this.medicinalNotes = plant.uses.medicinal ? plant.uses.medicinal.notes : "";
        this.agricultural = plant.uses.agricultural ? plant.uses.agricultural.potential : "";
        this.agriculturalNotes = plant.uses.agricultural ? plant.uses.agricultural.notes : "";
        this.ecological = plant.uses.ecological ? plant.uses.ecological.potential : "";
        this.ecologicalNotes = plant.uses.ecological ? plant.uses.ecological.notes : "";

    }

  
    lookUpPlant(plant) {

        this.loadingWiki = true;

        let q = plant.value;

        if (q === undefined) {
            q = plant;
        }

        this.Wikipedia.search(q).subscribe((res) => {

            console.log("MESSAGE: ", res.message)

            if (res.message === "Success") {
                
                this.toast.show(1, "We found some info about " + q + " and added it to the form.", 4000)

                if (plant.value === undefined) {
                    this.name = q;
                }

                this.scientificName = res.scientificName;
                this.summary = res.summary;
                this.image = res.image;
                this.references = res.references;
                this.generalDescription = res.description;

            } else if (res.message === "Specificity required") {
                
                this.toast.show(0, "You'll need to be more specific with you search term...", 0);

            } else if (res.message === "Not a plant") {

                this.toast.show(0, "Couldn't find a plant matching this name...", 0);

            }

            this.loadingWiki = false;

            console.log("Wikipedia plant-fetch success ", res)


        }, (err) => {

            this.loadingWiki = false;

            console.log("Wikipedia plant-fetch error: ", err);

        });

    }


    fetchDatabase(letter) {

        this.Wikipedia.getDb(letter).subscribe( (res) => {

            // TODO:::
            // 1. Loop through response...
            // 2. Run lookUpPlant(plantName)
            // 3a. If exists, fill in fields and SAVE
            // 3b. If doesn't exist, go on to next! 

            // Set index incrementor
            // Get length of array (list of plants from DB)
            // LOOK UP PLANT
            // when promise is finished, increment the index,
            // and make the call again ( lookUpAndSavePlant() )

            let l = res.length;
            let ix = 0;


        }, (err) => {
            console.log("PFAF fetch error: ", err)
        });

    }

}
