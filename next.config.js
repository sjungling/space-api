module.exports = {
  swcMinify: false,
  images: {
    domains: ["res.cloudinary.com"],
  },
  pageExtensions: ["page.tsx"],
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader",
    });

    return config;
  },
};
