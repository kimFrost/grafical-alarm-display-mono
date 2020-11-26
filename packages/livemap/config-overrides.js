const path = require('path');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');

module.exports = function override(config, env) {
    config.resolve.plugins = config.resolve.plugins.filter(plugin => !(plugin instanceof ModuleScopePlugin));
    //config.resolve.alias['react'] = require.resolve("react")
    config.resolve.alias['react'] = path.resolve('./node_modules/react');
    // will get two weird errors if recoil is not set. 
    //(like "not inside recoil root" and "useRecoilState expred state, but got [object, object]")
    config.resolve.alias['recoil'] = path.resolve('./node_modules/recoil');  
    return config;
}