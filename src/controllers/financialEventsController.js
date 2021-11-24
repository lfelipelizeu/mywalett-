import * as financialEventsService from "../services/financialEventsService.js";

async function createFinancialEvent(req, res) {
    const authorization = req.headers.authorization || "";
    const token = authorization.split('Bearer ')[1];

    if (!token) return res.sendStatus(401);

    let user;

    try {
        user = financialEventsService.validateToken(token);
    } catch {
        return res.sendStatus(401);
    }

    const { value, type } = req.body;
  
    if (!value || !type) return res.sendStatus(400);
    if (!financialEventsService.isFinancialEventValid(req.body)) return res.sendStatus(400);

    try {
        await financialEventsService.createFinancialEvent(user.id, req.body);

        res.sendStatus(201);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

async function getFinancialEvents(req, res) {
    const authorization = req.headers.authorization || "";
    const token = authorization.split('Bearer ')[1];
  
    if (!token) return res.sendStatus(401);

    let user;

    try {
        user = financialEventsService.validateToken(token);
    } catch {
        return res.sendStatus(401);
    }

    try {
        const events = await financialEventsService.searchFinancialEvents(user.id);

        res.send(events);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

async function getFinancialEventsSum(req, res) {
    const authorization = req.headers.authorization || "";
    const token = authorization.split('Bearer ')[1];
  
    if (!token) return res.sendStatus(401);

    let user;

    try {
        user = financialEventsService.validateToken(token);
    } catch {
        return res.sendStatus(401);
    }

    try {
        const events = await financialEventsService.searchFinancialEvents(user.id);

        const sum = financialEventsService.sumFinancialEvents(events);

        res.send({
            sum,
        });
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export {
    createFinancialEvent,
    getFinancialEvents,
    getFinancialEventsSum,
};
