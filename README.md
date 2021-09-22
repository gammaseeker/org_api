# Organization API

Heroku URL: https://org-api-deploy.herokuapp.com/

## Setup

1. Make sure postgreSQL is on your machine (https://www.postgresql.org/download/)
2. Clone this project
3. Set up a `.env` file in the root of this project with the following variables
   PORT= the port you want node js to run on
   PG_USER= the postgres user
   PG_HOST= the postgres host (localhost if you are developing locally)
   PG_DATABASE= name of the database you're accessing
   PG_PASSWORD= postgres password
   PG_PORT=5432
4. Run `npm install` from your root
5. To run tests run `npm run test`
6. To start up the project run `npm start`

## Schema Design

### Organization Table

There is only one table called `Organization` defined as:

```
    ID serial PRIMARY KEY,
    OrgName varchar(255) NOT NULL,
    StartDate date NOT NULL,
    NumEmployees int NOT NULL,
    Public boolean NOT NULL
```

All organization records will have an auto increment ID. If the Public field is true, then the organization is public. If it is false, then the organization is private.

## APIs Design

### GET Organization

The `getOrganizations` function expects a request in the format:

```
{
    orgName:        string,
    startDate:      date string in the format "yyyy-mm-dd",
    numEmployees:   int,
    isPublic:       boolean
}
```

Fields in the request may also be null which indicates that there is no criteria by that field to search for.
This endpoint will return any organization rows matching the criteria specified in the request.
If all fields are null, then the endpoint will return all rows in the organization table.

### POST Organization

The `createOrganization` function expects a request in the format:

```
{
    orgName:        string,
    startDate:      date string in the format "yyyy-mm-dd",
    numEmployees:   int,
    isPublic:       boolean
}
```

Where no field can be null. This endpoint will create a new organization record with the data provided in the request.

## Future Features

Some low hanging fruit for additional features for this project could be:

- Build a UI to interface with the APIs
- PUT route to edit organization info (orgs can change names, can also transition from private to public, change number of employees)
- DELETE route to delete an organization that doesn't exist anymore
- The ability to generate data analytics from organization records (e.g. Average number of employees in an org, how many orgs were started within a year etc.)
