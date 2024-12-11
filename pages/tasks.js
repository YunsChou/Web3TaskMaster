import { useState } from 'react';
import { useSignature } from '../contexts/SignatureContext';

import { useWallet } from '../contexts/WalletContext';
import playerAbi from '../sABI/Player.json';

import { encodePacked, keccak256, parseSignature, recoverAddress } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';

import { hexToBytes, toBytes } from "viem/utils";

// 设置常量
const SHARE_VALUE = 50;

export default function TasksPage() {
    const { walletAddress, walletClient } = useWallet();

    const { updateSignatureAmount, signatureAmount, updateSignaturePlayer, signaturePlayer, updateSignatureDealine, signatureDealine, makeSignMessage, signatureV, signatureR, signatureS } = useSignature();
    // 初始化 m 变量
    const [m, setM] = useState(0);  // 待领取的 OMT 数量

    const PlayerContractAddress = '0xf3eC7cd8243ed704A3f70195F2C39Ba5c9aedcF0'; // Player合约地址

    // 任务列表示例
    const tasks = [
        { taskId: 1, title: '任务一', detail: '任务详情一', value: 10 },
        { taskId: 2, title: '任务二', detail: '任务详情二', value: 20 },
        { taskId: 3, title: '任务三', detail: '任务详情三', value: 30 },
        { taskId: 4, title: '任务四', detail: '任务详情四', value: 40 },
        { taskId: 5, title: '任务五', detail: '任务详情五', value: 50 },
    ];

    // 处理分享按钮点击
    const handleShareClick = () => {
        const shareValue = SHARE_VALUE;  // 假设每次分享增加 5 OMT
        setM(prevM => prevM + shareValue);  // 点击分享时，增加待领取 OMT
        console.log(`分享按钮点击，待领取 OMT 数量增加 ${shareValue}，新数量为: ${m + shareValue}`);
    };

    // 处理领取按钮点击
    const handleClaimClick = async () => {
        // console.log(`领取 ${m} OMT`);
        // if (m === 0) {
        //     alert('没有待领取的 OMT');
        //     return;
        // }

        console.log("-->> walletAddress: ", walletAddress);


        // const clainAmount = 50000000000000000000;//m * 1e18;
        // console.log('claimAmount', clainAmount);
        // // 将签名金额更新到全局状态
        // updateSignatureAmount(clainAmount);
        // updateSignaturePlayer(walletAddress);
        // // 设置过期时间：当前时间 + 10分钟
        // const expirationTime = 1733314990861;//new Date().getTime() + 60 * 10 * 60 * 1000;
        // updateSignatureDealine(expirationTime);
        // console.log('expirationTime', expirationTime);
        // 执行签名
        // makeSignMessage();

        // signatureAmount
        // console.log(`signatureAmount: ${signatureAmount}`);
        // console.log(`signaturePlayer: ${signaturePlayer}`);
        // console.log(`signatureDealine: ${signatureDealine}`);
        // console.log(`signatureV: ${signatureV}`);
        // console.log(`signatureR: ${signatureR}`);
        // console.log(`signatureS: ${signatureS}`);


        const ownerPK = "0x86cbd6a5f655a0089ef9bf49c89298f351ed5054df5674509b73b2ccc9eda9c3"; // S4Tester 私钥
        const signAccount = privateKeyToAccount(ownerPK);
        console.log('签名钱包地址:', signAccount.address);

        // 合约方法定义
        const methodSignature = "premitClaimOMT(address,uint256,uint256)";
        const clainAmount = 50000000000000000000n;
        const expirationTime = 1735627134000n; // 毫秒：2024-12-31 14:38:54

        // 第1步：打包消息（包含方法签名和参数）
        const encodeMessage1 = encodePacked(
            ["string", "address", "uint256", "uint256"],
            [methodSignature, walletAddress, clainAmount, expirationTime]
        );

        // 使用 keccak256 计算消息哈希
        const messageHash1 = keccak256(encodeMessage1);
        console.log("-->> messageHash1:", messageHash1);
        /*
        // 第2步：根据 EIP-191 签名消息规则，添加前缀
        const encodeMessage2 = encodePacked(
            ["string", "bytes32"],
            [`\x19Ethereum Signed Message:\n32`, messageHash1]
        );

        // 计算完整消息哈希
        const messageHash2 = keccak256(encodeMessage2);
        console.log("-->> messageHash2:", messageHash2);
        */
        // 确保 messageHash 是一个字节数组
        const messageBytes = toBytes(messageHash1); //同 hexToBytes();
        console.log("-->> messageBytes:", messageBytes);

        // 调用 signMessage 方法，获取签名
        try {
            const signature = await signAccount.signMessage({ message: { raw: messageBytes } });
            console.log('签名结果:', signature);

            const { r, s, v } = parseSignature(signature);
            console.log("-->> v:", v);
            console.log("-->> r:", r);
            console.log("-->> s:", s);

            // const recoveredAddress = recoverAddress(messageBytes, { v, r, s });
            // console.log("-->> recoveredAddress:", recoveredAddress);

            try {
                // 调用permitClaimOMT方法进行操作
                const tx = await walletClient.writeContract({
                    address: PlayerContractAddress,
                    abi: playerAbi,
                    functionName: 'premitClaimOMT',
                    args: [walletAddress, clainAmount, expirationTime, v, r, s],
                    account: walletAddress
                });

                console.log('Transaction hash:', tx.hash);



                // 你可以根据返回的 receipt 处理交易成功后的逻辑
            } catch (error) {
                console.error('交易失败:', error);
            }

        } catch (error) {
            console.error('签名失败:', error);
        }



    };

    // 处理任务点击
    const handleTaskClick = (value) => {
        setM(prevM => prevM + value);  // 点击任务时，增加待领取的 OMT 数量
        console.log(`任务已领取：当前待领取 OMT 数量增加 ${value}，新数量为: ${m + value}`);
    };


    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f7fa' }}>
            <main>
                <h1 style={styles.header}>任务+分享</h1>

                <div style={styles.topBar}>
                    <div style={styles.shareSection}>
                        <span style={styles.shareText}>分享获取: <strong>{SHARE_VALUE}</strong> OMT</span> {/* 这里用 SHARE_VALUE 常量 */}
                        <button style={styles.button} onClick={handleShareClick}>
                            分享
                        </button>
                    </div>

                    <div style={styles.claimSection}>
                        <span style={styles.claimText}>待领取: <strong>{m}</strong> OMT</span>
                        <button style={styles.button} onClick={handleClaimClick}>
                            领取
                        </button>
                    </div>
                </div>

                <div style={styles.taskList}>
                    {tasks.map((task) => (
                        <div
                            key={task.taskId}
                            style={styles.taskItem}
                            onClick={() => handleTaskClick(task.value)}  // 点击任务时更新 m
                        >
                            <div style={styles.taskLabel}><strong>Task ID:</strong> {task.taskId}</div>
                            <div style={styles.taskLabel}><strong>Title:</strong> {task.title}</div>
                            <div style={styles.taskLabel}><strong>Detail:</strong> {task.detail}</div>
                            <div style={styles.taskLabel}><strong>Value:</strong> {task.value}</div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

const styles = {
    header: {
        fontSize: '32px',
        fontWeight: '600',
        color: '#2c3e50',
        marginBottom: '20px',
        textAlign: 'center',
    },
    topBar: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '20px',
        backgroundColor: '#fff',
        padding: '15px',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    },
    shareSection: {
        display: 'flex',
        alignItems: 'center',
    },
    claimSection: {
        display: 'flex',
        alignItems: 'center',
    },
    shareText: {
        fontSize: '16px',
        color: '#2c3e50',
        marginRight: '15px',
    },
    claimText: {
        fontSize: '16px',
        color: '#2c3e50',
        marginRight: '15px',
    },
    button: {
        padding: '8px 15px',
        backgroundColor: '#4CAF50',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        transition: 'background-color 0.3s ease',
    },
    buttonHover: {
        backgroundColor: '#45a049',
    },
    taskList: {
        marginTop: '20px',
        maxHeight: 'calc(100vh - 250px)', // 动态设置高度为屏幕高度减去顶部和按钮的高度
        overflowY: 'auto',
    },
    taskItem: {
        padding: '20px',
        marginBottom: '15px',
        backgroundColor: '#ffffff',
        border: '1px solid #ddd',
        borderRadius: '8px',
        cursor: 'pointer',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        transition: 'background-color 0.3s ease, transform 0.2s ease',
    },
    taskItemHover: {
        backgroundColor: '#f1f1f1',
        transform: 'scale(1.05)',
    },
    taskLabel: {
        marginBottom: '10px',
        fontSize: '16px',
        color: '#555',
    },
};
