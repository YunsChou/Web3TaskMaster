import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'; // 用于获取当前路由

export default function Navbar() {
    const [selectedButton, setSelectedButton] = useState('');
    const router = useRouter();

    // 设置选中的按钮
    const handleButtonClick = (buttonName) => {
        setSelectedButton(buttonName);
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
        }
    }, [router.pathname]); // 路由路径变化时重新运行

    return (
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
            <button style={styles.button}>钱包登录</button>
        </nav>
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
        transition: 'background-color 0.3s ease', // 添加过渡效果
    },
    selectedLink: {
        padding: '10px 20px',
        textDecoration: 'none',
        color: 'white',
        border: '1px solid #4CAF50',
        borderRadius: '5px',
        background: '#4CAF50', // 选中的背景色
        cursor: 'pointer',
        transition: 'background-color 0.3s ease', // 添加过渡效果
    },
    button: {
        padding: '10px 20px',
        cursor: 'pointer',
        border: '1px solid #ddd',
        borderRadius: '5px',
        background: '#fff',
    },
};
