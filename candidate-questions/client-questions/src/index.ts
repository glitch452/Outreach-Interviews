import express from 'express';
import bodyParser from 'express';
import {ITranslate, Translation} from './translate/google-translate';
const app = express();
const port = 8080; // default port to listen

// Activate json support for the POST request data
app.use(express.json());

// define a route handler for the default home page
app.get( '/', async ( resp: any, res: any ) => {
    const translateInterface: ITranslate = {
        source: 'Where are the bathrooms?',
        target: 'fr'
    };
    try {
        const response: [string, any] = await Translation.translate(translateInterface);
        res.send( response[0] );
    } catch (e) {
        res.send( 'Translation.translate Error: ' + e );
    }

} );

app.post( '/', async ( resp: any, res: any ) => {
    // Store the POST input variables
    const convert: [string] = resp.body.convert;
    const destinationLang: string = resp.body.destinationLang;

    // Check to make sure a destination language string is provided
    if (!destinationLang || destinationLang.length < 2) {
        res.send(undefined);
    }

    // Check to make sure at least one string is provided for conversion
    if (!convert || convert.length < 1) {
        res.send(undefined);
    }

    // Setup some variables to be used
    const translateArr: ITranslate[] = [];

    // Iterate over the requested strings and create an array of ITranslate objects
    for (const i in convert) {
        if (convert.hasOwnProperty(i)) {
            const item: ITranslate = {
                source: convert[i],
                target: destinationLang
            };
            translateArr.push(item);
        }
    }

    const out: [string, any] = await Translation.translateArray(translateArr);
    const results = out[1];

    results.sort();

    res.send( results );
} );

// start the Express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );
