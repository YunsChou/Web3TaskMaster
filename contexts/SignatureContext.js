// SignatureContext.js
import React, { createContext, useContext, useState } from 'react';

import { useWallet } from './WalletContext';
// import { keccak256, utils } from "viem";
// import { ethers, keccak256, hashMessage, AbiCoder } from "ethers";
// const { ethers } = require("ethers");
import { encodeFunctionData, encodePacked, keccak256, hashMessage, stringToBytes } from 'viem';
import { privateKeyToAccount } from 'viem/accounts'

// 创建一个 Context 用于保存签名金额
const SignatureContext = createContext();

// 提供 SignatureContext 的 Provider
export const SignatureProvider = ({ children }) => {
    // const { walletad } = useWallet();

    const [signaturePlayer, setSignaturePlayer] = useState(null);
    const [signatureAmount, setSignatureAmount] = useState(null);
    const [signatureDealine, setSignatureDealine] = useState(null);
    const [signatureV, setSignatureV] = useState(null);
    const [signatureR, setSignatureR] = useState(null);
    const [signatureS, setSignatureS] = useState(null);

    // 更新签名金额
    const updateSignatureAmount = (amount) => {
        console.log('updateSignatureAmount:', amount);
        setSignatureAmount(amount);
        console.log('setSignatureAmount:', signatureAmount);
    };

    const updateSignaturePlayer = (palyer) => {
        setSignaturePlayer(palyer);
    };


    const updateSignatureDealine = (dealine) => {
        setSignatureDealine(dealine);
    };



    const makeSignMessage = async () => {
        console.log('开始签名');
        try {
            const ownerPK = "0x86cbd6a5f655a0089ef9bf49c89298f351ed5054df5674509b73b2ccc9eda9c3"; // S4Tester 私钥
            const signAccount = privateKeyToAccount(ownerPK);
            console.log('签名钱包地址:', signAccount.address);
            // 3.2 构造前缀
            // const prefix = '\x19Ethereum Signed Message:\n32';
            // 创建签名消息的格式
            // 合约方法定义
            const methodSignature = "premitClaimOMT(address,uint256,uint256)";
            const message = `${methodSignature}${signaturePlayer}${signatureAmount}${signatureDealine}`;
            console.log("signaturePlayer:", signaturePlayer);
            console.log("signatureAmount:", signatureAmount);
            console.log("signatureDealine:", signatureDealine);
            // 3.3计算 keccak256 哈希
            // console.log("ethers.utils:", ethers.utils);

            const encodeMessage = encodePacked(
                ["string", "address", "uint256", "uint256"],
                [message, signaturePlayer, signatureAmount, signatureDealine]
            );

            const messageHash = keccak256(encodeMessage);
            console.log("messageHash:", messageHash);
            // 4、使用 \x19Ethereum Signed Message:\n32 进行加密前缀
            // const ethMessageHash = hashMessage(messageHash);

            // const ethMessageHash = keccak256([, messageHash]);
            // console.log('前缀化消息:', ethMessageHash);

            // // 5. 使用私钥对哈希进行签名
            // const signature = await signAccount.signMessage(ethMessageHash);
            // console.log('签名结果:', signature);
            // const { v, r, s } = signature;
            // setSignatureV(v);
            // setSignatureR(r);
            // setSignatureS(s);



            // 创建一个以太坊钱包实例
            // const provider = ethers.getDefaultProvider("sepolia");
            // const wallet = new ethers.Wallet(ownerPK, provider);
            // console.log('签名钱包地址:', wallet.address);
            // // 3.2 构造前缀
            // // const prefix = '\x19Ethereum Signed Message:\n32';
            // // 创建签名消息的格式
            // // 合约方法定义
            // const methodSignature = "premitClaimOMT(address,uint256,uint256)";
            // const message = `${methodSignature}${signaturePlayer}${signatureAmount}${signatureDealine}`;
            // console.log("signaturePlayer:", signaturePlayer);
            // console.log("signatureAmount:", signatureAmount);
            // console.log("signatureDealine:", signatureDealine);
            // // 3.3计算 keccak256 哈希
            // console.log("ethers.utils:", ethers.utils);
            // const abiCoder = new ethers.abi.AbiCoder();
            // const messageHash = abiCoder.encode(["string", "address", "uint256", "uint256"], [message, signaturePlayer, signatureAmount, signatureDealine]);
            // console.log("messageHash:", messageHash);
            // const messageHash = keccak256(abiCoder.encode(
            //     ["string", "address", "uint256", "uint256"],
            //     [message, signaturePlayer, signatureAmount, signatureDealine]
            // ));
            // // 4、使用 \x19Ethereum Signed Message:\n32 进行加密前缀
            // const ethMessageHash = hashMessage(messageHash);
            // console.log('前缀化消息:', ethMessageHash);

            // // 5. 使用私钥对哈希进行签名
            // const signature = await wallet.signMessage(ethMessageHash);

            // console.log('ERC191签名:', signature);
            // // 创建一个 Signature 对象
            // const sig = ethers.Signature.from(signature);
            // // 获取 r、s 和 v 值
            // const { r, s, v } = sig;

            // console.log("签名结果：", { r, s, v });
            // setSignatureV(v);
            // setSignatureR(r);
            // setSignatureS(s);



        } catch (error) {
            console.error('签名失败:', error);
        }
    };

    // const updateSignatureV = (v) => {
    //     setSignatureV(v);
    // };

    // const updateSignatureR = (r) => {
    //     setSignatureR(r);
    // };

    // const updateSignatureS = (s) => {
    //     setSignatureS(s);
    // };

    return (
        <SignatureContext.Provider value={{ signatureAmount, updateSignatureAmount, signaturePlayer, updateSignaturePlayer, signatureDealine, updateSignatureDealine, signatureV, signatureR, signatureS, makeSignMessage }}>
            {children}
        </SignatureContext.Provider>
    );
};

// 自定义 hook，方便其他组件访问签名金额
export const useSignature = () => useContext(SignatureContext);
