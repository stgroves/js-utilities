import { getSodium } from '../getSodium.js';

export const decodeBase64 = async (value) => {
    const sodium = await getSodium();

    return sodium.from_base64(value, sodium.base64_variants.ORIGINAL);
}