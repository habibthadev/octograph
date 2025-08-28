#!/bin/bash

# Vercel Project Setup Script for OctoGraph
# This script helps set up and manage Vercel projects for the monorepo

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Vercel CLI is installed
check_vercel_cli() {
    if ! command -v vercel &> /dev/null; then
        print_error "Vercel CLI is not installed. Please install it first:"
        echo "npm install -g vercel"
        exit 1
    fi
}

# Check if user is logged in to Vercel
check_vercel_login() {
    if ! vercel whoami &> /dev/null; then
        print_error "You are not logged in to Vercel. Please login first:"
        echo "vercel login"
        exit 1
    fi
}

# Setup project function
setup_project() {
    local project_name=$1
    local project_path=$2

    print_status "Setting up Vercel project: $project_name"

    cd "$project_path"

    # Check if project already exists
    if vercel link --yes --project "$project_name" --token "$VERCEL_TOKEN" 2>/dev/null; then
        print_success "Project '$project_name' already exists and is linked"
    else
        print_warning "Project '$project_name' doesn't exist. Creating new project..."

        # Create new project without VERCEL_ORG_ID to avoid the error
        unset VERCEL_ORG_ID
        if vercel --token "$VERCEL_TOKEN" --yes; then
            print_success "Project '$project_name' created successfully"
            # Re-set VERCEL_ORG_ID if it was set
            if [ -n "$ORIGINAL_VERCEL_ORG_ID" ]; then
                export VERCEL_ORG_ID="$ORIGINAL_VERCEL_ORG_ID"
            fi
        else
            print_error "Failed to create project '$project_name'"
            return 1
        fi
    fi

    cd - > /dev/null
}

# Deploy project function
deploy_project() {
    local project_name=$1
    local project_path=$2
    local is_prod=${3:-false}

    print_status "Deploying $project_name..."

    cd "$project_path"

    if [ "$is_prod" = true ]; then
        print_status "Deploying to production..."
        vercel --prod
    else
        print_status "Deploying to preview..."
        vercel
    fi

    cd - > /dev/null
}

# Main function
main() {
    local command=${1:-"setup"}
    local target=${2:-"all"}

    print_status "OctoGraph Vercel Deployment Script"
    print_status "Command: $command, Target: $target"

    check_vercel_cli
    check_vercel_login

    # Save original VERCEL_ORG_ID
    ORIGINAL_VERCEL_ORG_ID="$VERCEL_ORG_ID"

    # Get the root directory of the monorepo
    local root_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
    cd "$root_dir"

    case $command in
        "setup")
            case $target in
                "docs")
                    setup_project "octograph-docs" "apps/docs"
                    ;;
                "example")
                    setup_project "octograph-example" "apps/example"
                    ;;
                "all")
                    setup_project "octograph-docs" "apps/docs"
                    setup_project "octograph-example" "apps/example"
                    ;;
                *)
                    print_error "Invalid target. Use: docs, example, or all"
                    exit 1
                    ;;
            esac
            ;;
        "deploy")
            case $target in
                "docs")
                    deploy_project "octograph-docs" "apps/docs" true
                    ;;
                "example")
                    deploy_project "octograph-example" "apps/example" true
                    ;;
                "all")
                    deploy_project "octograph-docs" "apps/docs" true
                    deploy_project "octograph-example" "apps/example" true
                    ;;
                *)
                    print_error "Invalid target. Use: docs, example, or all"
                    exit 1
                    ;;
            esac
            ;;
        "preview")
            case $target in
                "docs")
                    deploy_project "octograph-docs" "apps/docs" false
                    ;;
                "example")
                    deploy_project "octograph-example" "apps/example" false
                    ;;
                "all")
                    deploy_project "octograph-docs" "apps/docs" false
                    deploy_project "octograph-example" "apps/example" false
                    ;;
                *)
                    print_error "Invalid target. Use: docs, example, or all"
                    exit 1
                    ;;
            esac
            ;;
        *)
            print_error "Invalid command. Use: setup, deploy, or preview"
            echo ""
            echo "Usage:"
            echo "  $0 setup [docs|example|all]     - Setup Vercel projects"
            echo "  $0 deploy [docs|example|all]    - Deploy to production"
            echo "  $0 preview [docs|example|all]   - Deploy to preview"
            exit 1
            ;;
    esac

    print_success "Operation completed successfully!"
}

# Run main function with all arguments
main "$@"
