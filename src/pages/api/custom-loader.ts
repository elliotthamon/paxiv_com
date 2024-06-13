import axios, { AxiosError } from "axios";
import sharp from "sharp";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const url = decodeURI(req.query.url as string);
      if (!url) {
        res.status(400).send("400 Bad request. url is missing");
        res.end();
        return;
      }
      const width = (req.query.w as string) ?? "384"; //default width
      const quality = (req.query.q as string) ?? "75"; //default quality

      const response = await axios.get(decodeURI(url), {
        responseType: "arraybuffer",
      });

      const optimized = await sharp(response.data)
        .resize({
          withoutEnlargement: true,
          width: parseInt(width),
        })
        .webp({ quality: parseInt(quality) }) //transform to webp format
        .toBuffer();

      res.setHeader(
        "Cache-Control",
        "public, max-age=31536000, must-revalidate"
      );

      res.setHeader("content-type", "image/webp");
      res.status(200).send(optimized);
      res.end();
    } catch (e) {
      console.log("error:", e);
      if (e instanceof AxiosError) {
        res.status(500);
        res.end();
      }
    }
  } else {
    res.status(405).send("Method not allowed");
  }
}
