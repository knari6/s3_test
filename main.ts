import { S3, S3Config } from "./s3";
import dotenv from "dotenv";

dotenv.config();

const s3Config: S3Config = {
  region: "ap-northeast-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    sessionToken: process.env.AWS_SESSION_TOKEN as string,
  },
};

export const s3 = new S3(s3Config);

export async function execute() {
  const response = await s3.uploadObject({
    s3Bucket: "narimatsu-my-bucket",
    s3Key: "test-key",
    body: "Hello, world!",
    contentType: "text/plain",
  });
  console.log(response);

  const fetchObjectResponse = await s3.fetchObject({
    s3Bucket: "narimatsu-my-bucket",
    s3Key: "test-key",
  });
  console.log(fetchObjectResponse);
}

if (require.main === module) {
  execute();
}
