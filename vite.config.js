import vue from '@vitejs/plugin-vue'

export default {
    server: {
        port: 8081
    },
    base: './',
    plugins: [vue()],
    optimizeDeps: {
        include: ['schart.js']
    }
}