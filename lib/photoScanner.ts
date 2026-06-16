import fs from "fs";
import path from "path";

export function getPhotos() {
  const photosDir = path.join(
    process.cwd(),
    "public",
    "photos"
  );

  if (!fs.existsSync(photosDir)) {
    console.error(
      "Photos directory not found:",
      photosDir
    );

    return [];
  }

  return fs
    .readdirSync(photosDir)
    .filter((file) =>
      /\.(jpg|jpeg|png|webp)$/i.test(file)
    )
    .map((file) => ({
      name: file,
      path: path.join(
        photosDir,
        file
      ),
    }));
}
