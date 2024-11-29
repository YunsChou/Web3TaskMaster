// pages/admin.js
import React, { useState } from 'react';

import { useRouter } from 'next/router';

export default function AdminPage() {
    const router = useRouter();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // 处理登录按钮点击事件
    const handleLogin = (e) => {
        e.preventDefault();
        // alert(`帐号: ${username}, 密码: ${password}`);

        router.push('/admin_act');  // 点击登录按钮跳转到 admin_act.js
    };

    return (
        <div style={styles.container}>
            <main style={styles.main}>
                {/* 显示“登录”文字，居中偏上 */}
                <h1 style={styles.title}>登录</h1>

                {/* 输入帐号和密码的输入框 */}
                <form onSubmit={handleLogin} style={styles.form}>
                    <div style={styles.inputGroup}>
                        <label htmlFor="username" style={styles.label}>帐号：</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="请输入帐号"
                            style={styles.input}
                            required
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label htmlFor="password" style={styles.label}>密码：</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="请输入密码"
                            style={styles.input}
                            required
                        />
                    </div>

                    {/* 登录按钮 */}
                    <button type="submit" style={styles.button}>登录</button>
                </form>
            </main>
        </div>
    );
}

// 更新后的样式
const styles = {
    container: {
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f2f5', // 背景色改为浅灰色
    },
    main: {
        textAlign: 'center',
        width: '100%',
        maxWidth: '400px',
        backgroundColor: '#fff',  // 背景色改为白色，确保输入框文字可见
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    title: {
        marginBottom: '20px',
        fontSize: '2em',
        color: '#333',  // 文字颜色深灰
        fontWeight: 'bold',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    label: {
        fontSize: '1em',
        color: '#555',  // 字体颜色稍浅
        marginBottom: '5px',
    },
    input: {
        padding: '12px',
        width: '100%',
        fontSize: '1.1em',
        border: '1px solid #ccc',
        borderRadius: '5px',
        outline: 'none',
        backgroundColor: '#f9f9f9',  // 输入框背景色
        color: '#333', // 输入框文字颜色
        boxSizing: 'border-box',
    },
    button: {
        padding: '12px',
        backgroundColor: '#4CAF50',  // 按钮颜色为绿色
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        fontSize: '1.1em',
        cursor: 'pointer',
        boxSizing: 'border-box',
        transition: 'background-color 0.3s ease',
    },
    buttonHover: {
        backgroundColor: '#45a049', // 按钮悬浮时颜色变化
    },
};

