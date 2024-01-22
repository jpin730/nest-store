# Nest Store

NestJS-based REST API backend that emulates an e-commerce store. Using Swagger Open API for documentation and it connects to a PostgreSQL database through TypeORM including migrations.

## Installation

```bash
npm install
```

## Running the app

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## Documentation

Swagger Open API Reference in root endpoint `/`

## PGAdmin

For use PGAdmin, you need to run the following command:

```bash
docker-compose up -d
```

Then, you can access to PGAdmin in <http://localhost:5050> and login with the credentials specified in `docker-compose.yml` file.

For stop PGAdmin, you need to run the following command:

```bash
docker-compose down
```

To connect to the database, you need to create a new server in PGAdmin with the following parameters:

> In deployed app, the database is hosted in ElephantSQL and it's used as reference for the following parameters.

- Name: Name of the set up, for example `elephant_sql_[database_name]`.
- Host name/address: Hostname of the database, similar to: `something.db.elephantsql.com`.
- Port: Port to the database, 5432.
- Maintenance DB: The name of your database, somethin like: `roxvyxky`.
- Username: Username for your database, somethin like: `roxvyxky`.
- Password: Password for your database.

For generate migrations, you need to run the following command:

```bash
npm run migrations:generate -- src/database/migrations/[MIGRATION_NAME]
```

For run migrations, you need to run the following command:

```bash
npm run migrations:run
```

For show migrations, you need to run the following command:

```bash
npm run migrations:show
```

## Deployment

App deployed on: <https://nest-store-c3oo.onrender.com>.
