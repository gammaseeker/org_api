import { RequestHandler, Request, Response } from "express";
import pool from "../database";

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
export const validateRequest = (req: any) => {
  const orgName = req.orgName;
  const startDate = new Date(req.startDate);
  const numEmployees = req.numEmployees;
  const isPublic = req.isPublic;

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
export const getOrganizations: RequestHandler = (
  req: Request,
  res: Response
) => {
  const payload = req.body;
  if (!validateRequest(payload)) {
    res
      .status(400)
      .send(
        "Please format request correctly. You may also have illegal values (e.g. negative number of employees)"
      );
  } else {
    let orgName = payload.orgName ? payload.orgName.trim() : null;
    let startDate = payload.startDate;
    let numEmployees = payload.numEmployees;
    let isPublic = payload.isPublic;

    const values = [orgName, startDate, numEmployees, isPublic];
    let query = `SELECT * FROM organization 
  WHERE ($1::text IS NULL OR OrgName = $1::text)
  AND ($2::date IS NULL OR StartDate = $2::date) 
  AND ($3::int IS NULL OR NumEmployees = $3::int) 
  AND ($4::boolean IS NULL OR Public = $4::boolean)`;

    pool.query(query, values, (err: any, results: any) => {
      if (err) {
        res
          .status(500)
          .send({
            message: "Server error, contact developer.",
            error: err.stack,
          });
      } else {
        res.status(200).json(results.rows);
      }
    });
  }
};

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
export const createOrganization: RequestHandler = (
  req: Request,
  res: Response
) => {
  const payload = req.body;
  if (!validateRequest(payload)) {
    res
      .status(400)
      .send(
        "Please format request correctly. You may also have illegal values (e.g. negative number of employees)"
      );
  } else {
    const values = [
      payload.orgName,
      payload.startDate,
      payload.numEmployees,
      payload.isPublic,
    ];
    pool.query(
      "INSERT INTO organization VALUES (DEFAULT, $1, $2, $3, $4)",
      values,
      (err: any, results: any) => {
        if (err) {
          res
            .status(500)
            .send({
              message: "Server error, contact developer.",
              error: err.stack,
            });
        } else {
          res.status(201).send("OK");
        }
      }
    );
  }
};
