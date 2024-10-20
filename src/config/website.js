/**
 * 全局配置文件
 */
export default {
  title: "saber",
  indexTitle: "Saber Admin",
  clientId: "saber", // 客户端id
  clientSecret: "saber_secret", // 客户端密钥
  tenantMode: true, // 是否开启租户模式
  captchaMode: true, // 是否开启验证码模式
  logo: "S",
  key: "saber", //配置主键,目前用于存储
  lockPage: "/lock",
  tokenTime: 100,
  //http的status默认放行不才用统一处理的,
  statusWhiteList: [],
  //配置首页不可关闭
  isFirstPage: false,
  fistPage: {
    label: "首页",
    value: "/wel/index",
    params: {},
    query: {},
    meta: {
      i18n: "dashboard",
    },
    group: [],
    close: false,
  },
  //配置菜单的属性
  menu: {
    iconDefault: "iconfont icon-caidan",
    props: {
      label: "name",
      path: "path",
      icon: "source",
      children: "children",
    },
  },
  //auth配置
  auth: {
    // 使用后端工程 @org.springblade.test.Sm2KeyGenerator 获取
    publicKey:
      "04d5c7316518514dd1913ee08dc2326e3436e279644bbd1b0cb6e7d3e336cd32d07f5c5ba85c4903e96f56180652a977199f44375845786ba0675314543272bbbf",
  },
  // 授权地址
  authUrl: "http://localhost/blade-auth/oauth/render",
  // 报表设计器地址(cloud端口为8108,boot端口为80)
  reportUrl: "http://localhost:8108/ureport",
};
