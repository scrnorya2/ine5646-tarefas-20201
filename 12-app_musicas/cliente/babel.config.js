/* eslint-disable no-undef */
const presets = [
  [ 
        "@babel/preset-flow"
  ],	
  [
    '@babel/preset-env',
    {
      useBuiltIns: 'usage',
      corejs: 3,
      debug: true,
      targets: {
        firefox: '66',
        chrome: '70'
      }
    }
  ],
  [
    '@babel/preset-react'
  ]
]

const plugins = [
  '@babel/plugin-transform-runtime'
]

module.exports = { presets, plugins }
