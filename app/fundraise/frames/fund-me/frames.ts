import { createFrames } from "frames.js/next";


export const frames = createFrames({
  basePath: "/fundraise/frames/fund-me",
  debug: process.env.NODE_ENV === "development",
});