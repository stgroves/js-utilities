import { getSodium } from '../getSodium.js';

export const signCombined = async (message, privateKey) => {
    const sodium = await getSodium();

    return sodium.crypto_sign(message, privateKey);
};