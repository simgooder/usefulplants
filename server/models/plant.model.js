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

    createdBy: {
        user: String,
        date: {
            type: Date,
            default: Date.now
        }
    },

    name: { 
        type: String
    },

    scientificName: { 
        type: String
    },

    genus: {
        type: String
    },

    species: {
        type: String
    },
    
    aka: { 
        type: String
    },
    
    images: [String],

    summary: { 
        type: String
    },

    // family: {

    //     primitiveVariety: {}, // The original parent

    //     parentVarieties: {}, //  Known parents

    //     childVarieties: {}, // Child varieties of the parent (landraces, crosses)

    //     siblingVarieties: {} // Related varities that aren't parent nor child

    // },

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

        habitat: [String]
    },

    description: {

        general: {
            type: String,
        },

        leaf: {
            notes: String,
            images: [String]
        },

        flower: {
            notes: String,
            images: [String]
        },

        seed: {
            notes: String,
            images: [String]
        },

        fruit: {
            notes: String,
            images: [String]
        },

        root: {
            notes: String,
            images: [String]
        },

        stalk: {
            notes: String,
            images: [String]
        },

        profile: String
    },

    uses: {

        edible: {
            potential: Boolean,
            notes: String,
            source: String
        },
    
        wildcraft: {
            potential: Boolean,
            notes: String,
            source: String
        },
        
        medicinal: {
            potential: Boolean,
            notes: String,
            source: String
        },
    
        agricultural: {
            potential: Boolean,
            notes: String,
            source: String
        },
    
        ecological: {
            niche: [String],
            notes: String,
            source: String
        }
    
    },

    care: {

        plantingSchedule: { 
            type: String,
            default: ""
        },
    
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

        wildCompanions: [ObjectId], 
        domesticCompanions: [ObjectId] // plants that are beneficial when planted together

    },

    references: [String]


}, {
  versionKey: true
});

// PlantSchema.set('autoIndex', false);
PlantSchema.index([
    {"name": "text"},
    {"scientificName": "text"},
    {"genus": "text"},
    {"species": "text"},
    {"summary": "text"},
    {"aka": "text"},
    {"growthHabit": "text"},
    {"description.general": "text"},
    {"description.profile": "text"},
    {"uses.ecological.niche": "text"},
    {"habitat.habitat": "text"}
], {name: "baseIndex"})

module.exports = mongoose.model('Plant', PlantSchema);

