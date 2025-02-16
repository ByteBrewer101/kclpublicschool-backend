"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadPhoto = uploadPhoto;
exports.deletePhoto = deletePhoto;
const storage_blob_1 = require("@azure/storage-blob");
const blobServiceClient = storage_blob_1.BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING || "");
// Get reference to specific container
const containerClient = blobServiceClient.getContainerClient(process.env.AZURE_CONTAINER_NAME || "");
//@ts-expect-error
function uploadPhoto(fileBuffer, fileName) {
    return __awaiter(this, void 0, void 0, function* () {
        const blobClient = containerClient.getBlockBlobClient(fileName);
        yield blobClient.upload(fileBuffer, fileBuffer.length);
        // console.log(blobClient.name);
        return blobClient;
    });
}
function deletePhoto(fileName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const blobClient = containerClient.getBlockBlobClient(fileName);
            yield blobClient.delete();
            return { success: true, message: `Photo ${fileName} deleted successfully` };
        }
        catch (error) {
            // More specific error handling
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            throw new Error(`Failed to delete photo ${fileName}: ${errorMessage}`);
        }
    });
}
