/* eslint-disable react/jsx-key */
import { frames } from "./frames";
import { Button } from "frames.js/next";

const handler = frames(async () => {
  return {
    image: <div tw="flex">Welcome to this demo crowdfunding campaign powered by CrowdCaster made for Superhack2024!</div>,
    buttons: [
      // Without query params
      <Button action="post" target="/slides">
        Browse slides
      </Button>,
      // Without query params
      <Button action="post" target="/fund-me">
        Fund me
      </Button>,
    ],
  };
});

export const GET = handler;
export const POST = handler;
