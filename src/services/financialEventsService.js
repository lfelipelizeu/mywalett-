import jwt from "jsonwebtoken";
import * as financialEventsRepository from "../repositories/financialEventsRepository.js";

function validateToken(token) {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    return user;
}

function isFinancialEventValid(body) {
    const { value, type } = body;

    if (['INCOME', 'OUTCOME'].includes(type) && value > 0 ) return true;
    return false;
}

async function createFinancialEvent(userId, body) {
    await financialEventsRepository.insertFinancialEvent(userId, body);
}

async function searchFinancialEvents(userId) {
    const financialEvents = await financialEventsRepository.selectFinancialEvents(userId);
    return financialEvents;
}

function sumFinancialEvents(events) {
    const sum = events.reduce((total, event) => event.type === 'INCOME' ? total + event.value : total - event.value, 0);
    return sum;
}

export {
    validateToken,
    isFinancialEventValid,
    createFinancialEvent,
    searchFinancialEvents,
    sumFinancialEvents,
}
