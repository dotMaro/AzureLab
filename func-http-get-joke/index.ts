import { AzureFunction, Context, HttpRequest } from "@azure/functions";

interface HttpResponse {
  status: number;
  headers?: { [name: string]: string };
  body?: unknown;
}

export const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log("Hello from joke function!");

  const response = {
    text: "What is a programmer's favorite hangout place? Foo Bar",
  };
  const res: HttpResponse = {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: response,
  };

  context.res = res;
};
