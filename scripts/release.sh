#!/bin/sh
rm -v -rf !(".git"|"out"|"scripts") 
rm -v -rf @(".gitignore"|".github"|".idea"|".vscode") 
cp -a ./out/. ./
rm -rf ./out