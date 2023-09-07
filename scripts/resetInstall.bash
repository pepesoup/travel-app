#!/bin/bash

rm yarn.lock src/rn-components/yarn.lock
rm -rf node_modules src/rn-components/node_modules
yarn cache clean
npx expo install --yarn
npx expo install --check