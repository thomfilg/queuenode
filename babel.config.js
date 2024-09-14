module.exports = (api) => {
  api.cache(true);
  return {
    presets: [
      [
        "@babel/preset-env", {
          targets: { node: "current" },
        },
      ],
      '@babel/preset-typescript',
    ],
    ignore: ["**/*.json"],
    plugins: [
      "@babel/plugin-proposal-do-expressions",
      "@babel/plugin-proposal-export-default-from",
      "@babel/plugin-proposal-logical-assignment-operators",
      "@babel/plugin-proposal-nullish-coalescing-operator",
      "@babel/plugin-proposal-optional-chaining",
      [
        "module-resolver",
        {
          root: ["./"],
          extensions: [".ts", ".js", ".json"],
          alias: {
            "socket.io/broadcast-operator":
              "./node_modules/socket.io/dist/broadcast-operator.js", // Needed to spy emit events
            "internal-backend-assets": "./assets",
          },
        },
      ],
    ],
  };
};
