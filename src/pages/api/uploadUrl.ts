import type { NextApiRequest, NextApiResponse } from "next";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
// import { getCallerIdentity } from "iac-lib";

const s3 = new S3Client({});

const bucketName = process.env.NEXT_PUBLIC_UPLOAD_BUCKET_NAME;
const region = process.env.NEXT_PUBLIC_REGION;

export default async function uploadUrl(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { Key, ContentType } = req.body;

    const command = new PutObjectCommand({
      ACL: "public-read",
      Key,
      ContentType,
      Bucket: bucketName,
    });

    const url = await getSignedUrl(s3, command);

    // console.log(`Created signed upload URL for ${Key} of ${ContentType} to ${bucketName}`);

    res.status(200).json({ url });
  } catch (e) {
    console.log(e);
    res.status(500);
  }
}
