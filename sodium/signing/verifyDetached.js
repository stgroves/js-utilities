import { getSodium } from '../getSodium.js';

export const verifyDetached = async (message, signature, publicKey) => {
    const sodium = await getSodium();

    if (!sodium.crypto_sign_verify_detached(signature, message, publicKey))
        throw new Error('Signature verification failed!');
};