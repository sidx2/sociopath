const jwt = require('jsonwebtoken');

module.exports = async function(req, res, next) {
    // Get token from header
    const token = await req.header('x-auth-token');
    console.log("token: ", token)
        // Check if no token
    if (!token) {
        console.log({ msg: 'No token, authorization denied' });
    }

    // Verify token
    try {
        // jwt.verify("dfsf", )
        jwt.verify(token, "secret", (error, decoded) => {
            if (error) {
                console.log({ msg: 'Token is not valid' });
            } else {
                req.user = decoded.user;
                console.log("decoded: ", decoded)
                console.log("calling next()")
                next();
                console.log("called next()")
            }
        });

        console.log("finished try block");
    } catch (err) {
        console.log("inside catch block");
        console.log('something wrong with auth middleware');
        console.log({ msg: 'Server Error' });
    }
    console.log("finished catch block");


};

// console.log("eof middleware.js");