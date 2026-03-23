# Arc Damage Calculator

A damage and hits-to-kill calculator for Arc Raiders. Built with Angular (frontend) and ASP.NET Core 10 (backend), backed by PostgreSQL.

## Running with Docker (recommended)

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

### Setup

1. Create a `.env` file in the repo root:

```
POSTGRES_DB=arcdamage
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
```

2. Start all services:

```bash
docker compose up --build
```

The database is created, migrated, and seeded automatically on first run.

| Service  | URL                      |
|----------|--------------------------|
| Frontend | http://localhost:4200    |
| API      | http://localhost:5187    |

## Running Locally

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [.NET SDK](https://dotnet.microsoft.com/download) (v10)
- [Angular CLI](https://angular.dev/tools/cli): `npm install -g @angular/cli`
- [PostgreSQL](https://postgresapp.com/) (v17+)

### API

```bash
cd ArcDamageCalculator.Api
dotnet run
```

The API starts on `http://localhost:5187`. The database is migrated and seeded automatically on first run.

### Angular App

```bash
cd arc-damage-calculator
npm install
ng serve
```

The app starts on `http://localhost:4200`.

## Project Structure

```
arc-damage-calculator/     # Angular frontend
ArcDamageCalculator.Api/   # ASP.NET Core backend
  Controllers/             # API endpoints
  Models/                  # C# data models
  Dtos/                    # API response shapes
  Repositories/            # Data access layer
  Data/                    # EF Core DbContext and seed data
  Migrations/              # EF Core migrations (version controlled)
scraping-scripts/          # Data scraping utilities
```

## API Endpoints

| Method | Endpoint        | Description          |
|--------|----------------|----------------------|
| GET    | /api/guns      | Returns all guns     |
| GET    | /api/grenades  | Returns all grenades |
| GET    | /api/shields   | Returns all shields  |
