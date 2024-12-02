import { useState, useEffect } from 'react';

import abi from '../sABI/PartnerIDO.json'; // 导入 ABI

import { useWallet } from '../contexts/WalletContext';

export default function IDOPage() {
    const { walletAddress, walletClient, publicClient, connectWallet, disconnectWallet } = useWallet();  // 从 context 获取钱包地址
    // 模块1相关变量：IDO信息
    const [currentStatus, setCurrentStatus] = useState('进行中');
    const [presaleAmount, setPresaleAmount] = useState(1000000); // 预售额度
    const [presalePrice, setPresalePrice] = useState(0.5); // 预售价格
    const [minRaise, setMinRaise] = useState(500000); // 最低募集
    const [maxRaise, setMaxRaise] = useState(1000000); // 最高募集
    const [currentSubscription, setCurrentSubscription] = useState(200000); // 当前认购金额
    // const [startTime, setStartTime] = useState('2024-12-01 10:00:00'); // 预售开始时间
    const [endTime, setEndTime] = useState('2024-12-10 18:00:00'); // 预售结束时间



    const [userCanStakeOatAmount, setUserCanStakeOatAmount] = useState(0);

    // 模块2：认购模块
    const [subscriptionAmount, setSubscriptionAmount] = useState(0); // 用户认购金额
    const [userSubscriptionAmount, setUserSubscriptionAmount] = useState(0); // 用户已认购金额
    const [minSubscriptionAmount, setMinSubscriptionAmount] = useState(0);
    const [maxSubscriptionAmount, setMaxSubscriptionAmount] = useState(0);

    // 模块3：IDO募资结束后的领取和退款模块
    const [oatToClaim, setOatToClaim] = useState(500); // 用户可领取的OAT数量

    // 模块4：质押信息
    const [stakingRate, setStakingRate] = useState(5); // 质押利率
    const [totalStakedOat, setTotalStakedOat] = useState(10000); // 已质押OAT总数
    const [userStakedOat, setUserStakedOat] = useState(500); // 当前用户质押OAT数量

    // 模块5：质押模块
    const [stakingAmount, setStakingAmount] = useState(0); // 用户质押金额

    // 模块6：用户领取模块
    const [oaxToClaim, setOaxToClaim] = useState(100); // 当前用户可领取OAX数量

    const contractAddress = '0x6b1D32E399f1c014c20612E8c194bAacbfFe3f37'; // 质押合约地址
    const [idoTokenAddress, setIdoTokenAddress] = useState(contractAddress); // 存储读取的idoToken地址
    const [loading, setLoading] = useState(true); // 加载状态



    // 格式化endTime为YYYY-MM-DD
    const formatDate = (timestamp) => {
        if (!timestamp) return '';
        const date = new Date(timestamp * 1000);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });  // 例如格式：MM/DD/YYYY
    };

    // 获取 idoToken 地址
    const fetchIdoToken = async () => {
        const fetchData = async () => {
            try {
                // 读取多个合约参数
                const [isEnd, idoToken, preTokenAmount, preTokenMinPrice, minETHTarget, maxETHTarge, totalETH, endTime, minETHAmount, maxETHAmount, balance] = await Promise.all([
                    publicClient.readContract({
                        address: contractAddress,
                        abi: abi,
                        functionName: 'isEnd',
                    }),
                    publicClient.readContract({
                        address: contractAddress,
                        abi: abi,
                        functionName: 'idoToken',
                    }),
                    publicClient.readContract({
                        address: contractAddress,
                        abi: abi,
                        functionName: 'preTokenAmount',
                    }),
                    publicClient.readContract({
                        address: contractAddress,
                        abi: abi,
                        functionName: 'preTokenMinPrice',
                    }),
                    publicClient.readContract({
                        address: contractAddress,
                        abi: abi,
                        functionName: 'minETHTarget',
                    }),
                    publicClient.readContract({
                        address: contractAddress,
                        abi: abi,
                        functionName: 'maxETHTarge',
                    }),
                    publicClient.readContract({
                        address: contractAddress,
                        abi: abi,
                        functionName: 'totalETH',
                    }),
                    publicClient.readContract({
                        address: contractAddress,
                        abi: abi,
                        functionName: 'endTime',
                    }),
                    publicClient.readContract({
                        address: contractAddress,
                        abi: abi,
                        functionName: 'minETHAmount',
                    }),
                    publicClient.readContract({
                        address: contractAddress,
                        abi: abi,
                        functionName: 'maxETHTarge',
                    }),
                    publicClient.readContract({
                        address: contractAddress,
                        abi: abi,
                        functionName: 'balances',
                        args: [walletAddress],
                    }),
                ]);
                // 将endTime转为 年月日 格式
                const formattedEndTime = formatDate(Number(endTime));
                // 更新状态
                setCurrentStatus(isEnd ? '结束' : '进行中');
                setPresaleAmount(Number(preTokenAmount) / 10 ** 18);
                setPresalePrice(Number(preTokenMinPrice) / 10 ** 18);
                setMinRaise(Number(minETHTarget) / 10 ** 18);
                setMaxRaise(Number(maxETHTarge) / 10 ** 18);
                setCurrentSubscription(Number(totalETH) / 10 ** 18);
                setEndTime(formattedEndTime);
                setMinSubscriptionAmount(Number(minETHAmount) / 10 ** 18);
                setMaxSubscriptionAmount(Number(maxETHAmount) / 10 ** 18);
                setUserSubscriptionAmount(Number(balance) / 10 ** 18);
                // 输出到控制台
                console.log('当前状态:', isEnd ? '结束' : '进行中');
                console.log('IDO Token 地址:', idoToken);
                console.log('预售Token数量:', preTokenAmount);
                console.log('预售结束时间:', formattedEndTime);
            } catch (error) {
                console.error('读取合约数据失败:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    };

    // 确保在 walletClient 和 publicClient 都初始化后再进行操作
    useEffect(() => {
        if (publicClient && walletAddress) {
            console.log('publicClient:', publicClient);
            fetchIdoToken();
        }
    }, [publicClient]); // 只在 publicClient 改变时重新执行

    // 认购事件
    const handleSubscription = async () => {
        if (walletAddress === null) {
            alert('请连接钱包');
            return;
        }
        console.log(`认购金额: ${subscriptionAmount}`);

        if (subscriptionAmount < minSubscriptionAmount || subscriptionAmount > maxSubscriptionAmount) {
            alert('认购金额不在预售范围内');
            return;
        }
        console.log('可以认购');
        try {
            // 调用合约进行认购
            // 将用户输入的认购金额转为合约接受的格式
            const amountInWei = BigInt((parseFloat(subscriptionAmount) * 1e18).toString()); // 转换为 BigInt
            console.log("wallet: ", walletAddress);
            // 调用合约的 presale 方法进行认购
            const tx = await walletClient.writeContract({
                address: contractAddress,
                abi: abi,
                functionName: 'presale',
                args: [],
                value: amountInWei,    // 发送以太币
                account: walletAddress
            });

            alert('认购成功');
            window.location.reload();  // 页面刷新
        } catch (error) {
            console.error('交易失败：', error);
            alert('交易失败');
        }


    };

    // 领取OAT事件
    const handleClaimOAT = () => {
        console.log(`领取OAT数量: ${oatToClaim}`);
    };

    // 退款事件
    const handleRefund = () => {
        console.log('进行退款操作');
    };

    // 质押事件
    const handleStake = () => {
        console.log(`质押金额: ${stakingAmount}`);
    };

    // 领取OAX事件
    const handleClaimOAX = () => {
        console.log(`领取OAX数量: ${oaxToClaim}`);
    };

    // 解除质押事件
    const handleUnstake = () => {
        console.log('解除质押');
    };

    return (
        <div>
            <main style={styles.main}>
                <h1 style={styles.header}>IDO+质押</h1>

                {/* {loading ? (
                    <p>加载中...</p>
                ) : idoTokenAddress ? (
                    <p>IDO Token 地址: {idoTokenAddress}</p>
                ) : (
                    <p>无法获取 IDO Token 地址</p>
                )} */}

                {/* 上半部分：模块1、2、3 */}
                <div style={styles.section}>
                    <div style={styles.module}>
                        <h3 style={styles.moduleTitle}>IDO信息</h3>
                        <p style={styles.text}>当前状态: {currentStatus}</p>
                        <p style={styles.text}>预售额度: {presaleAmount} OAT</p>
                        <p style={styles.text}>预售价格: {presalePrice} ETH</p>
                        <p style={styles.text}>最低募集: {minRaise} ETH</p>
                        <p style={styles.text}>最高募集: {maxRaise} ETH</p>
                        <p style={styles.text}>当前认购总金额: {currentSubscription} ETH</p>
                        {/* <p style={styles.text}>预售开启时间: {startTime}</p> */}
                        <p style={styles.text}>预售结束时间: {endTime}</p>
                    </div>
                    <div style={styles.module}>
                        <h3 style={styles.moduleTitle}>认购模块</h3>
                        <input
                            type="number"
                            value={subscriptionAmount}
                            onChange={(e) => setSubscriptionAmount(e.target.value)}
                            placeholder="输入认购金额"
                            style={styles.input}
                        />
                        <p style={styles.text}>已认购金额: {userSubscriptionAmount} ETH</p>
                        <p style={styles.text}>可认购金额: {minSubscriptionAmount} - {maxSubscriptionAmount} ETH </p>
                        <button style={styles.button} onClick={handleSubscription}>认购</button>
                    </div>
                    <div style={styles.module}>
                        <h3 style={styles.moduleTitle}>IDO募资结束后的模块</h3>
                        <p style={styles.text}>可领取的OAT: {oatToClaim}</p>
                        <button style={styles.button} onClick={handleClaimOAT}>领取OAT</button>
                        <button style={styles.button} onClick={handleRefund}>领取退款</button>
                    </div>
                </div>

                {/* 下半部分：模块4、5、6 */}
                <div style={styles.section}>
                    <div style={styles.module}>
                        <h3 style={styles.moduleTitle}>质押信息</h3>
                        <p style={styles.text}>质押利率: {stakingRate}%</p>
                        <p style={styles.text}>已质押OAT总数: {totalStakedOat} OAT</p>
                    </div>
                    <div style={styles.module}>
                        <h3 style={styles.moduleTitle}>质押模块</h3>
                        <input
                            type="number"
                            value={stakingAmount}
                            onChange={(e) => setStakingAmount(e.target.value)}
                            placeholder="输入质押金额"
                            style={styles.input}
                        />
                        <p style={styles.text}>已质押OAT数量: {userStakedOat} OAT</p>
                        <p style={styles.text}>可质押OAT数量: {userCanStakeOatAmount} OAT</p>
                        <button style={styles.button} onClick={handleStake}>质押</button>
                    </div>
                    <div style={styles.module}>
                        <h3 style={styles.moduleTitle}>领取与解除质押模块</h3>
                        <p style={styles.text}>当前可领取OAX数量: {oaxToClaim}</p>
                        <button style={styles.button} onClick={handleClaimOAX}>领取OAX</button>
                        <button style={styles.button} onClick={handleUnstake}>解除OAT质押</button>
                    </div>
                </div>
            </main>
        </div>
    );
}

const styles = {
    main: {
        padding: '20px',
        fontFamily: '"Roboto", sans-serif',
        backgroundColor: '#f7f7f7',
    },
    header: {
        fontSize: '32px',
        fontWeight: '600',
        color: '#333',
        marginBottom: '20px',
        textAlign: 'center',
    },
    section: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '20px',
        gap: '20px',
    },
    module: {
        flex: 1,
        padding: '20px',
        margin: '10px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: '#fff',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    moduleTitle: {
        fontSize: '20px',
        fontWeight: '500',
        color: '#333',
        marginBottom: '10px',
    },
    text: {
        fontSize: '16px',
        color: '#555',
        margin: '5px 0',
    },
    input: {
        width: '100%',
        padding: '10px',
        marginBottom: '15px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        color: '#555',
    },
    button: {
        padding: '12px 25px',
        cursor: 'pointer',
        border: '1px solid #4CAF50',
        borderRadius: '5px',
        background: '#4CAF50',
        color: 'white',
        fontSize: '16px',
        transition: 'background-color 0.3s ease',
        width: '100%',
        textAlign: 'center',
        marginTop: '15px',
    },
};
