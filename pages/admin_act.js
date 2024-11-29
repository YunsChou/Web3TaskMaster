import { useState } from 'react';

export default function AdminAct() {
    // 控制左侧菜单选项的状态
    const [selectedPage, setSelectedPage] = useState('addTask');

    // 控制输入框的状态
    const [taskName, setTaskName] = useState('');
    const [taskDetails, setTaskDetails] = useState('');
    const [rewardToken, setRewardToken] = useState('');
    const [ethValue, setEthValue] = useState('');
    const [ethInjection, setEthInjection] = useState('');

    // 处理新增任务
    const handleAddTask = () => {
        console.log('任务名称:', taskName);
        console.log('任务细节:', taskDetails);
        console.log('奖励Token数:', rewardToken);
        console.log('任务Coin价值:', ethValue);
        alert(`任务名称：${taskName}\n任务细节：${taskDetails}\n奖励Token数：${rewardToken}\n任务Coin价值：${ethValue}`);
    };

    // 处理注入收益
    const handleInjectProfit = () => {
        console.log('注入收益Coin数量:', ethInjection);
        alert(`注入收益Coin数量：${ethInjection}`);
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
                            <textarea
                                value={taskDetails}
                                onChange={(e) => setTaskDetails(e.target.value)}
                                style={styles.textarea}
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
    textarea: {
        width: '100%',
        padding: '10px',
        marginTop: '5px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        minHeight: '100px',
        backgroundColor: '#fafafa',
        color: '#333',
        fontSize: '16px',
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
};
