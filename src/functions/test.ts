// import AWS from 'aws-sdk'
//import b64 from 'base64-js';
import { ApiHandler } from "sst/node/api";
//import { isTemplateExpression } from 'typescript';

export const handler = ApiHandler(async (event) => {

    console.log(`API Trigger: \n`, event);

});