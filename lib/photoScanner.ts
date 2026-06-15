import fs from "fs";
import path from "path";

export function getPhotos() {
  const photosDir = path.join(process.cwd(), "photos");

  if (!fs.existsSync(photosDir)) {
    return [];
  }

  return fs
    .readdirSync(photosDir)
    .filter((file) =>
      /\.(jpg|jpeg|png)$/i.test(file)
    )
    .map((file) => ({
      name: file,
      path: path.join(photosDir, file)
    }));
}
