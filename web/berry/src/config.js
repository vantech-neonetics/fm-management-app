const config = {
  // basename: 仅在构建时设置，并且不要在 BASENAME 的末尾添加'/'，也不要只使用'/'，应该使用空白('')
  // 例如 '/berry-material-react/react/default'
  basename: '/',
  defaultPath: '/panel/dashboard',
  fontFamily: `'Roboto', sans-serif, Helvetica, Arial, sans-serif`,
  borderRadius: 12,
  siteInfo: {
    chat_link: '',
    display_in_currency: true,
    email_verification: false,
    footer_html: '',
    github_client_id: '',
    github_oauth: false,
    logo: '',
    quota_per_unit: 500000,
    server_address: '',
    start_time: 0,
    system_name: 'One API',
    top_up_link: '',
    turnstile_check: false,
    turnstile_site_key: '',
    version: '',
    wechat_login: false,
    wechat_qrcode: ''
  }
};

export default config;