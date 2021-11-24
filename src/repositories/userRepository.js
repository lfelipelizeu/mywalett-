import connection from "../database.js";

async function searchEmail(email) {
    const existingUserWithGivenEmail = await connection.query(
        `SELECT * FROM "users" WHERE "email"=$1`,
        [email]
    );
    return existingUserWithGivenEmail.rows[0];
}

async function insertUser(body, password) {
    const { name, email } = body;

    await connection.query(
        `INSERT INTO "users" ("name", "email", "password") VALUES ($1, $2, $3)`,
        [name, email, password]
    );
}

export {
    searchEmail,
    insertUser,
};
