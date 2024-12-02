import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'; // 用于获取当前路由

import { useWallet } from '@/pages/WalletContext';
import { useAdmin } from '@/pages/AdminContext';

export default function Navbar() {
    const [selectedButton, setSelectedButton] = useState('');
    // const [isConnected, setIsConnected] = useState(false); // 钱包连接状态
    // const [walletAddress, setWalletAddress] = useState(null); // 钱包地址
    const router = useRouter();

    const { walletAddress, walletClient, isConnected, connectWallet, disconnectWallet } = useWallet(); // 获取钱包地址和钱包对象
    const { isLoggedIn } = useAdmin();

    // 设置选中的按钮
    const handleButtonClick = (buttonName) => {
        setSelectedButton(buttonName);
    };

    // 处理钱包连接
    const handleWalletLogin = async () => {
        connectWallet();
    };

    // 处理钱包断开
    const handleWalletDisconnect = () => {
        disconnectWallet();
    };

    useEffect(() => {
        // 根据当前路径设置高亮按钮
        const path = router.pathname;  // 获取当前路径
        if (path === '/tasks') {
            setSelectedButton('tasks');
        } else if (path === '/assets') {
            setSelectedButton('assets');
        } else if (path === '/ido') {
            setSelectedButton('ido');
        } else if (path === '/admin') {
            setSelectedButton('admin');
            if (isLoggedIn) {
                router.push('/admin_act');
            }

        }
    }, [router.pathname]); // 路由路径变化时重新运行

    return (
        <>
            <nav style={styles.nav}>
                <Link
                    href="/tasks"
                    style={selectedButton === 'tasks' ? styles.selectedLink : styles.link}
                    onClick={() => handleButtonClick('tasks')}
                >
                    任务+分享
                </Link>
                <Link
                    href="/assets"
                    style={selectedButton === 'assets' ? styles.selectedLink : styles.link}
                    onClick={() => handleButtonClick('assets')}
                >
                    资产+兑换
                </Link>
                <Link
                    href="/ido"
                    style={selectedButton === 'ido' ? styles.selectedLink : styles.link}
                    onClick={() => handleButtonClick('ido')}
                >
                    IDO+质押
                </Link>
                <Link
                    href="/admin"
                    style={selectedButton === 'admin' ? styles.selectedLink : styles.link}
                    onClick={() => handleButtonClick('admin')}
                >
                    后台管理
                </Link>

                {/* 钱包连接按钮 */}
                <button
                    style={isConnected ? styles.connectedButton : styles.loginButton}
                    onClick={isConnected ? handleWalletDisconnect : handleWalletLogin}
                >
                    {isConnected ? '推出钱包' : '链接钱包'}
                </button>
            </nav>

            {/* 钱包连接状态标签 */}
            <div style={styles.walletStatusContainer}>
                <div style={styles.walletStatus}>
                    {isConnected
                        ? `已连接钱包：${walletAddress}`
                        : '未连接钱包'}
                </div>
            </div>
        </>
    );
}

const styles = {
    nav: {
        display: 'flex',
        justifyContent: 'space-around',
        padding: '10px',
        background: '#f4f4f4',
        borderBottom: '1px solid #ddd',
    },
    link: {
        padding: '10px 20px',
        textDecoration: 'none',
        color: 'black',
        border: '1px solid #ddd',
        borderRadius: '5px',
        background: '#fff',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    selectedLink: {
        padding: '10px 20px',
        textDecoration: 'none',
        color: 'white',
        border: '1px solid #4CAF50',
        borderRadius: '5px',
        background: '#4CAF50',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    loginButton: {
        padding: '10px 20px',
        cursor: 'pointer',
        border: '1px solid #ddd',
        borderRadius: '5px',
        background: '#007BFF', // 蓝色背景
        color: '#fff',
    },
    connectedButton: {
        padding: '10px 20px',
        cursor: 'pointer',
        border: '1px solid #ddd',
        borderRadius: '5px',
        background: '#FF5733', // 红色背景（表示断开钱包）
        color: '#fff',
    },
    walletStatusContainer: {
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',  // 水平居中
        background: '#fff',
        padding: '10px 20px',
        borderTop: '1px solid #ddd',
        textAlign: 'center',
        boxShadow: '0 -2px 5px rgba(0, 0, 0, 0.1)',  // 微妙的阴影效果
        width: '100%',
        zIndex: 1000,  // 确保在顶部显示
    },
    walletStatus: {
        fontSize: '14px',
        color: '#555',
    },
};
