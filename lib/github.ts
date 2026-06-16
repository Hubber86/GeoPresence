export interface GitHubPhoto {
  name: string;
  path: string;
  download_url: string;
}

const OWNER =
  process.env.GITHUB_OWNER;

const REPO =
  process.env.GITHUB_REPO;

const PHOTOS_PATH =
  process.env.GITHUB_PHOTOS_PATH ??
  "public/photos";

export async function getRepoPhotos(): Promise<
  GitHubPhoto[]
> {
  if (!OWNER || !REPO) {
    throw new Error(
      "GitHub repository configuration missing."
    );
  }

  const url =
    `https://api.github.com/repos/${OWNER}/${REPO}/contents/${PHOTOS_PATH}`;

  const response =
    await fetch(url, {
      headers: {
        Accept:
          "application/vnd.github+json",
      },
    });

  if (!response.ok) {
    throw new Error(
      "Unable to load repository photos."
    );
  }

  const files =
    await response.json();

  return files.filter(
    (file: GitHubPhoto) =>
      /\.(jpg|jpeg|png|webp)$/i.test(
        file.name
      )
  );
}
