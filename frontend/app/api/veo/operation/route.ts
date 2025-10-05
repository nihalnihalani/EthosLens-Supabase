import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY environment variable is not set.");
}

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req: Request) {
  try {
    const { name } = await req.json();

    if (!name) {
      return NextResponse.json({ error: "Missing operation name" }, { status: 400 });
    }

    console.log("Checking operation status:", name);

    const operation = await ai.models.getOperation({ name });

    const response = {
      name: operation.name,
      done: operation.done,
      metadata: operation.metadata,
    };

    if (operation.done && operation.response) {
      const videoData = operation.response as any;
      response.video = {
        uri: videoData.uri,
        thumbnailUri: videoData.thumbnailUri,
      };
    }

    return NextResponse.json(response);
  } catch (error: unknown) {
    console.error("Error checking operation:", error);
    return NextResponse.json(
      { error: "Failed to check operation status" },
      { status: 500 }
    );
  }
}
