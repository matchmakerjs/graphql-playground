# Project setup steps

## Add .npmrc
```
@matchmakerjs:registry=https://npm.pkg.github.com/

//npm.pkg.github.com/:_authToken=${GITHUB_USER_TOKEN}

@matchmakerjs:cache=~/dev/.npm-cache/matchmakerjs
```

## Generate matchmaker app
`app-setup add ts ts-lint ts-jest matchmaker`

## Install graphql and typeorm
`npm i graphql type-graphql typeorm @matchmakerjs/matchmaker-typeorm`

## Install sqlite3
`npm i sqlite3 -D`