module.exports = {
    lintOnSave: false,
    devServer: {
        port: process.env.NODE_ENV == "production" ? 8000 : 8099,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8099/edu',
                // 允许跨域
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}