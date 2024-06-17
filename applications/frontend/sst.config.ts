import { HostedZone } from "aws-cdk-lib/aws-route53";
import { SSTConfig } from "sst";
import { Bucket, NextjsSite } from "sst/constructs";
import {
  Certificate,
  CertificateValidation,
} from "aws-cdk-lib/aws-certificatemanager";

const ROOT_DOMAIN_NAME = "learnwithkru.com";

export default {
  config(_input) {
    return {
      name: "kru-frontend",
      region: "us-east-1",
    };
  },
  stacks(app) {
    // A STACK TO DEPLOY NEXTJS TO AWS
    app.stack(function Site({ stack }) {
      // Manually specify hosted zone attributes
      const hostedZone = HostedZone.fromHostedZoneAttributes(
        stack,
        "HostedZone",
        {
          hostedZoneId: "Z10015382VXJ2G62QLX9",
          zoneName: ROOT_DOMAIN_NAME,
        }
      );

      console.log(
        `Hosted Zone ID: ${hostedZone.hostedZoneId}, Zone Name: ${hostedZone.zoneName}`
      );

      // CREATE A SSL CERTIFICATE LINKED TO THE HOSTED ZONE
      const certificate = new Certificate(stack, "Certificate", {
        domainName: ROOT_DOMAIN_NAME,
        validation: CertificateValidation.fromDns(hostedZone),
      });

      // CREATE THE S3 BUCKET
      const bucket = new Bucket(stack, "PublicBucket");

      // CREATE THE NEXTJS SITE
      const site = new NextjsSite(stack, "site", {
        customDomain: {
          domainName: ROOT_DOMAIN_NAME,
          domainAlias: `www.${ROOT_DOMAIN_NAME}`,
          cdk: {
            hostedZone,
            certificate,
          },
        },
        bind: [bucket],
      });

      // OUTPUT THE SITE URL
      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;
