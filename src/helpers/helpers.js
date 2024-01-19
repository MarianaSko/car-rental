export function getCityAndCountry(address) {
    const addressParts = address.split(", ");
    const city = addressParts[addressParts.length - 2];
    const country = addressParts[addressParts.length - 1];
    return { city, country }
}