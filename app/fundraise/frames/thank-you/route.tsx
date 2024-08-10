/* eslint-disable react/jsx-key */
import { frames } from "./frames";
import { Button } from "frames.js/next";

export const POST = frames(async (ctx) => {

    return {
        image: <div tw="flex">Thank you for donating! </div>,
        buttons: [
            <Button action="post" target="/">
                Go back
            </Button>,
        ],
    };
});