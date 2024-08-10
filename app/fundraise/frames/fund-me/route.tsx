/* eslint-disable react/jsx-key */
import { frames } from "./frames";
import { Button } from "frames.js/next";

const frameHandler = frames(async (ctx) => {

  // get methods from https://optimism-sepolia.blockscout.com/api/v2/smart-contracts/0x506D428E0414478dadC772891028282831085331/methods-read?is_custom_abi=false&from=0x7A8E79dE63c29c3ee2375Cd3D2e90FEaA5aAf322

  // read funds from: https://optimism-sepolia.blockscout.com/api/v2/smart-contracts/0x506D428E0414478dadC772891028282831085331/query-read-method
  /*
  {
    "args": [
    ],
    "method_id": "968ed600",
    "contract_type": "regular"
  }
  */

  const blockscoutEndpoint = 'https://optimism-sepolia.blockscout.com/api/v2/smart-contracts/0x506D428E0414478dadC772891028282831085331'
  try {
    const response = await fetch(blockscoutEndpoint);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
  } catch (error : any) {
    console.error(error.message);
  }

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