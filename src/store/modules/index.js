import camelCase from 'lodash/camelCase'

const requireModule = require.context('.', true, /\.js$/)

const modules = {}

requireModule.keys().forEach(fileName => {
  if (fileName === './index.js') return

  const moduleName = camelCase(fileName.replace(/(\.\/|\.js|index)/g, ''))

  if (fileName.includes('index.js')) {
    modules[moduleName] = requireModule(fileName).default
  }
  if (fileName.includes('todoGroupForUsers.js')) {
    modules[moduleName] = requireModule(fileName).default
  }
})
export default modules
