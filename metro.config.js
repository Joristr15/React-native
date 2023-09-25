module.exports = {
  resolver: {
    sourceExts: ['jsx', 'js', 'json', 'ts', 'tsx'], // Ajoutez 'tsx' si vous utilisez TypeScript
  },
  transformer: {
    babelTransformerPath: require.resolve('metro-react-native-babel-transformer'),
  },
  requireConfigFile: false, // Désactive la recherche de fichier de configuration Babel
};
