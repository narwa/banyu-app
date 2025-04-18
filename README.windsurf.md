# Banyu App - Windsurf Deployment Guide

## Overview

This document provides instructions for deploying the Banyu App using Windsurf. Windsurf is a deployment platform that simplifies the process of deploying Nuxt.js applications to production environments.

## Prerequisites

- Node.js 18.20.4 or higher
- PNPM 9 or higher
- Windsurf CLI installed (`npm install -g windsurf-cli`)
- Windsurf account and project setup

## Configuration Files

The following files are used to configure the Windsurf deployment:

- `windsurf.config.js` - Main configuration file for Windsurf
- `.windsurf/deploy.yml` - Deployment configuration for different environments
- `Dockerfile.windsurf` - Docker configuration for containerized deployment
- `server/routes/_health.ts` - Health check endpoint for monitoring

## Deployment Environments

### Production

The production environment is automatically deployed from the `main` branch. It is accessible at:

- https://banyu-app.com
- https://www.banyu-app.com

### Staging

The staging environment is automatically deployed from the `develop` branch. It is accessible at:

- https://staging.banyu-app.com

### Preview

Preview environments are automatically created for pull requests. They have a time-to-live (TTL) of 7 days.

## Manual Deployment

To manually deploy the application using Windsurf CLI:

```bash
# Login to Windsurf
windsurf login

# Deploy to staging
windsurf deploy --env staging

# Deploy to production
windsurf deploy --env production
```

## Environment Variables

The following environment variables are required for deployment:

- `NODE_ENV` - Environment (production, staging, development)
- `NUXT_PUBLIC_API_BASE_URL` - Base URL for API requests
- `DEPLOY_WEBHOOK_URL` - (Optional) Webhook URL for deployment notifications

## Monitoring

The application includes a health check endpoint at `/_health` that returns the current status of the application. Windsurf uses this endpoint to monitor the health of the deployed application.

## Troubleshooting

### Common Issues

1. **Build Failures**

    - Check the build logs for errors
    - Ensure all dependencies are properly installed

2. **Health Check Failures**

    - Verify the application is running correctly
    - Check the health check endpoint is returning a 200 status code

3. **Performance Issues**
    - Review the monitoring metrics in the Windsurf dashboard
    - Check for memory leaks or high CPU usage

## Support

For additional support with Windsurf deployments, contact the DevOps team or refer to the [Windsurf documentation](https://docs.windsurf.io).
