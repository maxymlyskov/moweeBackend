const jwt = require('jsonwebtoken')
const config = require('config')

function auth (req, res, next) {
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send('Could not retrieve a token.')
    

    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'))
        req.user = decoded
        console.log(decoded)
        next()
    } 
    catch (error) {
        res.status(400).send('Invalid token')
        console.log(error)
    }   
}

module.exports = auth