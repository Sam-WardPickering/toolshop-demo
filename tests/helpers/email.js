import { randomUUID } from "node:crypto";

export function generateValidEmail() {
    return `sam${randomUUID().slice(0,8)}@email.com`;
};
