import * as userService from "../services/userService.js";

async function signUp(req, res) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) return res.sendStatus(400);

    try {
        const emailAlreadyRegistered = await userService.isTheEmailRegistered(email);
        if (emailAlreadyRegistered) return res.sendStatus(409);

        await userService.createUser(req.body);

        return res.sendStatus(201);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

async function signIn(req, res) {
    const { email, password } = req.body;

    if (!email || !password) return res.sendStatus(400);

    try {
        const user = await userService.isTheEmailRegistered(email);

        if (!user || !userService.validatePassword(password, user?.password)) return res.sendStatus(401);

        const token = userService.createToken(user.id);

        res.send({
            token,
        });
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export {
    signUp,
    signIn,
};
