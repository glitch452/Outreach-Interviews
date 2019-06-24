import { Translate } from '@google-cloud/translate';
import * as dotenv from 'dotenv';

export interface ITranslate {
    source: string;
    target: string;
}

/**
 * Class used as a helper to perform translations
 */
export class Translation {
    /**
     * Function used to perform a translation
     * @param input ITranslate interface used to perform a translation
     */
    public static async translate(input: ITranslate): Promise<[string, any]> {

        if (input &&
            input.source && input.target) {
            // Read in the .env file and process the variables
            dotenv.config();

            const apiKey = `${process.env.TRANSLATE_API}`;

            if (!apiKey) {
                throw Error('No configured API key');
            }

            const translateObj = new Translate({
                key: apiKey
            });
            // The text to translate
            const text = input.source;
            // The target language
            const target = input.target;
            return await translateObj.translate(text, target);
        }

        return [undefined, {}];
    }

    /**
     * Function used to handle a an array of strings to be translated
     * @param input ITranslate[] interface used to perform a translation
     */
     public static async translateArray(input: ITranslate[]): Promise<[string, any]> {
        if (undefined === input) { return [undefined, undefined]; }
        let response: [string, any];
        const results = [];
        // Iterate over the requested strings and try to convert them
        for (const i in input) {
            if (input.hasOwnProperty(i)) {
                try {
                    response = await this.translate(input[i]);
                    results.push(response[0]);
                } catch (e) {
                    // If there is an error, return the original string
                    response.push(input[i]);
                }
            }
        }
        return [undefined, results];
     }

}
