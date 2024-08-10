import { frames } from "../frames";
import { transaction } from "frames.js/core";
import { CrowdCasterABI } from "./contracts/CrowdCaster";
import {
    Abi,
    encodeFunctionData,
  } from "viem";

export const POST = frames(async (ctx) => {
  // Do something with the request data to generate transaction data
  const CrowdCasterAddress = "0x506D428E0414478dadC772891028282831085331";
    
  // Create calldata for the transaction using Viem's `encodeFunctionData`
  const callData = encodeFunctionData({
    abi: CrowdCasterABI,
    functionName: "contribute",
  });
 
  // Return transaction data that conforms to the correct type
  return transaction({
    chainId: "eip155:421614", // Arbitrium Sepolia
    method: "eth_sendTransaction",
    params: {
      abi: CrowdCasterABI as Abi,
      to: CrowdCasterAddress,
      data: callData,
      value: ctx.message?.inputText,
    },
  });
  
});
