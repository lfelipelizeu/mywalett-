import connection from "../database.js";

async function insertFinancialEvent(userId, body) {
    const { value, type } = body;
    await connection.query(
        `INSERT INTO "financialEvents" ("userId", "value", "type") VALUES ($1, $2, $3)`,
        [userId, value, type]
    );
}

async function selectFinancialEvents(userId) {
    const result = await connection.query(
        `SELECT * FROM "financialEvents" WHERE "userId"=$1 ORDER BY "id" DESC`,
        [userId]
    );
    return result.rows;
}

export {
    insertFinancialEvent,
    selectFinancialEvents,
}
