

import { BlobServiceClient } from "@azure/storage-blob";

const blobServiceClient = BlobServiceClient.fromConnectionString(
  process.env.AZURE_STORAGE_CONNECTION_STRING ||""
   
);

// Get reference to specific container
const containerClient = blobServiceClient.getContainerClient(
  process.env.AZURE_CONTAINER_NAME || ""
);

//@ts-expect-error
export async function uploadPhoto(fileBuffer, fileName) {
  const blobClient = containerClient.getBlockBlobClient(fileName);
  await blobClient.upload(fileBuffer, fileBuffer.length);
  // console.log(blobClient.name);

  return blobClient;
}

export async function deletePhoto(fileName: string) {
  try {
    const blobClient = containerClient.getBlockBlobClient(fileName);
    await blobClient.delete();
    return { success: true, message: `Photo ${fileName} deleted successfully` };
  } catch (error) {
    // More specific error handling
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to delete photo ${fileName}: ${errorMessage}`);
  }
}
