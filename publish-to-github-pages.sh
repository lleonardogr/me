#!/bin/bash

# Colors for terminal output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}   GitHub Pages Deployment Script       ${NC}"
echo -e "${BLUE}========================================${NC}"

# Check if portfolio directory exists
if [ ! -d "Portifolio" ]; then
    echo -e "${RED}Error: Portfolio directory not found.${NC}"
    echo "This script should be run from the directory containing the Portifolio folder."
    exit 1
fi

# Navigate to portfolio directory
cd Portifolio

# Check if Git is installed
if ! command -v git &> /dev/null; then
    echo -e "${RED}Error: Git is not installed.${NC}"
    echo "Please install Git before continuing."
    exit 1
fi

# Initialize Git if not already initialized
if [ ! -d ".git" ]; then
    echo -e "${YELLOW}Initializing Git repository...${NC}"
    git init
    echo -e "${GREEN}Git repository initialized.${NC}"
else
    echo -e "${GREEN}Git repository already initialized.${NC}"
fi

# Create .github/workflows directory if it doesn't exist
mkdir -p .github/workflows

# Create GitHub Actions workflow file for GitHub Pages
echo -e "${YELLOW}Creating GitHub Pages deployment workflow...${NC}"
cat > .github/workflows/deploy.yml << 'EOF'
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Setup Pages
        uses: actions/configure-pages@v3
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v1
        with:
          path: '.'
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v1
EOF

echo -e "${GREEN}GitHub Pages workflow created.${NC}"

# Ask for repository details
echo -e "${YELLOW}Please enter your GitHub username:${NC}"
read github_username

echo -e "${YELLOW}Please enter the repository name:${NC}"
read repo_name

# Check if remote origin exists, otherwise add it
if ! git remote get-url origin &> /dev/null; then
    echo -e "${YELLOW}Adding remote origin...${NC}"
    git remote add origin "https://github.com/$github_username/$repo_name.git"
    echo -e "${GREEN}Remote origin added.${NC}"
else
    echo -e "${GREEN}Remote origin already exists.${NC}"
fi

# Add all files to git
echo -e "${YELLOW}Adding files to Git...${NC}"
git add .

# Commit changes
echo -e "${YELLOW}Committing changes...${NC}"
git commit -m "Initial commit for GitHub Pages deployment"

# Create main branch if it doesn't exist
if ! git rev-parse --verify main &> /dev/null; then
    echo -e "${YELLOW}Creating main branch...${NC}"
    git branch -M main
fi

# Push to GitHub
echo -e "${YELLOW}Pushing to GitHub...${NC}"
git push -u origin main

echo -e "${BLUE}========================================${NC}"
echo -e "${GREEN}Deployment setup complete!${NC}"
echo -e "${BLUE}========================================${NC}"
echo -e "Your website will be available at: ${YELLOW}https://$github_username.github.io/$repo_name/${NC}"
echo -e "Note: It may take a few minutes for your site to be published."
echo -e "To finalize setup, go to your repository settings on GitHub:"
echo -e "1. Navigate to Settings > Pages"
echo -e "2. Under 'Build and deployment', ensure 'Source' is set to 'GitHub Actions'"
echo -e "${BLUE}========================================${NC}"
