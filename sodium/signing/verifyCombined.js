import { getSodium } from '../getSodium.js';

export const verifyCombined = async (message, publicKey) => {
    const sodium = await getSodium();

    return sodium.crypto_sign_open(message, publicKey);
}