#!/bin/bash
rm -rf !(".git"|"out"|"scripts") 
rm -rf @(".gitignore"|".github"|".idea"|".vscode") 
cp -a ./out/. ./
rm -rf ./out