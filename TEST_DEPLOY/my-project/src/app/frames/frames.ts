import { createFrames } from "frames.js/next";
import { appURL } from "../utils";

export const frames = createFrames({
  basePath: "/frames",
  debug: process.env.NODE_ENV === "development",
  baseUrl: appURL()
});