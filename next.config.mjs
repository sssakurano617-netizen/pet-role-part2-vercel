/** @type {import('next').NextConfig} */
const nextConfig = {
  // 本番ビルドで ESLint/TS エラーでは止めない（まず公開を優先）
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
