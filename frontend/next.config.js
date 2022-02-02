module.exports = {
  reactStrictMode: true,
  // swcMinify: false,

  // 画像をローカルホスト,backコンテナから取得できるようにする
  images: {
    domains: ['localhost', 'back'],
  }
}
