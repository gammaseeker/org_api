"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrganization = exports.getOrganizations = exports.validateRequest = void 0;
var database_1 = __importDefault(require("../database"));
/**
 * Validates request schema by ensuring values are legal.
 * Values can be null or their respective data types.
 * numEmployees cannot be < 0.
 * @param req is the request body. Must have:
 * {
 *  orgName:        string,
 *  startDate:      date string in the format "yyyy-mm-dd",
 *  numEmployees:   int,
 *  isPublic:       boolean
 * }
 * @returns
 */
var validateRequest = function (req) {
    var orgName = req.orgName;
    var startDate = new Date(req.startDate);
    var numEmployees = req.numEmployees;
    var isPublic = req.isPublic;
    if (typeof orgName !== "string") {
        if (orgName !== null) {
            return false;
        }
    }
    if (isNaN(startDate.getTime())) {
        if (startDate !== null) {
            return false;
        }
    }
    if (numEmployees < 0) {
        return false;
    }
    if (typeof numEmployees !== "number") {
        if (numEmployees !== null) {
            return false;
        }
    }
    if (typeof isPublic !== "boolean") {
        if (isPublic !== null) {
            return false;
        }
    }
    return true;
};
exports.validateRequest = validateRequest;
/**
 * Retrieves organizations that fit specified criteria.
 * Values in the schema can be null or their respective data types.
 * If all values in the schema are null, then the query will return all organizations.
 * @param req schema
 * {
 *  orgName:        string,
 *  startDate:      date string in the format "yyyy-mm-dd",
 *  numEmployees:   int,
 *  isPublic:       boolean
 * }
 * @param res
 * 200 - Returns json of queried rows
 * 400 - Error message
 * 500 - Error message
 */
var getOrganizations = function (req, res) {
    var payload = req.body;
    if (!exports.validateRequest(payload)) {
        res
            .status(400)
            .send("Please format request correctly. You may also have illegal values (e.g. negative number of employees)");
    }
    else {
        var orgName = payload.orgName ? payload.orgName.trim() : null;
        var startDate = payload.startDate;
        var numEmployees = payload.numEmployees;
        var isPublic = payload.isPublic;
        var values = [orgName, startDate, numEmployees, isPublic];
        var query = "SELECT * FROM organization \n  WHERE ($1::text IS NULL OR OrgName = $1::text)\n  AND ($2::date IS NULL OR StartDate = $2::date) \n  AND ($3::int IS NULL OR NumEmployees = $3::int) \n  AND ($4::boolean IS NULL OR Public = $4::boolean)";
        database_1.default.query(query, values, function (err, results) {
            if (err) {
                res
                    .status(500)
                    .send({
                    message: "Server error, contact developer.",
                    error: err.stack,
                });
            }
            else {
                res.status(200).json(results.rows);
            }
        });
    }
};
exports.getOrganizations = getOrganizations;
/**
 * Create an organization. No fields in the schema can be null.
 * @param req schema
 * {
 *  orgName:        string,
 *  startDate:      date string in the format "yyyy-mm-dd",
 *  numEmployees:   int,
 *  isPublic:       boolean
 * }
 * @param res
 * 201 - Success message
 * 400 - Error message
 * 500 - Error message
 */
var createOrganization = function (req, res) {
    var payload = req.body;
    if (!exports.validateRequest(payload)) {
        res
            .status(400)
            .send("Please format request correctly. You may also have illegal values (e.g. negative number of employees)");
    }
    else {
        var values = [
            payload.orgName,
            payload.startDate,
            payload.numEmployees,
            payload.isPublic,
        ];
        database_1.default.query("INSERT INTO organization VALUES (DEFAULT, $1, $2, $3, $4)", values, function (err, results) {
            if (err) {
                res
                    .status(500)
                    .send({
                    message: "Server error, contact developer.",
                    error: err.stack,
                });
            }
            else {
                res.status(201).send("OK");
            }
        });
    }
};
exports.createOrganization = createOrganization;
