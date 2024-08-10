/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { frames } from "./frames";
import { appURL } from "../../../utils";

const frameHandler = frames(async (ctx) => {
  const slides = [
    "Slide 1 content",
    "Slide 2 content"
  ]
  function fixNegative(num : number, maximum : number) : number {
    if(num < 0)
      return maximum
    return num
  }
  let counter =  0; // TODO: should be ctx.state.slideNumber
  if(ctx.message){
    if(ctx.searchParams.op === "+"){
      counter = (ctx.state.slideNumber + 1) % slides.length
    } else if(ctx.searchParams.op === "-") {
      counter = fixNegative(ctx.state.slideNumber - 1, slides.length-1)
    }
  }
  
  return {
    image: (
      <div tw="flex flex-col">
        <div>{slides[counter]}</div>
        <div style={{ 
          marginTop: 40, 
          //fontFamily: "monospace" // TODO: custom font
        }}>{`Slide ${counter+1} of ${slides.length}`}</div>
      </div>
    ),
    buttons: [
      <Button action="post" target={{ pathname: "/", query: { op: "-" } }}>
        Previous slide
      </Button>,
      <Button action="post" target={{ pathname: "/", query: { op: "+" } }}>
        Next slide
      </Button>,
      <Button action="post" target="../">
      Go back
    </Button>,
    ],
    state: { slideNumber: counter },
  };
});

export const GET = frameHandler;
export const POST = frameHandler;

/*

import { frames } from "./frames";
import { Button } from "frames.js/next";

const handler = frames(async (ctx) => {
    const slides = [
        "Slide 1",
        "Slide 2"
    ]

    const counter = ctx.message
    ? ctx.searchParams.op === "+"
      ? (ctx.state.slideNumber + 1) % slides.length
      : ctx.state.slideNumber - 1
    : ctx.state.slideNumber;

  return {
    image: (
    <div tw="flex">{slides[counter]} <br/> 
        <i>{`Slide ${ctx.state.slideNumber+1} of ${slides.length}`}</i>
    </div>
    ),
    buttons: [
      // Without query params
      <Button action="post" target={{ pathname: "/", query: { op: "-" } }}>
        Previous slide
      </Button>,
      // Without query params
      <Button action="post" target={{ pathname: "/", query: { op: "+" } }}>
        Next slide
      </Button>,
      // Without query params
      <Button action="post" target="/">
        Go back
      </Button>,
    ],
    state: { counter: counter },
  };
});

export const GET = handler;
export const POST = handler;
*/