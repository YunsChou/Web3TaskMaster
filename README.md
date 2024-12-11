This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.

## 计划功能

#### 钱包登录
1、viem钱包登录、退出
2、RainbowKit钱包登录、退出

#### Permit领取OMT
1、Permit
2、Permit2


#### 兑换


#### IDO


#### 质押

#### 合约升级
1、透明代理
2、uups

#### 将同一个合约地址部署到多个evm网络
1、create2


#### 使用一些工具
1、TheGraph
2、chainlink
3、Dune
4、Tenderly


## 出现的问题
#### viem 和 solidity 生成的 EIP-191 签名结果不一致
如下代码：
1、在viem中生成 打包消息、签名消息，和 solidity 生成的结果一致
2、问题出在viem的signAccount.signMessage上，在 viem 中 signMessage 会默认加上 EIP-191 前缀
之前使用const messageBytes = toBytes(messageHash2); 会导致签名结果不一致
修改后，直接省略 viem 代码中的第2步，即const messageBytes = toBytes(messageHash1)，signAccount.signMessage签名和solidity生成结果一致

```
// 第1步：打包消息（包含方法签名和参数）
const encodeMessage1 = encodePacked(
    ["string", "address", "uint256", "uint256"],
    [methodSignature, walletAddress, clainAmount, expirationTime]
);

// 使用 keccak256 计算消息哈希
const messageHash1 = keccak256(encodeMessage1);
console.log("-->> messageHash1:", messageHash1);

// 第2步：根据 EIP-191 签名消息规则，添加前缀
const encodeMessage2 = encodePacked(
    ["string", "bytes32"],
    [`\x19Ethereum Signed Message:\n32`, messageHash1]
);

// 使用 keccak256 计算消息哈希
const messageHash2 = keccak256(encodeMessage2);
console.log("-->> messageHash2:", messageHash2);

// 第3步：使用私钥签名消息
// 确保 messageHash 是一个字节数组
const messageBytes = toBytes(messageHash1);
console.log("-->> messageBytes:", messageBytes);
const signature = await signAccount.signMessage({ message: { raw: messageBytes } });
console.log('签名结果:', signature);
// 解析签名r s v
const { r, s, v } = parseSignature(signature);
console.log("-->> v:", v);
console.log("-->> r:", r);
console.log("-->> s:", s);
```

```
// 第1步：打包消息
bytes32 msgHash = keccak256(abi.encodePacked("premitClaimOMT(address,uint256,uint256)", addr, amount, deadline));
console.log("--- msgHash ---");
console.logBytes32(msgHash);
// 第2步：签名消息，根据 EIP-191 签名消息规则，添加前缀
bytes32 ethSignHash = MessageHashUtils.toEthSignedMessageHash(msgHash);
console.log("--- ethSignHash ---");
console.logBytes32(ethSignHash);
// 第3步：使用私钥签名，获取 v r s
(uint8 v, bytes32 r, bytes32 s) = vm.sign(privateKey, ethSignHash);
console.log("--- v r s ---");
console.log(v);
console.logBytes32(r);
console.logBytes32(s);
// 使用 v r s 拼接签名
require(v == 27 || v == 28, "Invalid v value");
bytes memory signature = abi.encodePacked(r, s, v);
console.log("--- signature ---");
console.logBytes(signature);
```


#### 使用 Tenderly 查看交易失败问题
交易失败的hash: 0xcf4cfed6c5a0e1f856732a6ced1a8f9fec65ebbed8783bceb39150ba44ae2fc6
在sepolia浏览器上，只能看到交易失败没有具体信息
将该交易hash输入到Tenderly，根据指引导入开源代码，可以查看交易失败的具体代码位置
https://dashboard.tenderly.co/tx/sepolia/0xcf4cfed6c5a0e1f856732a6ced1a8f9fec65ebbed8783bceb39150ba44ae2fc6/debugger?trace=0.2.2
从这里能定位到具体的代码报错 mint
```
modifier onlyAdmin() {
    require(admins[msg.sender] || msg.sender == owner(), invalidAdmin());
    _;
} 

function mint(address to, uint256 amount) public onlyAdmin {
    _mint(to, amount);
}
```
因为还没在OMToken合约上将PlayerPlatform合约地址设为管理员，所以无法mint
在sepolia浏览器上，使用发布EOA帐户操作OMToken合约添加管理员地址，之后点击领取可以mint成功




