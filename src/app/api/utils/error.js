"use client";
import { errorType } from "./constants";

export class ValidationError extends Error {
    constructor(message) {
        let formattedMessage = Array.isArray(message)
            ? JSON.stringify(message)
            : JSON.stringify([message]);
        super(formattedMessage);
        this.name = errorType.ValidationError;
        Error.captureStackTrace(this, ValidationError);
    }
}

export class InformativeError extends Error {
    constructor(message) {
        super(message);
        this.name = errorType.InformativeError;
        Error.captureStackTrace(this, InformativeError);
    }
}
