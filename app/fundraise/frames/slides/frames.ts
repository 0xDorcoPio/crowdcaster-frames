import { createFrames } from "frames.js/next";

type State = {
    slideNumber: number;
};

export const frames = createFrames<State>({
  basePath: "/fundraise/frames/slides",
  initialState: { slideNumber: 0 },
  debug: process.env.NODE_ENV === "development",
});