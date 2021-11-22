import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { BlobServiceClient } from "@azure/storage-blob";
import { v4 as uuidv4 } from "uuid";

interface HttpResponse {
  status: number;
  headers?: { [name: string]: string };
  body?: unknown;
}

interface Image {
  id: string;
  uri: string;
}

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<HttpResponse> {
  context.log("HTTP trigger function processed a request.");

  if (req.headers["content-type"] !== "application/octet-stream") {
    const response: HttpResponse = {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
      body: { error: "Content-Type should be application/octet-stream" },
    };
    context.log("Bad content-type", req.headers["content-type"]);
    return response;
  }

  const blobServiceClient = BlobServiceClient.fromConnectionString(
    process.env.IMAGE_STORAGE_ACCOUNT_CONNECTION_STRING
  );

  const containerName = "images";
  const containerClient = blobServiceClient.getContainerClient(containerName);

  const imageId = uuidv4();
  const imagePath = imageId + ".png";
  const blockBlobClient = containerClient.getBlockBlobClient(imagePath);

  await blockBlobClient.upload(req.body, req.body.length);
  context.log("Successfully uploaded image", imageId);

  const image: Image = {
    id: imageId,
    uri: blockBlobClient.url,
  };
  context.bindings.outputImageDocument = image;
  context.bindings.outputMessage = image;

  const response: HttpResponse = {
    status: 201,
    headers: {
      "Content-Type": "application/json",
    },
    body: image,
  };
  return response;
};

export default httpTrigger;
