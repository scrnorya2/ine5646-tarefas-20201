const presets = [
  ['@babel/preset-flow'],
  [
    '@babel/preset-env',
    {
      'targets': {
        'node': 'current'
      }
    }
  ]
]

module.exports = { presets }