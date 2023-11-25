const index = require('./app')

const port = process.env.PORT || 5000

index.listen(port, () => {
    console.log('🚀 Server is running')
})