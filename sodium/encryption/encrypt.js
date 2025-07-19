import { getSodium } from '../getSodium.js';

export const encrypt = async (message, recipientPublicKey, senderPrivateKey) => {
    const sodium = await getSodium();

    const nonce = sodium.randombytes_buf(sodium.crypto_box_NONCEBYTES);

    return {
        nonce,
        encrypted: sodium.crypto_box_easy(
            sodium.from_string(message),
            nonce,
            recipientPublicKey,
            senderPrivateKey
        )
    };
};