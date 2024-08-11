/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { frames } from "./frames";

const frameHandler = frames(async (ctx) => {
  const slides = [
    "This is a demo campaign",
    "Powered by CrowdCaster"
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