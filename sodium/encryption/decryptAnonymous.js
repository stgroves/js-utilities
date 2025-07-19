import { getSodium } from '../getSodium.js';

export const decryptAnonymous = async (encrypted, recipientPublicKey, recipientPrivateKey) => {
    const sodium = await getSodium();

    const messageBytes = sodium.crypto_box_seal_open(
        encrypted,
        recipientPublicKey,
        recipientPrivateKey
    );

    if (!messageBytes)
        throw new Error('Decryption failed — invalid key pair or corrupted sealed message!');

    return sodium.to_string(messageBytes);
};