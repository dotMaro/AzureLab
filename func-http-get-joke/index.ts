import { AzureFunction, Context, HttpRequest } from "@azure/functions";

export const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log("Hello from joke function!");

  const response = {
    text: "What is a programmer's favorite hangout place? Foo Bar",
  };

  context.res = {
    body: response,
  };
};
