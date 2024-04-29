/** @type {import('next').NextConfig} */
// const app2Url = process.env.SUPPORT_APP_URL;

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com", "i.ibb.co"],
  },
  future: {
    webpack5: true, // by default, if you customize webpack config, they switch back to version 4.
    // Looks like backward compatibility approach.
  },
  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback, // if you miss it, all the other options in fallback, specified
      // by next.js will be dropped. Doesn't make much sense, but how it is
      fs: false, // the solution
    };
    return config;
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/support/dashboard/:match*",
  //       destination: `${app2Url}/:match*`,
  //     },
  //   ];
  // },
};

export default nextConfig;
