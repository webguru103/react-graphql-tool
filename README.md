## Development

No server-side rendering.

`yarn start:dev`
Runs envCheck.js to copy .env file from .env.sample if it is missing.
Parcel compiles with hot reloading.

`yarn lint:watch`
Runs linting alone.

`yarn test:watch`
Runs Jest test runner in watch mode.

`yarn start:devwatch`
start:dev, linting and tests with hot reloading, together.

## Production

`yarn build`
Runs envCheck.js to copy .env file from .env.sample if it is missing.
Builds /dist

`yarn start:prod`
Builds /dist and runs `node server.js` to serve files in /dist.

## Language Files

Babel auto-generates default language files in a component heirarchy in lang-defaults/.

It generates these for files that import react-intl.

After babel has created this folder, use:

`yarn langbuild`

To generate default en-US language file en.json.

The en.json file in src/lang will be created/regenerated based on all id fields in lang-defaults/.

For now, alternative language files can be copy/pasted from en.json file and changed. In the future, these should autogenerate based on changes to the default en.json file.

## ENV Variables

Set env variables in .env, according to .env.sample in the root directory.

HTTP_ENDPOINT - graphql endpoint

STATIC_SERVER - root directory of the static server. For dev purposes, localhost:1235 is set up to serve assets from assets/ directory.

GTMID - Google tag manager ID

WS_ENDPOINT - graphql subscriptions endpoint
