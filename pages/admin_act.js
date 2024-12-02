import { useState, useEffect } from 'react';
import { useSignature } from '../contexts/SignatureContext';  // 导入自定义的 SignatureContext
import { useWallet } from '../contexts/WalletContext';
import revPoolABI from '../sABI/RevenuePool.json';
import { useRouter } from 'next/router';
import { useAdmin } from '../contexts/AdminContext';

import { ethers, parseEther } from 'ethers';

export default function AdminAct() {
    const { walletClient, walletAddress } = useWallet();
    const { isLoggedIn } = useAdmin();
    const router = useRouter();

    // 控制左侧菜单选项的状态
    const [selectedPage, setSelectedPage] = useState('addTask');

    // 控制输入框的状态
    const [taskName, setTaskName] = useState('');
    const [taskDetails, setTaskDetails] = useState('');
    const [rewardToken, setRewardToken] = useState('');
    const [ethValue, setEthValue] = useState('');
    // 注入收益
    const [ethInjection, setEthInjection] = useState('');

    // 控制Permit签名相关的状态
    const [signatureAmount, setSignatureAmount] = useState('');
    const [signatureAddress, setSignatureAddress] = useState('');
    const [confirmationMessage, setConfirmationMessage] = useState('');

    // 获取更新签名金额的函数
    const { updateSignatureAmount, updateSignaturePlayer, updateSignatureDealine, makeSignMessage } = useSignature();

    const revenuePool_addr = '0x36Ff7c2F977a1C69Fc323dFDABf532C4725B8Ecd';

    // 处理新增任务
    const handleAddTask = () => {
        console.log('任务名称:', taskName);
        console.log('任务细节:', taskDetails);
        console.log('奖励Token数:', rewardToken);
        console.log('任务Coin价值:', ethValue);
        alert(`任务名称：${taskName}\n任务细节：${taskDetails}\n奖励Token数：${rewardToken}\n任务Coin价值：${ethValue}`);
    };

    // 监听 是否登录成功
    useEffect(() => {
        if (!isLoggedIn) {
            router.push('/admin');
        }
    }, []);

    // 处理注入收益
    const handleInjectProfit = async () => {
        if (ethInjection == '') {
            alert('请输入注入收益Coin数量');
            return;
        }
        console.log('注入收益Coin数量:', ethInjection);
        // alert(`注入收益Coin数量：${ethInjection}`);

        try {

            // 2. 私钥（账户A的私钥）
            const privateKey = "86cbd6a5f655a0089ef9bf49c89298f351ed5054df5674509b73b2ccc9eda9c3";  // s4Tester 私钥

            // 3. 创建钱包对象
            const provider = ethers.getDefaultProvider("sepolia");//new ethers.JsonRpcProvider("https://sepolia.infura.io/v3/61550621966d498082dc93e05a626460");  // 选择合适的 RPC URL（替换为正确的URL）
            const wallet = new ethers.Wallet(privateKey, provider);
            console.log("wallet: ", wallet.address);
            // 4. 创建合约实例
            const contract = new ethers.Contract(revenuePool_addr, revPoolABI, wallet);
            console.log("contract: ", contract);
            // 5. 调用合约函数并传入参数
            async function callContract() {
                const amount = 1000;  // 被传入的金额参数

                try {
                    // 使用钱包对象发送交易
                    // const amountInWei = BigInt((parseFloat(ethInjection) * 1e18).toString()); // 转换为 BigInt
                    const amountInWei = parseEther("200");
                    console.log("amountInWei: ", amountInWei);
                    const tx = await contract.injectingRevenue(amountInWei);
                    console.log("Transaction sent:", tx.hash);

                    // const tx = await contract.setMarketingToken('0x1F8eeC0b47cb25D6232133f8c88C971cCC70Cae7');
                    // console.log("setMarketingToken: ", tx.hash);

                    // // 等待交易被确认
                    // const receipt = await tx.wait();
                    // console.log("Transaction confirmed:", receipt);

                    // const dividendPoolAmount = await contract.dividendPoolAmount();
                    // console.log("dividendPoolAmount: ", dividendPoolAmount);
                } catch (error) {
                    console.error("Error calling contract:", error);
                }
            }

            // 6. 调用合约函数
            await callContract();
        } catch (error) {
            console.error('注入收益失败:', error);
        }
        // if (ethInjection > 0) {
        //     alert('注入收益成功: ' + ethInjection);
        //     setEthInjection("");
        // }

    };

    // 处理Permit签名
    const handlePermitSign = () => {
        setConfirmationMessage(`签名金额: ${signatureAmount}, 签名地址: ${signatureAddress}`);
        // 将签名金额更新到全局状态
        updateSignatureAmount(signatureAmount);
        updateSignaturePlayer(signatureAddress);
        // 设置过期时间：当前时间 + 10分钟
        const expirationTime = new Date().getTime() + 10 * 60 * 1000;
        updateSignatureDealine(expirationTime);
        // 执行签名
        makeSignMessage();
    };

    return (
        <div style={styles.container}>
            <div style={styles.sidebar}>
                <button
                    onClick={() => setSelectedPage('addTask')}
                    style={selectedPage === 'addTask' ? styles.selectedSidebarButton : styles.sidebarButton}
                >
                    添加任务
                </button>
                {/* <button
                    onClick={() => setSelectedPage('permitSign')}
                    style={selectedPage === 'permitSign' ? styles.selectedSidebarButton : styles.sidebarButton}
                >
                    Permit签名
                </button> */}
                <button
                    onClick={() => setSelectedPage('injectProfit')}
                    style={selectedPage === 'injectProfit' ? styles.selectedSidebarButton : styles.sidebarButton}
                >
                    注入收益
                </button>

            </div>

            <div style={styles.content}>
                {selectedPage === 'addTask' && (
                    <div style={styles.addTaskPage}>
                        <h2 style={styles.pageTitle}>添加任务</h2>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>任务名称:</label>
                            <input
                                type="text"
                                value={taskName}
                                onChange={(e) => setTaskName(e.target.value)}
                                style={styles.input}
                            />
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>任务细节:</label>
                            <input
                                type="text"
                                value={taskDetails}
                                onChange={(e) => setTaskDetails(e.target.value)}
                                style={styles.input}
                            />
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>奖励Token数:</label>
                            <input
                                type="number"
                                value={rewardToken}
                                onChange={(e) => setRewardToken(e.target.value)}
                                style={styles.input}
                            />
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>任务Coin价值:</label>
                            <input
                                type="number"
                                value={ethValue}
                                onChange={(e) => setEthValue(e.target.value)}
                                style={styles.input}
                            />
                        </div>
                        <button
                            onClick={handleAddTask}
                            disabled={!taskName || !taskDetails || !rewardToken || !ethValue}
                            style={styles.button}
                        >
                            新增任务
                        </button>
                    </div>
                )}

                {selectedPage === 'permitSign' && (
                    <div style={styles.permitSignPage}>
                        <h2 style={styles.pageTitle}>Permit签名</h2>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>签名金额:</label>
                            <input
                                type="number"
                                value={signatureAmount}
                                onChange={(e) => setSignatureAmount(e.target.value)}
                                style={styles.input}
                            />
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>签名地址:</label>
                            <input
                                type="text"
                                value={signatureAddress}
                                onChange={(e) => setSignatureAddress(e.target.value)}
                                style={styles.input}
                            />
                        </div>
                        <button
                            onClick={handlePermitSign}
                            disabled={!signatureAmount || !signatureAddress}
                            style={styles.button}
                        >
                            确认签名
                        </button>
                        {confirmationMessage && (
                            <div style={styles.confirmationMessage}>
                                {confirmationMessage}
                            </div>
                        )}
                    </div>
                )}

                {selectedPage === 'injectProfit' && (
                    <div style={styles.injectProfitPage}>
                        <h2 style={styles.pageTitle}>注入收益</h2>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>收益Coin数量:</label>
                            <input
                                type="number"
                                value={ethInjection}
                                onChange={(e) => setEthInjection(e.target.value)}
                                style={styles.input}
                            />
                        </div>
                        <button
                            onClick={handleInjectProfit}
                            disabled={!ethInjection}
                            style={styles.button}
                        >
                            确认注入
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        padding: '20px',
        backgroundColor: '#f0f4f8',
    },
    sidebar: {
        width: '200px',
        paddingRight: '20px',
        borderRight: '1px solid #ddd',
        backgroundColor: '#fff',
    },
    sidebarButton: {
        display: 'block',
        margin: '10px 0',
        padding: '12px',
        width: '100%',
        cursor: 'pointer',
        backgroundColor: '#e6f7ff',  // 默认【添加任务】按钮的背景颜色为蓝色
        border: '1px solid #ddd',
        borderRadius: '5px',
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#007bff', // 默认字体为蓝色
    },
    selectedSidebarButton: {
        display: 'block',
        margin: '10px 0',
        padding: '12px',
        width: '100%',
        cursor: 'pointer',
        backgroundColor: '#007bff',  // 选中后背景高亮为蓝色
        border: '1px solid #007bff', // 边框与背景色一致
        borderRadius: '5px',
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#fff', // 选中按钮文字变为白色
    },
    content: {
        flex: 1,
        padding: '20px',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    pageTitle: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '20px',
    },
    addTaskPage: {
        padding: '20px',
    },
    injectProfitPage: {
        padding: '20px',
    },
    permitSignPage: {
        padding: '20px',
    },
    formGroup: {
        marginBottom: '15px',
    },
    label: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#555',
        marginBottom: '5px',
        display: 'block',
    },
    input: {
        width: '100%',
        padding: '10px',
        marginTop: '5px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        fontSize: '16px',
        backgroundColor: '#fafafa',
        color: '#333',
    },
    button: {
        padding: '12px 20px',
        cursor: 'pointer',
        border: '1px solid #ddd',
        borderRadius: '5px',
        backgroundColor: '#4CAF50',
        color: 'white',
        fontWeight: 'bold',
        width: '100%',
        marginTop: '15px',
        fontSize: '16px',
    },
    confirmationMessage: {
        marginTop: '20px',
        padding: '10px',
        backgroundColor: '#e0f7fa',
        borderRadius: '5px',
        color: '#00796b',
    },
};
