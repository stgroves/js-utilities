import sodium from 'libsodium-wrappers';

let cached = null;

export const getSodium = async () => {
    if (!cached) {
        await sodium.ready;
        cached = sodium;
    }
    return cached;
};