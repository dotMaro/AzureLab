import { AzureFunction, Context } from "@azure/functions";
import resizeImg from "resize-img";

interface Image {
  id: string;
  uri: string;
  thumbnail: string;
}

export const serviceBusQueueTrigger: AzureFunction = async function (
  context: Context,
  message: Image,
  imageDocument: Image,
  imageBlob: any
): Promise<void> {
  context.log("ServiceBus queue trigger function processed message", message);

  const resizedImage = await resizeImg(imageBlob, {
    width: 128,
    height: 128,
  });
  context.bindings.outputThumbnail = resizedImage;

  imageDocument.thumbnail = `https://mattiabimagestore.blob.core.windows.net/thumbnails/${message.id}.png`;
  context.bindings.outputImageDocument = imageDocument;
};
