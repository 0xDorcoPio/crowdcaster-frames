import { createFrames } from "frames.js/next";
import { appURL } from "../../utils";

type State = {
    slideNumber: number;
};

export const frames = createFrames<State>({
  basePath: "/frames/slides",
  initialState: { slideNumber: 0 },
  debug: process.env.NODE_ENV === "development",
  baseUrl: appURL()
});