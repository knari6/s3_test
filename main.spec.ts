import { S3 } from "./s3";
import { mockClient } from "aws-sdk-client-mock";
import { execute } from "./main";
import { S3Client } from "@aws-sdk/client-s3";

const s3Client = mockClient(S3Client);

describe("test", () => {
  const uploadMock = vi
    .spyOn(S3.prototype, "uploadObject")
    .mockResolvedValue("upload finished");

  const fetchObjectMock = vi
    .spyOn(S3.prototype, "fetchObject")
    .mockResolvedValue("download finished");

  beforeEach(async () => {
    await execute();
  });
  it("should test", () => {
    expect(uploadMock).toHaveBeenCalled();
    expect(fetchObjectMock).toHaveBeenCalled();
  });
});
