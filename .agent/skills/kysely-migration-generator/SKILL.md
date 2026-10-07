---
name: kysely-migration-generator
description: Generates Kysely database migrations from Mermaid ERDs. Use when converting an ER diagram, data model, or database architecture into a Kysely migration.
---

# Kysely Migration Generator

Convert a Mermaid ERD into a valid Kysely migration. Follow the structure and conventions already used in the project's existing migrations.

## Migration Workflow

Follow these steps sequentially.

1. **Read the ERD**: Read `docs/architecture/schema.mmd` and identify entities, attributes, primary keys, foreign keys, and relationship cardinalities.
2. **Inspect Existing Migrations**: Read `src/db/migrations/001_initial_schema.ts` and follow the same Kysely structure and conventions.
3. **Map Entities to Tables**: Convert Mermaid entity names to snake_case table names.
4. **Map Keys and Relationships**:
   - Convert primary keys to auto-generated IDs using the existing project convention.
   - Convert foreign keys to `.references()` with `.onDelete("cascade")`.
   - For `||--o{`, place the foreign key on the many side.
   - For `||--o|`, add a unique constraint to the foreign key.
5. **Generate Migration**: Write the migration to `src/db/migrations/<timestamp>_<migration_name>.ts`.
6. **Create Migration Functions**: Export both `up(db: Kysely<any>)` and `down(db: Kysely<any>)`.
7. **Dependency Ordering**: Create tables in dependency order and drop them in reverse dependency order.
8. **Validate the Migration**: Run `npm run build`, then run `npm run migrate:up`.
9. **Correct Errors**: If either command fails because of the generated migration, fix the migration and retry.

## Gotchas & Rules

- Do not recreate tables that already exist in earlier migrations.
- The `users` table already exists and should only be referenced through foreign keys.
- Do not modify existing migration files.
- Use the junction table defined in the ERD for many-to-many relationships.
- Use appropriate PostgreSQL/Kysely types for Mermaid attributes.
- Do not report success until both `npm run build` and `npm run migrate:up` succeed.
- Map Mermaid types consistently: `int` -> `integer`, `string` -> `varchar` or `text`, `date` -> `date`, and `timestamp` -> `timestamp`, following the existing migration style when possible.