// 自动生成路由组件
export default (requireContext) => {
    if (!requireContext || typeof requireContext != 'function' || !requireContext.keys) {
        return []
    }
    // why throw err in broswer `require.context is not a function` when use `require.context` inner function?
    // const requireContext = require.context(
    //     dir,
    //     false,
    //     /\.vue$/
    // )

    const components = requireContext.keys().map(filename => {
        const componentConfig = requireContext(filename)
        return componentConfig.default || componentConfig;
    })

    const routes = [
        { path: '', redirect: 'index', },
    ]
    components.forEach(component => {
        const fileName = component.__file.split('/').pop().replace(/\.vue$/, '');
        routes.push({
            path: `/${fileName}`,
            component,
        })
    });
    return routes;
}