import { getSodium } from '../getSodium.js';

export const decrypt = async (encrypted, nonce, senderPublicKey, recipientPrivateKey) => {
    const sodium = await getSodium();

    return sodium.crypto_box_open_easy(encrypted, nonce, senderPublicKey, recipientPrivateKey);
}