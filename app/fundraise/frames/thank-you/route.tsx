/* eslint-disable react/jsx-key */
import { frames } from "./frames";
import { Button } from "frames.js/next";

const frameHandler = frames(async (ctx) => {

    return {
        image: <div tw="flex">Thank you for donating! </div>,
        buttons: [
            <Button action="post" target="../">
                Go back
            </Button>,
        ],
    };
});

export const GET = frameHandler;
export const POST = frameHandler;