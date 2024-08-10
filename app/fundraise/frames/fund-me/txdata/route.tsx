import { frames } from "../frames";
import { transaction } from "frames.js/core";
import { CrowdCasterABI } from "./contracts/CrowdCaster";
import {
  Abi,
  encodeFunctionData,
} from "viem";

export const POST = frames(async (ctx) => {
  // Do something with the request data to generate transaction data
  const CrowdCasterAddress = "0x3AaB08bA0E7696E6d71451f253e5B26412A061f8";
  // OP Sepolia: 0x506D428E0414478dadC772891028282831085331
  // Arbitrum Sepolia: "0x3AaB08bA0E7696E6d71451f253e5B26412A061f8";
  const CHAINID = "eip155:421614"; 
  // Arbitrium Sepolia: eip155:421614
  // OP Sepolia: eip155:11155420

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
  } else if(ctx.searchParams.method == "approve"){
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
  }
  
});
