import { getSodium } from '../getSodium.js';

export const signDetached = async (message, privateKey) => {
    const sodium = await getSodium();

    return sodium.crypto_sign_detached(sodium.from_string(message), privateKey);
};