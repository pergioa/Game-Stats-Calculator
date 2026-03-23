# Arc Damage Calculator

A damage and hits-to-kill calculator for Arc Raiders. Built with Angular 21 (frontend) and ASP.NET Core 10 (backend).

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [.NET SDK](https://dotnet.microsoft.com/download) (v10)
- [Angular CLI](https://angular.dev/tools/cli): `npm install -g @angular/cli`
- [EF Core CLI](https://learn.microsoft.com/en-us/ef/core/cli/dotnet): `dotnet tool install --global dotnet-ef`

## Running the API

```bash
cd ArcDamageCalculator.Api
dotnet run
```

The API starts on `http://localhost:5187`. The SQLite database is created and seeded automatically on first run.

## Running the Angular App

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
  Repositories/            # Data access layer
  Data/                    # EF Core DbContext
  Migrations/              # EF Core migrations
scraping-scripts/          # Data scraping utilities
```

## API Endpoints

| Method | Endpoint        | Description       |
|--------|----------------|-------------------|
| GET    | /api/guns      | Returns all guns  |
| GET    | /api/grenades  | Returns all grenades |
| GET    | /api/shields   | Returns all shields |
