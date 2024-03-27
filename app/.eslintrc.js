module.exports = {
  root: true,
  extends: ['universe/native'],
  plugins: ['react-hooks'],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js'],
      rules: {
        '@typescript-eslint/no-shadow': 'off',
        'react-native/no-inline-styles': 'off',
        curly: 'off',
        'no-shadow': 'off',
        'no-undef': 'off',
        'react/react-in-jsx-scope': 'off',
        semi: ['error', 'never'],
        'react-hooks/exhaustive-deps': ['warn'],
      },
    },
  ],
}
