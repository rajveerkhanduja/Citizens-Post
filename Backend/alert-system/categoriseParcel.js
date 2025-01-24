const axios = require('axios');
const fs = require('fs').promises;

// Function to fetch JSON data
async function fetchJSON(file) {
    const data = await fs.readFile(file, 'utf-8');
    return JSON.parse(data);
}

// Function to categorize delivery
async function categorizeDelivery({
    fromState,
    fromDistrict,
    toState,
    toDistrict,
    deliveryType
}) {
    const deliveryData = await fetchJSON('CitizenCharterDaysData.json');
    const metroAndCapitalData = await fetchJSON('CitizenCharterMetroAndCapitalData.json');

    const deliveryCategory = deliveryData.Delivery[deliveryType];
    let category;
    let days;

    if (
        metroAndCapitalData.MetroCities.includes(fromDistrict) &&
        metroAndCapitalData.MetroCities.includes(toDistrict)
    ) {
        category = "Metro to Metro";
        days = deliveryCategory.MetroToMetro;
    } else if (
        metroAndCapitalData.StateCapitals.includes(fromDistrict) &&
        metroAndCapitalData.StateCapitals.includes(toDistrict)
    ) {
        category = "State Capital to State Capital";
        days = deliveryCategory.StateCapitalToStateCapital;
    } else if (fromState !== toState) {
        category = "Rest of Country";
        days = deliveryCategory.RestOfCountry;
    } else if (fromDistrict !== toDistrict) {
        category = "Same State";
        days = deliveryCategory.SameState;
    } else {
        category = "Local";
        days = deliveryCategory.Local;
    }

    return { category, days };
}

// Main function to read location data and categorize delivery
async function main() {
    try {
        // Read location data from location.json
        const locationData = await fetchJSON('location.json');

        // Extract required information
        const {
            origin: { state: fromState, district: fromDistrict },
            destination: { state: toState, district: toDistrict }
        } = locationData;

        // Define the delivery type (modify as needed)
        const deliveryType = 'RegisteredLetter'; // Example delivery type

        // Categorize delivery
        const deliveryCategory = await categorizeDelivery({
            fromState,
            fromDistrict,
            toState,
            toDistrict,
            deliveryType
        });

        // Save the categorized delivery data to parcelCategory.json
        await fs.writeFile('parcelCategory.json', JSON.stringify(deliveryCategory, null, 2));
        console.log('parcelCategory.json has been saved with the categorized delivery data.');
    } catch (error) {
        console.error('Error:', error);
    }
}

// Run the main function
main();
