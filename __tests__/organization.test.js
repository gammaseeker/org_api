const orgController = require("../controllers/organization");
const appTestInstance = require("../app");
const supertest = require("supertest");
const request = supertest(appTestInstance);

describe("Testing request validation function", () => {
  test("Valid request, should respond with true", () => {
    const req = {
      orgName: "test org",
      startDate: "2020-01-01",
      numEmployees: 100,
      isPublic: true,
    };
    const result = orgController.validateRequest(req);
    expect(result).toBe(true);
  });

  test("Invalid request due to non-string orgName, should respond with false", () => {
    const req = {
      orgName: 123,
      startDate: "2020-01-01",
      numEmployees: 100,
      isPublic: true,
    };
    const result = orgController.validateRequest(req);
    expect(result).toBe(false);
  });

  test("Invalid request due to non-date startDate, should respond with false", () => {
    const req = {
      orgName: "test org",
      startDate: "this should be a date",
      numEmployees: 100,
      isPublic: true,
    };
    const result = orgController.validateRequest(req);
    expect(result).toBe(false);
  });

  test("Invalid request due to non-numeric numEmployees, should respond with false", () => {
    const req = {
      orgName: "test org",
      startDate: "2020-01-01",
      numEmployees: "this should be a number",
      isPublic: true,
    };
    const result = orgController.validateRequest(req);
    expect(result).toBe(false);
  });

  test("Invalid request due to non-boolean isPublic, should respond with false", () => {
    const req = {
      orgName: "test org",
      startDate: "2020-01-01",
      numEmployees: 100,
      isPublic: "this should be a boolean",
    };
    const result = orgController.validateRequest(req);
    expect(result).toBe(false);
  });
});

describe("Testing POST organization endpoint", () => {
  it("Responds with invalid input", async () => {
    const resp = await request.post("/organizations").send({
      orgName: 123,
      startDate: "this should be a date",
      numEmployees: -200,
      isPublic: false,
    });

    expect(resp.status).toBe(400);
  });
  it("Responds with successful creation", async () => {
    const resp = await request.post("/organizations").send({
      orgName: "mock org",
      startDate: "2020-01-01",
      numEmployees: 200,
      isPublic: true,
    });

    expect(resp.status).toBe(201);
    expect(resp).not.toBeNull();
  });
});

describe("Testing GET organization endpoint", () => {
  it("Responds with invalid input status 400", async () => {
    const resp = await request.get("/organizations").send({
      orgName: 123,
      startDate: "this should be a date",
      numEmployees: -200,
      isPublic: false,
    });

    expect(resp.status).toBe(400);
  });

  it("Responds with a row", async () => {
    const resp = await request.get("/organizations").send({
      orgName: "mock org",
      startDate: "2020-01-01",
      numEmployees: 200,
      isPublic: true,
    });

    expect(resp.status).toBe(200);
    expect(resp).not.toBeNull();
  });
});
