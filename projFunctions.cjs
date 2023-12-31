const CODES = require("./countryCodes.json")

exports.nationData = function nationData(data) {
    let htmlString = "";
    if (data.country && Array.isArray(data.country)) {
        data.country.forEach((entry) => {
            const countryId = CODES[entry.country_id];
            const probability = (entry.probability * 100).toFixed(2);
            htmlString += `<p class='subWrapResult'>${countryId}, ${probability}%</p>`;
        });
    } else {
        htmlString = "<p class='subWrapResult'>No nation data available</p>";
    }
    return htmlString;
};

exports.capitalizeWord = function capitalizeWord(userWord) {
    return userWord ? userWord.charAt(0).toUpperCase() + userWord.slice(1) : "";
};
