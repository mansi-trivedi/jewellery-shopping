import bcrypt from 'bcrypt';
// const { InformativeError } = require('../utils/error')

export const hashPassword = async (password) => {
    try {
        let saltRound = 10;
        let salt = await bcrypt.genSalt(saltRound);
        let hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword
    }
    catch (error) {
        throw new Error(error.message)
    }
}

export const verifyPassword = async (password, hashedPassword) => {
    const result = await bcrypt.compare(password, hashedPassword);
    return result
}