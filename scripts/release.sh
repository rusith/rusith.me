#!/bin/sh
npm install
export NODE_ENV=production
npm run lint
npm run build
npm run export
git config user.name "Rusith"
git config user.email "rusith@mail.com"
git checkout -b release
git pull origin release
rm -v -rf !(".git"|"out"|"scripts") 
rm -v -rf @(".gitignore"|".github"|".idea"|".vscode") 
cp -a ./out/. ./
rm -rf ./out
git add .