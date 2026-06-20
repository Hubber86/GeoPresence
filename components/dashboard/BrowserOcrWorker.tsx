"use client";

import {
  useEffect,
  useState,
} from "react";

import { runBrowserOcr }
from "@/lib/browserOcr";

interface Props {
  photos: {
    fileName: string;
  }[];
}

export default function BrowserOcrWorker({
  photos,
}: Props) {

  const [
    completed,
    setCompleted,
  ] = useState(false);

  useEffect(() => {

    async function start() {

      const cache =
        JSON.parse(
          localStorage.getItem(
            "ocr-cache"
          ) || "{}"
        );

      for (
        const photo
        of photos
      ) {

        if (
          cache[
            photo.fileName
          ]
        ) {
          continue;
        }

        try {

          const result =
            await runBrowserOcr(
              `/photos/${photo.fileName}`
            );

          cache[
            photo.fileName
          ] = result;

        localStorage.setItem(
          "ocr-cache",
          JSON.stringify(cache)
        );
        
        window.dispatchEvent(
          new Event("ocr-complete")
        );

        } catch (e) {

          console.error(
            e
          );
        }
      }

      setCompleted(
        true
      );
    }

    const timer =
      setTimeout(
        start,
        10000
      );

    return () =>
      clearTimeout(
        timer
      );

  }, [photos]);

  useEffect(() => {

    if (
      completed
    ) {

      setTimeout(
        () =>
          window.location.reload(),
        1000
      );
    }

  }, [completed]);

  return null;
}
