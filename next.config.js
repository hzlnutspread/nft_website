/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "i.seadn.io",
      "lh3.googleusercontent.com",
      "allstars.forms.aifa.football",
    ],
  },
};

module.exports = nextConfig;
