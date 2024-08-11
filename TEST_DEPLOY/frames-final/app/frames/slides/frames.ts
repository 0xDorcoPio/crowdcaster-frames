import { createFrames } from "frames.js/next";

type State = {
    slideNumber: number;
};

export const frames = createFrames<State>({
  basePath: "/frames/slides",
  initialState: { slideNumber: 0 },
});