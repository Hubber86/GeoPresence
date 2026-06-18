"use client";

import { useEffect }
from "react";

export default function OcrTrigger() {

  useEffect(() => {

    const timer =
      setTimeout(
        async () => {

          try {

            console.log(
              "Starting OCR..."
            );

            await fetch(
              "/api/ocr/process",
              {
                method:
                  "POST",
              }
            );

          } catch (error) {

            console.error(
              error
            );
          }

        },
        15000
      );

    return () =>
      clearTimeout(
        timer
      );

  }, []);

  return null;
}
