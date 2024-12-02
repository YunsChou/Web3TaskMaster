import { createContext, useContext, useState, useEffect } from 'react';
import { createWalletClient, createPublicClient, custom, http } from 'viem';
import { sepolia } from 'viem/chains';

// 创建 WalletContext
const WalletContext = createContext();

// 创建一个 WalletProvider 组件来提供钱包信息
export const WalletProvider = ({ children }) => {
    const [walletAddress, setWalletAddress] = useState(null); // 存储钱包地址
    const [walletClient, setWalletClient] = useState(null);  // 存储钱包对象
    const [isConnected, setIsConnected] = useState(false); // 钱包连接状态
    const [publicClient, setPublicClient] = useState(null);

    // 检查钱包是否已连接
    const checkWalletConnection = async () => {
        if (typeof window.ethereum !== 'undefined') {
            try {
                // 请求已连接的钱包地址
                const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                if (accounts.length > 0) {
                    // 如果钱包已连接，设置钱包地址
                    setWalletAddress(accounts[0]);
                    setIsConnected(true);

                    // 创建钱包客户端
                    const w_client = createWalletClient({
                        chain: sepolia,
                        transport: custom(window.ethereum),
                    });
                    setWalletClient(w_client);
                    console.log('钱包客户端初始化成功setWalletClient');
                } else {
                    setWalletAddress(null);
                    setIsConnected(false);
                }
            } catch (error) {
                console.error('钱包连接检查失败:', error);
            }
        }
    };

    // 连接钱包
    const connectWallet = async () => {
        try {
            console.log('Attempting wallet login...');

            // 检查 window.ethereum 是否存在
            if (typeof window.ethereum !== 'undefined') {
                // 请求用户授权连接钱包
                await window.ethereum.request({ method: 'eth_requestAccounts' });

                // 创建钱包客户端
                const w_client = createWalletClient({
                    chain: sepolia,
                    transport: custom(window.ethereum),
                });
                setWalletClient(w_client);
                console.log('钱包客户端初始化成功setWalletClient');

                // 获取钱包地址
                const [address] = await w_client.getAddresses();
                setWalletAddress(address);
                console.log('钱包地址:', address);
                setIsConnected(true); // 更新钱包连接状态

                // 刷新页面
                window.location.reload();
            } else {
                console.error('请安装 MetaMask 或其他支持的以太坊钱包');
                alert('请安装 MetaMask 或其他支持的以太坊钱包');
            }
        } catch (error) {
            console.error('钱包登录失败:', error);
            alert('钱包登录失败');
        }
    };

    // 断开钱包
    const disconnectWallet = () => {
        setWalletAddress(null);
        setWalletClient(null); // 断开钱包时清空钱包对象
        setIsConnected(false); // 更新钱包断开状态
    };

    // 监听钱包地址变化（如切换钱包）
    useEffect(() => {
        // 仅在首次加载时检查钱包连接
        checkWalletConnection();

    }, []); // 空数组表示仅在组件加载时执行一次

    // 初始化公共客户端
    useEffect(() => {
        try {
            const p_client = createPublicClient({
                chain: sepolia, // 使用Sepolia网络
                transport: http(),
            });
            setPublicClient(p_client);

            console.log('公共客户端初始化成功');
        } catch (error) {
            console.error('公共客户端初始化失败:', error);
        }

    }, []); // 空数组表示仅在组件加载时执行一次

    return (
        <WalletContext.Provider value={{ walletAddress, walletClient, isConnected, publicClient, connectWallet, disconnectWallet }}>
            {children}
        </WalletContext.Provider>
    );
};

// 自定义 hook，方便在其他组件中使用钱包信息
export const useWallet = () => {
    return useContext(WalletContext);
};
