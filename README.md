# Init the app - first time

### Run on command line:

`./scripts/resetInstallUsingLockedVersions.bash`

#### Note

This command is installing the app by not proceeding the versions defined in yarn.lock.
Reason is that the latest version updates of some packages is not working,
so that bug has to be fixed before the latest versions can be used.

### Start the simulator, on the command line:

`./go.bash`

# Various info 👇

# Expo (Go)

## update Expo Server

eas update

## Check installed versions and expo environment info

npx expo-env-info

## Expo used version

yarn info expo version -> not showing used version, it's installed version
Used version:

```
    app.json:
    {
        "expo": {
            "sdkVersion": "49.0.0",
            ...
```

## General version info

npm why expo-constants

## Check Expo problems

npx expo-doctor

# Firebase

Add to .env file:

```
APIKEY=xyz..
AUTHDOMAIN=xyz..
DATABASEURL=xyz..
PROJECTID=xyz..
STORAGEBUCKET=xyz..
MESSAGINGSENDERID=xyz..
APPID=xyz..
```

# Security

brew install detect-secrets
detect-secrets scan
TODO: add this scan on pre-commit to github

# Yarn

## Versions

get list of all installed packages

`npm list --depth=0`

Single package

`yarn list --pattern <package>`

or

`yarn info <package> version`

## Yarn workspace dependency that can not be hoisted

### instead of (package.json) :

```
"nohoist": [
"**/react-native",
"**/react-native/**",
"**/react-native-scripts",
"**/react-native-scripts/**",
"**/expo",
"**/expo/**",
"**/jest-expo",
"**/jest-expo/**"
]
```

add configure dep management in metro.config.js

etc ...

### this fixes:

https://www.npmjs.com/package/expo-yarn-workspaces

# install packages

npx expo install --yarn

# GIT

## fetch new content from git submodules

git submodule update --recursive --remote
