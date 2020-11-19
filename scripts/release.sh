#!/bin/bash
npm install
export NODE_ENV=production
git config user.name "Rusith"
git config user.email "rusith@mail.com"
git checkout live
npm run lint || { echo 'linting failed' ; exit 1; }
npm run build || { echo 'build failed' ; exit 1; }
npm run export  || { echo 'export failed' ; exit 1; }
shopt -s extglob
rm -rf !(".git"|"out"|"scripts"|".gitignore"|"sitemap.xml") 
rm -rf @(".github"|".idea"|".vscode") 
cp -a ./out/. ./
rm -rf ./out