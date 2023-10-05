module.exports = {
  arrowParens: 'avoid',
  bracketSameLine: true,
  bracketSpacing: false,
  singleQuote: true,
  tabWidth: 2,
  printWidth: 120,
  trailingComma: 'es5',

  _comment_: 'the 2 followings keys are for lib @trivago/prettier-plugin-sort-imports',
  importOrder: [
    '^react$',
    '^react-native$',
    '^@react', // Third-party modules starting with "@react"
    '^react', // Third-party modules starting with "react"
    '^[^@.]', // Third-party modules not starting with "@"
    '^@[^/]+?/', // Modules starting with "@" and a single directory
    '^\\.\\./', // Relative parent directories
    '^\\./', // Relative current directory
  ],
  importOrderSortSpecifiers: true,
};

// module.exports = {
//   trailingComma: 'es5',
//   tabWidth: 4,
//   printWidth: 120,
//   singleQuote: true,

// };
