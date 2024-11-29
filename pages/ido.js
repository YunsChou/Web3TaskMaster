import { useState } from 'react';

export default function IDOPage() {
    // 模块1相关变量：IDO信息
    const [currentStatus, setCurrentStatus] = useState('进行中');
    const [presaleAmount, setPresaleAmount] = useState(1000000); // 预售额度
    const [presalePrice, setPresalePrice] = useState(0.5); // 预售价格
    const [minRaise, setMinRaise] = useState(500000); // 最低募集
    const [maxRaise, setMaxRaise] = useState(1000000); // 最高募集
    const [currentSubscription, setCurrentSubscription] = useState(200000); // 当前认购金额
    const [startTime, setStartTime] = useState('2024-12-01 10:00:00'); // 预售开始时间
    const [endTime, setEndTime] = useState('2024-12-10 18:00:00'); // 预售结束时间

    // 模块2：认购模块
    const [subscriptionAmount, setSubscriptionAmount] = useState(0); // 用户认购金额

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

    // 认购事件
    const handleSubscription = () => {
        console.log(`认购金额: ${subscriptionAmount}`);
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

                {/* 上半部分：模块1、2、3 */}
                <div style={styles.section}>
                    <div style={styles.module}>
                        <h3 style={styles.moduleTitle}>IDO信息</h3>
                        <p style={styles.text}>当前状态: {currentStatus}</p>
                        <p style={styles.text}>预售额度: {presaleAmount} Token</p>
                        <p style={styles.text}>预售价格: {presalePrice} USD/Token</p>
                        <p style={styles.text}>最低募集: {minRaise} USD</p>
                        <p style={styles.text}>最高募集: {maxRaise} USD</p>
                        <p style={styles.text}>当前认购金额: {currentSubscription} USD</p>
                        <p style={styles.text}>预售开启时间: {startTime}</p>
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
                        <button style={styles.button} onClick={handleSubscription}>认购</button>
                    </div>
                    <div style={styles.module}>
                        <h3 style={styles.moduleTitle}>IDO募资结束后的模块</h3>
                        <p style={styles.text}>用户可领取的OAT数量: {oatToClaim}</p>
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
                        <p style={styles.text}>当前用户质押OAT数量: {userStakedOat} OAT</p>
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
