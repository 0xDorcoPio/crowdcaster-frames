/* eslint-disable react/jsx-key */
import { frames } from "./frames";
import { Button } from "frames.js/next";
import {
  CrowdCasterAddress
} from "./const"

const frameHandler = frames(async (ctx) => {
  // Get available methods for the smart contract and extract the method_id
  let method_id_total = "";
  let method_id_goal = "";
  let total_funds_raised = 0;
  let goal_funds = 0;
  let stringForFrame = ""
  try {
    let endpoint = `https://optimism-sepolia.blockscout.com/api/v2/smart-contracts/${CrowdCasterAddress}/methods-read?is_custom_abi=false`
    let response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    let json = await response.json();
    for(let el of json){
      if(el.name === "total"){
        method_id_total = el.method_id
      }
      if(el.name === "goal"){
        method_id_goal = el.method_id
      }
    }
    if(method_id_total === ""){
      throw new Error('Total Method not found')
    }
    if(method_id_goal === ""){
      throw new Error('Goal Method not found')
    }

    // Read the value for total
    endpoint = `https://optimism-sepolia.blockscout.com/api/v2/smart-contracts/${CrowdCasterAddress}/query-read-method`

    console.log("-----")
    console.log(endpoint)
    console.log(JSON.stringify({
      args: [
      ],
      method_id: method_id_total,
      contract_type: "regular"
    }))

    response = await fetch(endpoint, 
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          args: [
          ],
          method_id: method_id_total,
          contract_type: "regular"
        })
      });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    json = await response.json();
    total_funds_raised = json.result.output[0].value

    // Read value for goal
    endpoint = `https://optimism-sepolia.blockscout.com/api/v2/smart-contracts/${CrowdCasterAddress}/query-read-method`
    response = await fetch(endpoint, 
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          args: [
          ],
          method_id: method_id_goal,
          contract_type: "regular"
        })
      });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    json = await response.json();
    goal_funds = json.result.output[0].value
    if(goal_funds === 0){
      throw new Error("Error reading goal funds")
    }

    stringForFrame = `${total_funds_raised}/${goal_funds} funds raised`
  } catch (error : any) {
    console.error(error.message);
  }

  return {
    image: <div tw="flex">Donate to the campaign {stringForFrame}</div>, // TODO: put the amount
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