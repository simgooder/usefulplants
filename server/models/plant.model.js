const mongoose = require('mongoose');

const PlantSchema = new mongoose.Schema({

    createdAt: {
        type: Date,
        default: Date.now
    },

    updatedAt: {
        type: Date,
        default: Date.now
    },

    identity: {

        name: String,
    
        scientificName: String,
        
        aka: String,
        
        images: String,
    
        summary: String,

        family: {

            primitiveVariety: {}, // The original parent

            parentVarieties: {}, //  Known parents

            childVarieties: {}, // Child varieties of the parent (landraces, crosses)

            siblingVarieties: {} // Related varities that aren't parent nor child

        },
    
        growthHabit: {
            type: String
        },
    
        habitat: {
            
            hardinessZoneMin: {
                type: Number,
                min: 0,
                max: 12
            },
            hardinessZoneMax: {
                type: Number,
                min: 0,
                max: 12
            },


            regions: String,

            habitat: String
        },
    
        description: {

            general: String,
    
            leaves: String,
    
            flowers: String,
    
            seeds: String,
    
            profile: {
                type: String,
                default: undefined
            }
        }
    
    },

    uses: {

        edible: {
            potential: Boolean,
            notes: String
        },
    
        wildcraft: {
            potential: Boolean,
            notes: String
        },
        
        medicinal: {
            potential: Boolean,
            notes: String
        },
    
        agricultural: {
            potential: Boolean,
            notes: String
        },
    
        ecological: {
            potential: Boolean,
            notes: String
        }
    
    },

    care: {

        plantingSchedule: String,
    
        daysToMaturity: Number,
    
        instructions: String,
    
        germination: String,
    
        soilPH: {
            type: Number,
            min: 0,
            max: 10
        },

        nutrition: String, 
    
        light: {
            type: String
        },
    
        moisture: {
            type: String
        }
    
    },

    warnings: {

        poisonous: Boolean,

        invasive: Boolean,

        allelopathic: Boolean
    
    },

    related: {

        companions: [] // plants that are beneficial when planted together

    },

    references: String


}, {
  versionKey: false
});


module.exports = mongoose.model('Plant', PlantSchema);
