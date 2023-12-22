const jwt = require('jsonwebtoken');
const jwtPassword = "secret";
const zod = require('zod');

const schema = zod.object({
    username: zod.string().email(),
    password: zod.string().min(6)
});

function signJwt(username, password) {
    const usernameResponse = schema.safeParse({username, password});
    const passwordResponse = schema.safeParse({username, password});
    if (usernameResponse.error || passwordResponse.error) {
        return null;
    }
    const signature = jwt.sign({username}, jwtPassword)
    return signature;
}


function decodeJwt(token) {
    const decoded = jwt.decode(token);
    if (!decoded) {
        return false;
    } else {
        return true;
    }
}

function verifyJwt(token) {
    try {
        const verified = jwt.verify(token, jwtPassword);
        return true;
    } catch (err) {
        return false;
    }
}


module.exports = {
    signJwt,
    verifyJwt,
    decodeJwt,
    jwtPassword
}