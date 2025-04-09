# Jenkins SonarQube Integration for Banyu CMS Frontend

This guide provides step-by-step instructions for setting up SonarQube analysis in Jenkins specifically for the Banyu CMS Frontend project.

## Prerequisites

- Jenkins server (version 2.289.1 or later recommended)
- SonarQube server (version 9.x or later recommended)
- Access to both Jenkins and SonarQube administration

## 1. Jenkins Plugin Installation

### Required Plugins

1. Navigate to **Jenkins > Manage Jenkins > Plugins > Available**
2. Search for and install the following plugins:
    - SonarQube Scanner (provides integration with SonarQube)
    - Docker Pipeline (if using Docker-based agents)
    - NodeJS Plugin (for Node.js environment setup)

## 2. Configure SonarQube Server in Jenkins

1. Go to **Jenkins > Manage Jenkins > Configure System**
2. Scroll down to the **SonarQube servers** section
3. Click **Add SonarQube**
4. Configure with these settings:
    - Name: `SonarQube` (this name is referenced in the Jenkinsfile)
    - Server URL: Your SonarQube server URL (e.g., `http://your-sonarqube-server:9000`)
    - Server authentication token: Click **Add > Jenkins** and select **Secret text**
        - Secret: Your SonarQube authentication token
        - ID: `sonarqube-token`
        - Description: `SonarQube Authentication Token`
5. Click **Save**

## 3. Configure Node.js in Jenkins

1. Go to **Jenkins > Manage Jenkins > Global Tool Configuration**
2. Scroll to **NodeJS** section
3. Click **Add NodeJS**
4. Configure with these settings:
    - Name: `NodeJS 18.x`
    - Install automatically: Check this option
    - Version: Select Node.js 18.x
5. Click **Save**

## 4. Configure SonarQube Scanner in Jenkins

1. Go to **Jenkins > Manage Jenkins > Global Tool Configuration**
2. Scroll to **SonarQube Scanner** section
3. Click **Add SonarQube Scanner**
4. Configure with these settings:
    - Name: `SonarScanner`
    - Install automatically: Check this option
    - Version: Select the latest version
5. Click **Save**

## 5. Create a Jenkins Pipeline Job

1. Go to Jenkins dashboard
2. Click **New Item**
3. Enter a name: `banyu-cms-fe`
4. Select **Pipeline** and click **OK**
5. In the job configuration:
    - Under **Pipeline**, select **Pipeline script from SCM**
    - Select **Git** as the SCM
    - Repository URL: Your Git repository URL
    - Credentials: Select or add your Git credentials
    - Branch Specifier: `*/main` (or your default branch)
    - Script Path: `Jenkinsfile.banyu`
6. Click **Save**

## 6. SonarQube Project Setup

1. Log in to your SonarQube server
2. Go to **Administration > Projects > Management**
3. Click **Create Project**
4. Enter the following details:
    - Project key: `banyu-cms-fe`
    - Display name: `Banyu CMS Frontend`
5. Click **Set Up**
6. Select **With Jenkins** as the analysis method
7. Follow the instructions to complete the setup

## 7. Running the Analysis

Once configured, you can run the analysis by:

1. Navigate to your Jenkins pipeline job
2. Click **Build Now**

The pipeline will:

1. Check out your code
2. Install dependencies
3. Run linting
4. Execute tests and generate coverage reports
5. Run SonarQube analysis
6. Check quality gate status
7. Build the application

## 8. Viewing Analysis Results

1. After the analysis completes, go to your SonarQube server
2. Navigate to **Projects > banyu-cms-fe**
3. Review the analysis results, including:
    - Code quality issues
    - Test coverage metrics
    - Duplications
    - Security vulnerabilities

## 9. Troubleshooting Common Issues

### Coverage Not Showing in SonarQube

If code coverage is not appearing in SonarQube:

1. Verify that tests are running successfully in the pipeline
2. Check that `lcov.info` is being generated in the `coverage` directory
3. Confirm the path in `sonar.javascript.lcov.reportPaths` matches the actual location
4. Ensure the SonarQube JavaScript/TypeScript plugin is installed on your SonarQube server

### SonarQube Scanner Not Found

If you see "sonar-scanner: command not found":

1. Verify the SonarQube Scanner is properly configured in Jenkins Global Tool Configuration
2. Check that the Jenkinsfile is correctly referencing the tool

### Quality Gate Failure

If the quality gate is failing:

1. Review the quality gate conditions in SonarQube
2. Check the specific metrics that are failing
3. Address the code issues or adjust the quality gate thresholds if necessary

## 10. Automating the Pipeline

To automatically trigger the pipeline on code changes:

1. Go to your Jenkins job configuration
2. Under **Build Triggers**, select **Poll SCM**
3. Enter a schedule (e.g., `H/15 * * * *` to check every 15 minutes)
4. Alternatively, set up a webhook in your Git repository to trigger the build

## 11. Customizing Analysis Parameters

You can customize the SonarQube analysis by modifying the parameters in the Jenkinsfile:

- `sonar.exclusions`: Patterns for files to exclude from analysis
- `sonar.coverage.exclusions`: Patterns for files to exclude from coverage calculation
- `sonar.tests`: Locations of test files
- `sonar.test.inclusions`: Patterns for test files to include

For a complete list of parameters, refer to the [SonarQube Analysis Parameters](https://docs.sonarqube.org/latest/analysis/analysis-parameters/) documentation.
