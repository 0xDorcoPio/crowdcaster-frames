/* eslint-disable react/jsx-key */
import { frames } from "./frames";
import { Button } from "frames.js/next";

const frameHandler = frames(async (ctx) => {

  return {
    image: <div tw="flex">Donate to the campaign X/Y fund raised</div>, // TODO: put the amount
    textInput: "Enter amount",
    buttons: [
        <Button
        action="tx"
        target={{ pathname: "/txdata", query: { method: "approve" } }} post_url={{ pathname: "../thank-you" }}
      >
        Approve
      </Button>,
      <Button
        action="tx"
        target={{ pathname: "/txdata", query: { method: "refund" } }} post_url={{ pathname: "../" }}
        >
        Ask for a refund
        </Button>,
      <Button action="post" target="../">
        Go back
      </Button>,
    ],
  };
});

export const GET = frameHandler;
export const POST = frameHandler;