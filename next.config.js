module.exports = {
    reactStrictMode: true,
    webpack: (config) => {
        config.module.rules.push({
            exclude: /node_modules/,
            test: /\.(vs|fs|glsl|vert|frag)$/,
            type: "asset/source",
        });
        return config;
    },
}
