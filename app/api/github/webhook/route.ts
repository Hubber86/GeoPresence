import crypto from "crypto";

import {
  NextRequest,
  NextResponse,
} from "next/server";

export const runtime = "nodejs";

function verifySignature(
  payload: string,
  signature: string | null
) {
  const secret =
    process.env.GITHUB_WEBHOOK_SECRET;

  if (!secret || !signature) {
    return false;
  }

  const expected =
    "sha256=" +
    crypto
      .createHmac(
        "sha256",
        secret
      )
      .update(payload)
      .digest("hex");

  return crypto.timingSafeEqual(
    Buffer.from(expected),
    Buffer.from(signature)
  );
}

export async function POST(
  request: NextRequest
) {
  try {
    const payload =
      await request.text();

    const signature =
      request.headers.get(
        "x-hub-signature-256"
      );

    if (
      !verifySignature(
        payload,
        signature
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid webhook signature",
        },
        {
          status: 401,
        }
      );
    }

    const event =
      request.headers.get(
        "x-github-event"
      );

    const body =
      JSON.parse(payload);

    if (event === "push") {
      console.log(
        "Repository updated"
      );

      console.log(
        "Branch:",
        body.ref
      );

      console.log(
        "Commit:",
        body.head_commit
          ?.id
      );

      console.log(
        "Message:",
        body.head_commit
          ?.message
      );

      /*
       Future Actions

       await clearCache();
       await rebuildReports();
       */
    }

    return NextResponse.json({
      success: true,
      event,
      processed: true,
      timestamp:
        new Date().toISOString(),
    });
  } catch (error) {
    console.error(
      "Webhook error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Webhook processing failed",
      },
      {
        status: 500,
      }
    );
  }
}
