#!/bin/bash

rm -rf node_modules src/rn-components/node_modules src/rne-firebase/node_modules
yarn cache clean
yarn install --frozen-lockfile
npx expo install --check