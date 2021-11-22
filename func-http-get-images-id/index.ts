import { AzureFunction, Context, HttpRequest } from "@azure/functions";

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
  req: HttpRequest,
  image: Image[]
): Promise<HttpResponse> {
  context.log("HTTP trigger function processed a request.");
  context.log(image);

  if (image === undefined || image.length === 0) {
    const response: HttpResponse = {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
      body: { error: "No image with that id was found" },
    };
    return response;
  }

  // const strippedImage: Image = {
  //   id: image.id,
  //   uri: image.uri,
  // };
  const response: HttpResponse = {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: image[0],
  };
  return response;
};

export default httpTrigger;
