
import { CohereClient } from "cohere-ai";
export default async function generate(userPrompt) {
    const cohere = new CohereClient({
        token: "tqkSCR8CxE5MOFqX3wQcDYcqTpjennDR9h20qns8",
    });
    let prediction = "Hello";
    (async () => {
         prediction = await cohere.generate({
            prompt: userPrompt,
            maxTokens: 1000,
        })[prompt];

        
        console.log("Received prediction", prediction);
    })();
    return prediction;
}


