import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as userRepository from "../repositories/userRepository.js";

async function isTheEmailRegistered(email) {
    const user = await userRepository.searchEmail(email);
    return user;
}

async function createUser(body) {
    const hashedPassword = bcrypt.hashSync(body.password, 12);
    await userRepository.insertUser(body, hashedPassword);
}

function validatePassword(receivedPassword, databasePassword) {
    return bcrypt.compareSync(receivedPassword, databasePassword);
}

function createToken(userId) {
    const token = jwt.sign({
        id: userId,
    }, process.env.JWT_SECRET);
    return token;
}

export {
    isTheEmailRegistered,
    createUser,
    validatePassword,
    createToken,
};
