import { z } from "zod";
import type { HttpInstance } from "~modules/services/core/http.instance";
import type { ImageKey, ImageExtension } from "~types/image.type";

export const IMAGE_SERVICE = Symbol("IMAGE_SERVICE");

export class ImageService {
  constructor(private http: HttpInstance) {}

  async getPresignedUrl(key: ImageKey, extension: ImageExtension) {
    return await this.http.get(
      `/image/presigned-url?key=${key}&extension=${extension}`,
      {
        shape: {
          presignedUrl: z.string().url(),
          cdnUrl: z.string().url(),
        },
      },
    );
  }

  async uploadImage(key: ImageKey, image: File) {
    if (!image.type.startsWith("image/")) {
      throw new Error("Invalid file type");
    }

    const extension =
      image.type === "image/svg+xml" ? "svg" : image.type.split("/").at(1);

    try {
      const presigned = await this.getPresignedUrl(
        key,
        extension as ImageExtension,
      );

      const { presignedUrl, cdnUrl } = presigned;
      const buffer = await image.arrayBuffer();

      await fetch(presignedUrl, {
        method: "PUT",
        headers: {
          "Content-Type": image.type,
          "Content-Length": buffer.byteLength.toString(),
        },
        body: buffer,
      });

      return cdnUrl.toString();
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
      throw error;
    }
  }
}
