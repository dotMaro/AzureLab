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
  images: Image[]
): Promise<HttpResponse> {
  context.log("HTTP trigger function processed a request.");

  const response: HttpResponse = {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: images,
  };
  return response;
};

export default httpTrigger;
