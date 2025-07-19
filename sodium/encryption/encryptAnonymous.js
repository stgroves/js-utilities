import { getSodium } from '../getSodium.js';

export const encryptAnonymous = async (message, recipientPublicKey) => {
    const sodium = await getSodium();

    return sodium.crypto_box_seal(sodium.from_string(message), recipientPublicKey);
}