import { validations } from "../../utils/constants";

export const validateParameter = (inputParameters, validationRules, key, compareToKey = undefined) => {
    for (let rule = 0; rule < validationRules.length; rule++) {
        switch (validationRules[rule]) {
            case validations.mustBeRequired:
                if (!isKeyPresent(inputParameters, key)) {
                    return { message: `${key} is required` };
                }
                break;
            case validations.mustNotBeEmpty:
                if (isValueEmpty(inputParameters, key)) {
                    return { message: `${key} cannot be empty` };
                }
                break;
            case validations.mustBeString:
                if (!isValueString(inputParameters, key)) {
                    return { message: `${key} must be of type string` };
                }
                break;
            case validations.mustBeValidEmail:
                if (!isValueValidEmail(inputParameters, key)) {
                    return { message: `${key} must be of valid email format` };
                }
                break;
            case validations.mustNotBeEmptyBody:
                if (inputParameters == undefined || Object.keys(inputParameters).length == 0) {
                    return { message: "request body is required" };
                }
                break;
            case validations.mustBeValidPassword:
                if (!isValidPassword(inputParameters, key)) {
                    return { message: `${key} must contain atleast one upercase letter, one lowercase, one special character and contain at least 8 character` }
                }
                break;
            case validations.MustBeEqualValue:
                if (!isEqual(inputParameters, key, compareToKey)) {
                    return { message: `${key} and ${compareToKey} do not match` }
                }
                break;
        }
    }
}

function isKeyPresent(jsonBody, key) {
    // Check if the key exists in the JSON body
    return jsonBody && jsonBody.hasOwnProperty(key);
}

function isValueEmpty(jsonBody, key) {
    // Check if the key exists and its value is empty
    if (isKeyPresent(jsonBody, key)) {
        const value = jsonBody[key];
        return value === null || value === undefined || value === '';
    }
    // If the key does not exist, consider it as having an empty value
    return true;
}

function isValueString(jsonBody, key) {
    // Check if the key exists and its value is a string
    if (isKeyPresent(jsonBody, key)) {
        return typeof jsonBody[key] === 'string';
    }
    // Return false if the key does not exist
    return false;
}

function isValidJsonObject(jsonBody) {
    // Check if the input is an object
    if (typeof jsonBody !== 'object' || jsonBody === null || Array.isArray(jsonBody)) {
        return false; // Not a valid object
    }

    return true; // Valid JSON object
}

function isValueValidEmail(jsonBody, key) {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if the key exists and its value matches the email format
    if (isKeyPresent(jsonBody, key)) {
        const value = jsonBody[key];
        return typeof value === 'string' && emailRegex.test(value);
    }
    // Return false if the key does not exist
    return false;
}

export const convertKeysToLowercase = (jsonBody) => {
    if (!isValidJsonObject) {
        return jsonBody; // Return as is if it's not an object
    }

    const lowercaseJson = {};

    // Iterate through the keys and convert them to lowercase
    for (const key in jsonBody) {
        if (isKeyPresent(jsonBody, key)) {
            const lowerCaseKey = key.toLowerCase();
            lowercaseJson[lowerCaseKey] = jsonBody[key];
        }
    }

    return lowercaseJson;
}

export const trimWhiteSpaceObjectValue = (obj) => {
    if (typeof obj === "object") {
        Object.keys(obj).map(key => {
            if (obj[key] && typeof obj[key] === "object")
                trimWhiteSpaceObjectValue(obj[key]);
            else if (typeof obj[key] === "string")
                obj[key] = obj[key].trim();
        });
    }
    return obj;
}

function isValidPassword(jsonBody, key) {
    // Regular expression to check the password criteria
    if (isKeyPresent(jsonBody, key)) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

        // Test the password against the regular expression
        return passwordRegex.test(jsonBody[key]);
    }
}

function isEqual(jsonBody, key, compareToKey) {
    if (isKeyPresent(jsonBody, key) && isKeyPresent(jsonBody, compareToKey)) {
        return jsonBody[key] === jsonBody[compareToKey]
    }
    return false
}

