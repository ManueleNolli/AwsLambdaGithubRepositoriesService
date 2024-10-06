import 'dotenv/config'

import {APIGatewayProxyEvent, Handler} from 'aws-lambda';
import {getRepositories} from "./services/github.js";


export const handler: Handler = async (event: APIGatewayProxyEvent, context) => {

    const afterCursor = event.queryStringParameters?.afterCursor || null
    const projectRepositoriesLength = parseInt(event.queryStringParameters?.projectRepositoriesLength || "4")

    try {
        const results = await getRepositories(afterCursor, projectRepositoriesLength)
        return {
            statusCode: 200,
            body: JSON.stringify(results),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({message: "Error during sending message, please try again"}),
        };
    }
};
