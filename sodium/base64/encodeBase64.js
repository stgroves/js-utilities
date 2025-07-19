import { getSodium } from '../getSodium.js';

export const encodeBase64 = async (value) => {
    const sodium = await getSodium();

    return sodium.to_base64(value, sodium.base64_variants.ORIGINAL);
}