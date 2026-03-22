#!/bin/bash
# Run this script in your terminal to push code to GitHub
# You will be prompted for your GitHub username and password (use a Personal Access Token as password)

cd "$(dirname "$0")"

echo "Pushing to https://github.com/frankgeorge/canvas ..."
git branch -M main
git push -u origin main

echo ""
echo "If authentication failed:"
echo "1. Go to: https://github.com/settings/tokens"
echo "2. Generate new token (classic) with 'repo' scope"
echo "3. When prompted: Username = frankgeorge, Password = paste your token"
