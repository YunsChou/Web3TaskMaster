import { WalletProvider } from '../contexts/WalletContext';
import { SignatureProvider } from '../contexts/SignatureContext';
import { AdminProvider } from '../contexts/AdminContext';

import Navbar from '../components/Navbar';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <WalletProvider>
        <SignatureProvider>
          <AdminProvider>
            {/* 全局导航栏 */}
            <Navbar />

            {/* 当前页面内容 */}
            <Component {...pageProps} />
          </AdminProvider>
        </SignatureProvider>
      </WalletProvider>
    </div>
  );
}

export default MyApp;
