import {
    CognitoIdentityClient,
    ListIdentityPoolsCommand,
} from '@aws-sdk/client-cognito-identity';
import {
    CognitoIdentityProviderClient,
    ListUserPoolsCommand,
    ListUserPoolClientsCommand,
    AdminCreateUserCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import { STSClient, GetCallerIdentityCommand } from '@aws-sdk/client-sts';


const REGION = process.env.AWS_REGION || 'us-east-2';

const idApi = new CognitoIdentityClient({ region: REGION });
const provApi = new CognitoIdentityProviderClient({ region: REGION });

export const findUserPool = async (name: string): Promise<string> => {
    //try {
    const command = new ListUserPoolsCommand({ MaxResults: 10 });
    const response = await provApi.send(command);
    if (response.UserPools) {
        const pool = response.UserPools.find((up) => up.Name === name);
        if (pool && pool.Id) return pool.Id;
    }
    throw new Error(`Could not pool named ${name}`);
    //} catch (e) {
    //    console.log('Error retreiving user pool ID: ', e);
    //}
    //return null;
};

export const findIdentityPoolId = async (idPoolName: string) => {
    try {
        const command = new ListIdentityPoolsCommand({ MaxResults: 50 });
        const response = await idApi.send(command);
        if (response.IdentityPools) {
            const pool = response.IdentityPools.find(
                (ip) => ip.IdentityPoolName === idPoolName
            );
            if (pool && pool.IdentityPoolId) return pool.IdentityPoolId;
        }
    } catch (e) {
        console.log('Error retreiving identity pool ID: ', e);
    }
    return null;
};

export const findUserPoolClient = async (poolId: string, appName: string) => {
    try {
        const command = new ListUserPoolClientsCommand({ UserPoolId: poolId });
        const response = await provApi.send(command);
        // -const clients = response.UserPoolClients.reduce((a, cl) => ((a[cl.ClientName] = cl.ClientId), a), {});
        if (response.UserPoolClients) {
            const client = response.UserPoolClients.find(
                (cl: any) => cl.ClientName === appName
            );
            if (client && client.ClientId) return client.ClientId;
        }
    } catch (e) {
        console.log('Error retreiving user pool client ID: ', e);
    }
    return null;
};

export const getCallerIdentity = async () => {
    const client = new STSClient({});
    const response = await client.send(new GetCallerIdentityCommand({}));
    return {
        region: REGION,
        Account: response.Account,
        UserId: response.UserId,
        Arn: response.Arn,
    };
}

export const loadConfig = async (userPoolName: string, identityPoolName: string, clientName: string) => {
    const user_pool_id = await findUserPool(userPoolName);
    const identity_pool_id = await findIdentityPoolId(identityPoolName);
    const client_id = await findUserPoolClient(user_pool_id, clientName);
    return { identity_pool_id, user_pool_id, client_id };
}

export async function makeUser(UserPoolId: string, Username: string, password: string) {
    const client = new CognitoIdentityProviderClient({ region: REGION });
    const input = {
        UserPoolId,
        Username,
        UserAttributes: [{ Name: "email", Value: Username, },],
        // ValidationData: [{ Name: "STRING_VALUE", Value: "STRING_VALUE" }],
        TemporaryPassword: password,
        ForceAliasCreation: true,
        MessageAction: "SUPPRESS",
        DesiredDeliveryMediums: ["EMAIL"],
    };

    const command = new AdminCreateUserCommand(input);
    const response = await client.send(command);
}
