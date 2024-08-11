import { frames } from "../frames";
import { transaction } from "frames.js/core";
import { CrowdCasterABI } from "./contracts/CrowdCaster";
import {
  Abi,
  encodeFunctionData,
} from "viem";
import {
  CrowdCasterAddress,
  CHAINID
} from "../const"

export const POST = frames(async (ctx) => {
  // Do something with the request data to generate transaction data
  

  if(ctx.searchParams.method == "refund"){
    // Handle refund

    const callData = encodeFunctionData({
      abi: CrowdCasterABI,
      functionName: "refund",
    });
    
    return transaction({
      chainId: CHAINID,
      method: "eth_sendTransaction",
      params: {
        abi: CrowdCasterABI as Abi,
        to: CrowdCasterAddress,
        data: callData,
        value: "0",
      },
    });
  } //else if(ctx.searchParams.method == "approve"){
    // Fund the project
    
    // Create calldata for the transaction using Viem's `encodeFunctionData`
    const callData = encodeFunctionData({
      abi: CrowdCasterABI,
      functionName: "contribute",
    });
    
    // Return transaction data that conforms to the correct type
    return transaction({
      chainId: CHAINID,
      method: "eth_sendTransaction",
      params: {
        abi: CrowdCasterABI as Abi,
        to: CrowdCasterAddress,
        data: callData,
        value: ctx.message?.inputText,
      },
    });
  //}
  
});
