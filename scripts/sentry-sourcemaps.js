require('dotenv').config();

const { execSync } = require('child_process');

const command = `sentry-cli sourcemaps inject --org ${process.env.SENTRY_ORG} --project ${process.env.SENTRY_PROJECT} ./build && sentry-cli sourcemaps upload --org ${process.env.SENTRY_ORG} --project ${process.env.SENTRY_PROJECT} ./build`;

execSync(command, { stdio: 'inherit' });
