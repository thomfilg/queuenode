#!/bin/bash

# Exit on error
set -e

echo "===== Setting up Node.js environment ====="

# Update system packages
echo "Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install curl if not already installed
echo "Installing curl..."
sudo apt install curl -y

# Enable corepack for pnpm support
echo "Enabling corepack..."
corepack enable

# Check if nvm is installed
if [ ! -d "$HOME/.nvm" ]; then
  echo "Installing nvm (Node Version Manager)..."
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
  
  # Load nvm without restarting the terminal
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
else
  echo "nvm is already installed."
  # Make sure nvm is loaded
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
fi

# Install Node.js LTS version
echo "Installing Node.js LTS version..."
nvm install --lts
nvm use --lts

# Set up pnpm package manager
echo "Setting up pnpm package manager..."
corepack prepare pnpm@latest --activate
corepack use pnpm@10

# Print versions for verification
echo "===== Setup Complete ====="
echo "Node.js version: $(node -v)"
echo "npm version: $(npm -v)"
echo "pnpm version: $(pnpm -v)"

echo "===== Node.js environment is ready! ====="