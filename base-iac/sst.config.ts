import { Fn, RemovalPolicy, aws_s3 as S3 } from "aws-cdk-lib";
import { UserPool, UserPoolClient } from "aws-cdk-lib/aws-cognito";
import kms from "aws-cdk-lib/aws-kms";

import { Api, App, Bucket, Cognito, NextjsSite, Stack } from "sst/constructs";

const TEST = {
  mongoUrl: "mongodb+srv://paxiv-db-user:NMwzebW2UHersNAm@cluster0.hovzu.mongodb.net/?retryWrites=true&w=majority",
  deleteProtect: false,
};
const PROD = {
  mongoUrl: "mongodb+srv://paxiv-db-live:ZOGV4WXWr2uo9nJo@paxivcluster.fohvcsk.mongodb.net/?retryWrites=true&w=majority",
  deleteProtect: true,
};


export default {
  config() {
    return {
      name: "paxiv-site-base",
      region: "us-east-2"
    }
  },
  async stacks(app: App) {

    const { mongoUrl, deleteProtect } = app.stage === "prod" ? PROD : TEST;

    /*************************************************/
    // Auth Stack
    /*************************************************/
    const authStack = new Stack(app, 'paxiv-base-stack', {});

    const masterKey = new kms.Key(authStack, 'SenderKey', { description: `PAXIV Cognito Sender Key` });
    const keyRef = kms.Key.fromKeyArn(authStack, 'KeyRef', masterKey.keyArn);

    const cognito = new Cognito(authStack, `paxiv-auth-${app.stage}`, {
      login: ['email', 'phone', "username", "preferredUsername"],
      cdk: {
        id: `us-east-2_paxiv${app.stage}`,
        userPool: {

          customSenderKmsKey: keyRef,
          selfSignUpEnabled: true,
          signInCaseSensitive: false,
          deletionProtection: deleteProtect,
        },
      },
      defaults: {
        function: {
          timeout: 20,
          environment: {
            CONNECTION_STRING: mongoUrl,
            SCHEMA: 'paxiv'
          },
        }
      },
      triggers: {
        customEmailSender: "../lambdas/cognito-email-sender/cognito-email-sender.handler",
      },
    });

    const uploads = new Bucket(authStack, "uploads", {
      name: `paxiv-uploads-${app.stage}`,
      cdk: deleteProtect ? {} : {
        bucket: {
          autoDeleteObjects: true,
          removalPolicy: RemovalPolicy.DESTROY,
        },
      },
    });

  }
}
