#!/bin/bash
npm install
export NODE_ENV=production
git config user.name "Rusith"
git config user.email "rusith@mail.com"
git checkout release
npm run lint
npm run build
npm run export
shopt -s extglob
rm -rf !(".git"|"out"|"scripts"|".gitignore") 
rm -rf @(".github"|".idea"|".vscode") 
cp -a ./out/. ./
rm -rf ./out