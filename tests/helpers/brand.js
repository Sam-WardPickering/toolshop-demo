import { randomUUID } from "node:crypto";

export function getUniqueBrandName() {
    return `sams brand ${randomUUID().slice(0,8)}`;
};

export function getUniqueBrandSlug() {
    return `sams-brand-${randomUUID().slice(0,8)}`;
}
