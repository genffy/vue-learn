#!/usr/bin/env sh
set -e

# run build
pnpm run docs:build

# git init & push
cd docs/.vuepress/dist

git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:genffy/vue-learn.git master:gh-pages

cd -