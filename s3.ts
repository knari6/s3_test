import {
  GetObjectCommand,
  S3Client,
  PutObjectCommand,
  PutObjectCommandOutput,
} from "@aws-sdk/client-s3";
import { Readable } from "stream";

/**
 * S3アクセス情報
 */
export interface S3Config {
  /** リージョン(指定がない場合はap-northeast-1) */
  region?: string;
  /** クレデンシャル */
  credentials?: {
    accessKeyId: string;
    secretAccessKey: string;
    sessionToken?: string;
  };
}

/**
 * バケットからオブジェクトを取得する条件
 */
export interface FetchObjectCriteria {
  /** バケット名 */
  s3Bucket: string;
  /** キー */
  s3Key: string;
}

export class S3 {
  private readonly client: S3Client;

  public constructor(config?: S3Config | S3Client) {
    this.client = new S3Client({ region: "ap-northeast-1", ...config });
  }

  /**
   * S3から対象オブジェクトを取得
   * @param {FetchObjectCriteria} criteria 取得条件
   * @returns 取得したオブジェクトのバッファ
   */
  public async fetchObject({
    s3Bucket,
    s3Key,
  }: FetchObjectCriteria): Promise<string> {
    await this.client.send(
      new GetObjectCommand({
        Bucket: s3Bucket,
        Key: s3Key,
      })
    );

    return "download finished";
  }

  /**
   * S3にオブジェクトをアップロード
   * @param param
   */
  public async uploadObject({
    s3Bucket,
    s3Key,
    body,
    contentType,
  }: {
    s3Bucket: string;
    s3Key: string;
    body: string | Uint8Array | Buffer | Readable;
    contentType: string;
  }): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: s3Bucket,
      Key: s3Key,
      Body: body,
      ContentType: contentType,
      ContentEncoding: "utf-16le",
      Expires: new Date(Date.now() + 5 * 60 * 1000),
    });
    await this.client.send(command);
    return "upload finished";
  }
}
