### Wear Api

api for https://github.com/stewartrule/veera

## Setup the database

run `knex migrate:latest` (tested with mysql en postgres)

## Seed the database

First add a bunch of (fashion related) images to the `public/images` folder.

run `knex seed:run`

## Run api

run `yarn dev`
