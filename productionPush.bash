#!/bin/bash
ng build --prod --output-path docs --base-href pokedex
cp docs/index.html docs/404.html
git add .  
read -p "Commit description: " desc  
git commit -m "$desc"  
git push origin master