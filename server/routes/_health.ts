/**
 * Health check endpoint for Windsurf deployment
 * This endpoint is used by the Windsurf platform to verify the application is running correctly
 */

export default defineEventHandler(async (event) => {
    try {
    // You can add additional health checks here, such as database connectivity
    // or other service dependencies

        return {
            status: 'healthy',
            timestamp: new Date().toISOString(),
            version: process.env.npm_package_version || 'unknown',
            environment: process.env.NODE_ENV || 'production',
        };
    }
    catch (error) {
    // If any health check fails, return an error status
        event.node.res.statusCode = 503; // Service Unavailable

        return {
            status: 'unhealthy',
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? error.message : 'Unknown error',
        };
    }
});
