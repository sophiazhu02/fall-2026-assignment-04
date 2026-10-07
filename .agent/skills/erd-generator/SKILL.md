---
name: erd-generator
description: Generates and validates Mermaid entity-relationship diagrams when the user asks to design an ERD, database schema, data model, or architecture diagram.
---

# ERD Generator

Generate a Mermaid entity-relationship diagram from the user's domain requirements.

## Workflow

1. Parse the user's requirements and identify:
   - entities
   - attributes
   - primary keys
   - foreign keys
   - relationships
   - relationship cardinalities

2. Use explicit business rules from the user's prompt to resolve ambiguity. Do not invent relationships that contradict the stated requirements.

3. Write the Mermaid ER diagram directly to:

   `docs/architecture/schema.mmd`

4. Use valid Mermaid `erDiagram` syntax.

5. Validate and render the ERD by running:

   `node .agent/skills/erd-generator/scripts/render_erd.js docs/architecture/schema.mmd`

6. If the command succeeds and prints `SUCCESS`, the ERD is valid.

7. If the command fails and prints `SYNTAX_ERROR:`, inspect the error output, correct the Mermaid syntax in `docs/architecture/schema.mmd`, and run the validation command again.

8. Retry the correction and validation process up to 3 times.

9. After successful validation:
   - present the raw Mermaid ERD source to the user
   - reference the generated SVG at `docs/architecture/erd.svg`

## ERD Rules

- Use `PK` to identify primary keys.
- Use `FK` to identify foreign keys.
- Use `||--o{` for one-to-many relationships.
- Use `||--o|` for one-to-one relationships where the related record is optional.
- Use junction entities when a many-to-many relationship requires one.
- Include attributes needed to support the business rules described by the user.
- Keep entity and attribute names consistent throughout the diagram.
- Do not report success unless the renderer produces `SUCCESS`.