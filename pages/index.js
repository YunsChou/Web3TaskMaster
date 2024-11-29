export default function HomePage() {
  return (
    <main style={{ padding: '20px' }}>
      <h1>欢迎来到主页</h1>
      <p>点击导航栏按钮切换到不同页面。</p>
    </main>
  );
}

// import { useAccount } from 'wagmi'; // 从 wagmi 获取账户信息

// export default function HomePage() {
//   const { isConnected, address } = useAccount(); // 获取连接状态和地址

//   return (
//     <main style={{ padding: '20px' }}>
//       <h1>欢迎来到主页</h1>
//       <p>点击导航栏按钮切换到不同页面。</p>
//       <p>
//         {isConnected ? `已连接钱包: ${address}` : '尚未连接钱包'}
//       </p>
//     </main>
//   );
// }
