import { convertKeysToLowercase, trimWhiteSpaceObjectValue, validateParameter } from './validationLayer';
import { validations } from '../utils/constants';
import { ValidationError } from '../utils/error';

export const registerValidation = (inputParametrs) => {
    lowerCaseObject = convertKeysToLowercase(inputParametrs)
    inputParametrs = trimWhiteSpaceObjectValue(inputParametrs)
    const error = validateParameter(inputParametrs, [
        validations.mustNotBeEmptyBody,
        validations.mustBeValidRequestBody
    ], 'body')

    if (error) {
        throw new ValidationError(error)
    }

    let errors = [];
    let err;
    err = validateParameter(inputParametrs, [
        validations.mustBeRequired,
        validations.mustNotBeEmpty,
        validations.mustBeValidEmail
    ], 'email');

    if (err) { errors.push(err) }

    err = validateParameter(inputParametrs, [
        validations.mustBeRequired,
        validations.mustNotBeEmpty,
        validations.mustBeValidPassword
    ], 'password')
    if (err) { errors.push(err) }

    err = validateParameter(inputParametrs, [
        validations.mustBeRequired,
        validations.mustNotBeEmpty,
        validations.MustBeEqualValue
    ], 'confirmPassword', 'password')
    if (err) { errors.push(err) }

    err = validateParameter(inputParametrs, [
        validations.mustBeRequired,
        validations.mustNotBeEmpty,
        validations.mustBeString
    ], 'firstname')
    if (err) { errors.push(err) }

    err = validateParameter(inputParametrs, [
        validations.mustBeRequired,
        validations.mustNotBeEmpty,
        validations.mustBeString
    ], 'lastname')
    if (err) { errors.push(err) }

    if (errors.length > 0) {
        throw new ValidationError(errors)
    }

    return inputParametrs;
}

export const loginValidation = (inputParametrs) => {
    lowerCaseObject = convertKeysToLowercase(inputParametrs)
    inputParametrs = trimWhiteSpaceObjectValue(inputParametrs)
    let error = validateParameter(inputParametrs, [
        validations.mustNotBeEmptyBody,
        validations.mustBeValidRequestBody
    ], 'body')

    if (error) {
        throw new ValidationError(error)
    }

    let errors = [];
    let err;

    err = validateParameter(inputParametrs, [
        validations.mustBeRequired,
        validations.mustNotBeEmpty,
        validations.mustBeValidEmail
    ], 'email')
    if (err) { errors.push(err) }

    err = validateParameter(inputParametrs, [
        validations.mustBeRequired,
        validations.mustNotBeEmpty,
        validations.mustBeValidPassword
    ], 'password')
    if (err) { errors.push(err) }

    if (errors.length > 0) {
        throw new ValidationError(errors)
    }

    return inputParametrs
}