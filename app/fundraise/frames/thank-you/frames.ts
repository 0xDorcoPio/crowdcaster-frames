import { createFrames } from "frames.js/next";

export const frames = createFrames({
    basePath: "/fundraise/frames/thank-you",
    debug: process.env.NODE_ENV === "development",
});