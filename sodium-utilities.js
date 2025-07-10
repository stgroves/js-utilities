import sodium from 'libsodium-wrappers';

const encrypt = async (message, recipientPublicKey, senderPrivateKey) => {
    await sodium.ready;

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

const encryptAnonymous = async (message, recipientPublicKey) => {
    await sodium.ready;

    return sodium.crypto_box_seal(sodium.from_string(message), recipientPublicKey);
}

const decrypt = async (encrypted, nonce, senderPublicKey, recipientPrivateKey) => {
    await sodium.ready;

    return sodium.crypto_box_open_easy(encrypted, nonce, senderPublicKey, recipientPrivateKey);
}

const decryptAnonymous = async (encrypted, recipientPublicKey, recipientPrivateKey) => {
    await sodium.ready;

    const messageBytes = sodium.crypto_box_seal_open(
        encrypted,
        recipientPublicKey,
        recipientPrivateKey
    );

    if (!messageBytes) {
        throw new Error('Decryption failed — invalid key pair or corrupted sealed message!');
    }

    return sodium.to_string(messageBytes);
};

const signDetached = async (message, privateKey) => {
    await sodium.ready;

    return sodium.crypto_sign_detached(sodium.from_string(message), privateKey);
};

const verifyDetached = async (message, signature, publicKey) => {
    await sodium.ready;

    if (!sodium.crypto_sign_verify_detached(signature, message, publicKey))
        throw new Error('Signature verification failed!');
};

const signCombined = async (message, privateKey) => {
    await sodium.ready;

    return sodium.crypto_sign(message, privateKey);
};

const verifyCombined = async (message, publicKey) => {
    await sodium.ready;

    return sodium.crypto_sign_open(message, publicKey);
}

const decodeBase64 = async (value) => {
    await sodium.ready;

    return sodium.from_base64(value, sodium.base64_variants.ORIGINAL);
}

const encodeBase64 = async (value) => {
    await sodium.ready;

    return sodium.to_base64(value, sodium.base64_variants.ORIGINAL);
}

export const SodiumUtilities = Object.freeze({
    encrypt,
    decrypt,
    encryptAnonymous,
    decryptAnonymous,
    signDetached,
    verifyDetached,
    signCombined,
    verifyCombined,
    decodeBase64,
    encodeBase64
});