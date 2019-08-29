const express = require('express');
const https = require('https');

const router = express.Router();
module.exports = router;

const wiki = require('wikijs');


let data = {};
let i = 1;


router.get('/q/:id', function(req, res, next) {

    data = {};
    i = 1;

    wiki().page(req.params.id)
        .then( page => {
        
        page.categories().then(x => {

            // We filter the queries via `categories` and try to ensure they're plant-related 
            for (let index = 0; index < x.length; index++) {

                const el = x[index];

                let match = el.toLowerCase();


                // If the query returns a disambiguation - it's not specific enough
                if ( match.includes("disambiguation") ) {
                    
                    data.message = "Specificity required";
                    i++;
                    break;

                } 
                // Ensure the query is a plant...
                else if ( match.includes("flora") || match.includes("plant") || match.includes("crops") || match.includes("carl linnaeus") || match.includes("plants") ) {

                    data.message = "Success";
                    i++;
                    break;

                }
                else {
                // Probably not a plant
                    data.message = "Not a plant";
                    i++;

                }
                
            }

            i++;


        }, (error) => {
            console.log("ERROR ==> ", error)
        })

        page.content().then(x => {

            // loop through content to get `description`
            for (let index = 0; index < x.length; index++) {

                const el = x[index];

                if (el.title === 'Description') {

                    data.description = el.content;
                    i++;
                    break;

                } else if (index === x.length) {
                    // No description found on last loop...
                    i++;
                }
    
            }

        }, (error) => {
            console.log("ERROR ==> ", error)
        })

        page.fullInfo().then(x => {

            let genus = x.general.genus;
            let species = x.general.species;

            data.scientificName = genus + " " + species;

            i++;

        }, (error) => {
            console.log("ERROR ==> ", error)
        })

        page.mainImage().then(x => {

            data.image = x;
            i++;
    
        }, (error) => {
            console.log("ERROR ==> ", error)
        })
    
        page.summary().then(x => { 
    
            data.summary = x;
            i++;
    
        }, (error) => {
            console.log("ERROR ==> ", error)
        })
    
        // Set all the raw data...  
        data.references = page.raw.canonicalurl;

        sendRes();

        // Wait for response... 
        // ... once all data is in, send response!
        function sendRes() {

            // We're waiting for a bunch of responses! (4)
            if (i >= 6) {

                res.send(data)

            } else {
                setTimeout(sendRes, 500);
            }

        }


    }, (error) => { res.error(error) } )

});



// Get all plants
router.get('/pfaf/:id', function(req, res, next) {

    let url = "https://www.ibiblio.org/pfaf/database/common" + req.params.id.toUpperCase() + ".html"

    https.get(url, (res) => {

        const { statusCode } = res;

        let data;

        let error;
        
        if (statusCode !== 200) {
            error = new Error('Request Failed.\n' +
                            `Status Code: ${statusCode}`);
        } 
        if (error) {
            console.error(error.message);
            // Consume response data to free up memory
            res.resume();
            return;
        }

        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => { rawData += chunk; });
        res.on('end', () => {

            try {

                // This HTML is specific to the page... (this is how we extract it)
                data = rawData.match(/(?<=CAN=COMIND">\s*).*?(?=\s*\<\/a)/gs);

                sendRes(data);

                // console.log("DATA========> ", data)

            } catch (e) {
                console.error(e.message);
            }

        });

    }).on('error', (e) => {
        console.error(`Got error: ${e.message}`);
    });


    function sendRes(d) {

        if (d !== undefined) {

            res.send(d)

        }

    }

});



