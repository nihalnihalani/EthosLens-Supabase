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

    console.log("Downloading video:", name);

    const operation = await ai.models.getOperation({ name });

    if (!operation.done || !operation.response) {
      return NextResponse.json(
        { error: "Operation not completed" },
        { status: 400 }
      );
    }

    const videoData = operation.response as any;
    
    return NextResponse.json({
      success: true,
      video: {
        uri: videoData.uri,
        thumbnailUri: videoData.thumbnailUri,
        duration: videoData.duration,
        size: videoData.size,
      }
    });
  } catch (error: unknown) {
    console.error("Error downloading video:", error);
    return NextResponse.json(
      { error: "Failed to download video" },
      { status: 500 }
    );
  }
}
