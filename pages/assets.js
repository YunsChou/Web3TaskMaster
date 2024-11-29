import { useState } from 'react';

export default function AssetsPage() {
    // 模块1、2、4、5的相关变量
    const [n, setN] = useState(1000); // 待领取分红池 Token
    const [m, setM] = useState(500);  // 分红池价值 USD
    const [l, setL] = useState(10);   // 每份OAX兑换Token数

    const [x, setX] = useState(200);  // 当前持有 OAX 数量
    const [y, setY] = useState(50);   // 当前可兑换 Token 数量

    const [a, setA] = useState(800);  // 待领取营销池 Token
    const [b, setB] = useState(400);  // 营销池价值 USD
    const [c, setC] = useState(5);    // 每份 OMT 兑换Token数

    const [i, setI] = useState(300);  // 当前持有 OMT 数量
    const [j, setJ] = useState(100);  // 当前可兑换 Token 数量

    // 新增的变量：用户输入的 OAX 和 OMT 数量
    const [oaxAmount, setOaxAmount] = useState(''); // 输入的 OAX 数量
    const [omtAmount, setOmtAmount] = useState(''); // 输入的 OMT 数量

    // 兑换 OAX 的处理函数
    const handleOAXExchange = () => {
        console.log(`兑换 OAX 数量: ${oaxAmount}`);
        // 在这里可以根据 oaxAmount 执行兑换逻辑
    };

    // 兑换 OMT 的处理函数
    const handleOMTExchange = () => {
        console.log(`兑换 OMT 数量: ${omtAmount}`);
        // 在这里可以根据 omtAmount 执行兑换逻辑
    };

    return (
        <div>
            <main style={styles.main}>
                <h1 style={styles.header}>资产+兑换</h1>

                {/* 上半部分：模块1、模块2、模块3 */}
                <div style={styles.section}>
                    <div style={styles.module}>
                        <h3 style={styles.moduleTitle}>分红池信息</h3>
                        <p style={styles.text}>待领取分红池 {n} Token</p>
                        <p style={styles.text}>价值 {m} USD</p>
                        <p style={styles.text}>当前每份 OAX 可兑换 {l} Token</p>
                    </div>
                    <div style={styles.module}>
                        <h3 style={styles.moduleTitle}>持有 OAX 信息</h3>
                        <p style={styles.text}>当前持有 {x} OAX</p>
                        <p style={styles.text}>可兑换 {y} Token</p>
                    </div>
                    <div style={styles.module}>
                        <input
                            type="number"
                            value={oaxAmount}
                            onChange={(e) => setOaxAmount(e.target.value)}
                            style={styles.input}
                            placeholder="输入兑换数量"
                        />
                        <button style={styles.button} onClick={handleOAXExchange}>使用 OAX 兑换</button>
                    </div>
                </div>

                {/* 下半部分：模块4、模块5、模块6 */}
                <div style={styles.section}>
                    <div style={styles.module}>
                        <h3 style={styles.moduleTitle}>营销池信息</h3>
                        <p style={styles.text}>待领取营销池 {a} Token</p>
                        <p style={styles.text}>价值 {b} USD</p>
                        <p style={styles.text}>当前每份 OMT 可兑换 {c} Token</p>
                    </div>
                    <div style={styles.module}>
                        <h3 style={styles.moduleTitle}>持有 OMT 信息</h3>
                        <p style={styles.text}>当前持有 {i} OMT</p>
                        <p style={styles.text}>可兑换 {j} Token</p>
                    </div>
                    <div style={styles.module}>
                        <input
                            type="number"
                            value={omtAmount}
                            onChange={(e) => setOmtAmount(e.target.value)}
                            style={styles.input}
                            placeholder="输入兑换数量"
                        />
                        <button style={styles.button} onClick={handleOMTExchange}>使用 OMT 兑换</button>
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
        backgroundColor: '#f7f7f7', // 背景颜色
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
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // 添加阴影效果
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
        padding: '10px',
        width: '100%',
        fontSize: '16px',
        marginBottom: '15px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        boxSizing: 'border-box',
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
    buttonHover: {
        backgroundColor: '#45a049',
    },
};
