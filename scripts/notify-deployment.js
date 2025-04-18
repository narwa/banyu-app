/**
 * Deployment notification script
 * This script is executed after successful deployment to notify team members
 */

const https = require('node:https');

// Configuration
const config = {
    webhookUrl: process.env.DEPLOY_WEBHOOK_URL,
    environment: process.env.NODE_ENV || 'production',
    appName: 'banyu-app',
    version: process.env.npm_package_version || 'unknown',
};

// Create deployment message
const message = {
    text: `🚀 *${config.appName}* has been deployed to *${config.environment}*`,
    blocks: [
        {
            type: 'header',
            text: {
                type: 'plain_text',
                text: `Deployment Successful: ${config.appName}`,
                emoji: true,
            },
        },
        {
            type: 'section',
            fields: [
                {
                    type: 'mrkdwn',
                    text: `*Environment:*\n${config.environment}`,
                },
                {
                    type: 'mrkdwn',
                    text: `*Version:*\n${config.version}`,
                },
            ],
        },
        {
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: `Deployed at: ${new Date().toISOString()}`,
            },
        },
    ],
};

// Only send notification if webhook URL is configured
if (config.webhookUrl) {
    const data = JSON.stringify(message);

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length,
        },
    };

    // Send notification
    const req = https.request(config.webhookUrl, options, (res) => {
        console.log(`Deployment notification sent with status: ${res.statusCode}`);
    });

    req.on('error', (error) => {
        console.error('Error sending deployment notification:', error);
    });

    req.write(data);
    req.end();
}
else {
    console.log('Skipping deployment notification: No webhook URL configured');
}

console.log('Deployment notification script completed');
