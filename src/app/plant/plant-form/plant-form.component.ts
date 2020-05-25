import { Component, OnInit, Input, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { PlantService } from '../plant-api.service'
import { Router } from '@angular/router';
import { WikipediaService } from '../wikipedia.service';
import { ToastService } from '../../shared/toast/toast.service';

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
    public name:String;
    public scientificName:String;
    public genus:String;
    public species:String;
    public aka:any;
    public image:any;
    public summary:any;
    public growthHabit:any;

    // habitat
    public hardinessZoneMin:any;
    public hardinessZoneMax:any;
    public regions:any;
    public habitat:any;

    // description
    public generalDescription:any;
    public leafNotes:any;
    public leafImage:any;
    public flowerNotes:any;
    public flowerImage:any;
    public fruitNotes:any;
    public fruitImage:any;
    public seedNotes:any;
    public seedImage:any;
    public rootNotes:any;
    public rootImage:any;
    public stalkNotes:any;
    public stalkImage:any;
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

    public edible:boolean;
    public edibleNotes:string;
    public wildcraft:boolean;
    public wildcraftNotes:string;
    public medicinal:boolean;
    public medicinalNotes:string;
    public agricultural:boolean;
    public agriculturalNotes:string;
    public ecologicalNiche:boolean;
    public ecologicalNotes:string;


    constructor(
        private plantService : PlantService, 
        private router: Router,
        private Wikipedia: WikipediaService,
        private toast: ToastService
    ) {}

    ngOnInit() {
        // this.fetchDatabase("a");
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

            name: val.name,
            scientificName: val.scientificName,
            genus: val.genus,
            species: val.species,
            aka: val.aka,
            images: this.checkArray(val.image),
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

                leaf: {
                    notes: val.leafNotes,
                    images: this.checkArray(val.leafImage)
                }, 
                flower: {
                    notes: val.flowerNotes,
                    images: this.checkArray(val.flowerImage)
                }, 
                seed: {
                    notes: val.seedNotes,
                    images: this.checkArray(val.seedImage)
                }, 
                fruit: {
                    notes: val.fruitNotes,
                    images: this.checkArray(val.fruitImage)
                }, 
                root: {
                    notes: val.rootNotes,
                    images: this.checkArray(val.rootImage)
                }, 
                stalk: {
                    notes: val.stalkNotes,
                    images: this.checkArray(val.stalkImage)
                },
                profile: val.profile
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
                    niche: val.ecologicalNiche,
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
        this.name = plant.name ? plant.name : "";
        this.scientificName = plant.scientificName ? plant.scientificName : "";
        this.genus = plant.genus ? plant.genus : "";
        this.species = plant.species ? plant.species : "";
        this.aka = plant.aka ? plant.aka : "";
        this.image = plant.images ? this.checkArray(plant.images) : "";
        this.summary = plant.summary ? plant.summary : "";
        this.growthHabit = plant.growthHabit ? plant.growthHabit : "";

        // habitat
        this.hardinessZoneMin = plant.habitat.hardinessZoneMin ? plant.habitat.hardinessZoneMin : "";
        this.hardinessZoneMax = plant.habitat.hardinessZoneMax ? plant.habitat.hardinessZoneMax : "";
        this.regions = plant.habitat.regions ? plant.habitat.regions : "";
        this.habitat = plant.habitat.habitat ? plant.habitat.habitat : "";
        
        // description
        this.generalDescription = plant.description ? plant.description.general : "";
        this.leafNotes   = plant.description ? plant.description.leaf.notes : "";
        this.leafImage   = plant.description ? this.checkArray(plant.description.leaf.images) : "";
        this.flowerNotes = plant.description ? plant.description.flower.notes : "";
        this.flowerImage = plant.description ? this.checkArray(plant.description.flower.images) : "";
        this.seedNotes   = plant.description ? plant.description.seed.notes : "";
        this.seedImage   = plant.description ? this.checkArray(plant.description.seed.images) : "";
        this.fruitNotes  = plant.description ? plant.description.fruit.notes : "";
        this.fruitImage  = plant.description ? this.checkArray(plant.description.fruit.images) : "";
        this.rootNotes   = plant.description ? plant.description.root.notes : "";
        this.rootImage   = plant.description ? this.checkArray(plant.description.root.images) : "";
        this.stalkNotes  = plant.description ? plant.description.stalk.notes : "";
        this.stalkImage  = plant.description ? this.checkArray(plant.description.stalk.images) : "";
        this.profile     = plant.description ? plant.description.profile : "";

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
        this.ecologicalNiche = plant.uses.ecological ? plant.uses.ecological.niche : "";
        this.ecologicalNotes = plant.uses.ecological ? plant.uses.ecological.notes : "";

    }

  
    // Search plant on Wikipedia and populate form
    lookUpPlant(name, scientificName) {

        this.loadingWiki = true;

        let q = name.value || scientificName.value;

        if (q === undefined) {
            q = name || scientificName;
        }

        this.Wikipedia.search(q).subscribe((res) => {

            if (res.message === "Success") {
                
                this.toast.show(1, "We found some info about " + q + " and added it to the form.", 4000)

                if (name.value === undefined) {
                    this.name = q;
                }

                this.scientificName = res.scientificName;
                this.genus = res.genus;
                this.species = res.species;
                this.summary = res.summary;
                this.image = res.image;
                this.references = res.references;
                this.generalDescription = res.description;

            } else if (res.message === "Specificity required") {
                
                this.toast.show(0, "You'll need to be more specific with your search.", 0);

            } else if (res.message === "Not a plant") {

                this.toast.show(0, "Couldn't find a plant matching this name.", 0);

            } else if (res.error) {
                this.toast.show(0, "Error: " + res.error, 0)
            }

            this.loadingWiki = false;

            console.log("Wikipedia plant-fetch success ", res)


        }, (err) => {

            this.loadingWiki = false;

            console.log("Wikipedia plant-fetch error: ", err);

        });

    }

    checkArray(x) {

        console.log("Checking arrays...");

        if (x !== undefined && x.length !== 0) {

            if ( x[0].includes(',') ) {

                return x[0].split(',');
            
            } else {
            
                return x;
            
            }
        } else {
            return;
        }

    }


    // fetchDatabase(letter) {

    //     this.Wikipedia.getDb(letter).subscribe( (res) => {

    //         // TODO:::
    //         // 1. Loop through response...
    //         // 2. Run lookUpPlant(plantName)
    //         // 3a. If exists, fill in fields and SAVE
    //         // 3b. If doesn't exist, go on to next! 

    //         // Set index incrementor
    //         // Get length of array (list of plants from DB)
    //         // LOOK UP PLANT
    //         // when promise is finished, increment the index,
    //         // and make the call again ( lookUpAndSavePlant() )

    //         let l = res.length;
    //         let ix = 0;


    //     }, (err) => {
    //         console.log("PFAF fetch error: ", err)
    //     });

    // }

}
