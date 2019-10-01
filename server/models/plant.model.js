const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;

const PlantSchema = new mongoose.Schema({

    createdAt: {
        type: Date,
        default: Date.now
    },

    updatedAt: {
        type: Date,
        default: Date.now
    },

    updatedBy: [
        {
            user: String,
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],

    identity: {

        name: { 
            type: String
        },
    
        scientificName: { 
            type: String
        },
        
        aka: { 
            type: String
        },
        
        images: [String],
    
        summary: { 
            type: String
        },

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


            regions: {
                type: String,
                default: ""
            },

            habitat: String
        },
    
        description: {

            general: {
                type: String,
            },
    
            leaves: String,
    
            flowers: String,
    
            seeds: String,

            fruit: String,
    
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

        wildCompanions: [
            {
                id: ObjectId,
                name: String
            }
        ], // plants that are beneficial when planted together
        domesticCompanions: [
            {
                id: ObjectId,
                name: String
            }
        ]

    },

    references: [String]


}, {
  versionKey: false
});

// PlantSchema.set('autoIndex', false);
PlantSchema.index([
    {"identity.name": "text"},
    {"identity.scientificName": "text"},
    {"identity.summary": "text"},
    {"identity.aka": "text"},
    {"description.general": "text"}
], {name: "baseIndex"})

module.exports = mongoose.model('Plant', PlantSchema);

