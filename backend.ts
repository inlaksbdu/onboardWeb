import { defineBackend } from '@aws-amplify/backend';
import { Policy, PolicyStatement } from 'aws-cdk-lib/aws-iam';

const backend = defineBackend();

const livenessStack = backend.createStack("liveness-stack");

const livenessPolicy = new Policy(livenessStack, "LivenessPolicy", {
  statements: [
    new PolicyStatement({
      actions: [
        "rekognition:CreateFaceLivenessSession",
        "rekognition:GetFaceLivenessSessionResults"
      ],
      resources: ["*"],
    }),
  ],
});

backend.auth.resources.unauthenticatedUserIamRole.attachInlinePolicy(livenessPolicy);
backend.auth.resources.authenticatedUserIamRole.attachInlinePolicy(livenessPolicy);

export const handler = backend.export();