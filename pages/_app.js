import Navbar from '../components/Navbar';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <div>
      {/* 全局导航栏 */}
      <Navbar />

      {/* 当前页面内容 */}
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;

