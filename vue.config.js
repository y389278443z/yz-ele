

module.exports = {
    publicPath: './',
    indexPath: 'index.html',
    lintOnSave: true, // 是否在保存的时候检查
    productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
    css: {
        sourceMap: false,
    },
    devServer: {
        open: true,
        port: 8080
    }
};

