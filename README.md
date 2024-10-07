# AWS Lambda GitHub Repositories Service

This repository contains an AWS Lambda function that retrieves information about a user's GitHub repositories using the GitHub API 🕸️

## Requirements

- GitHub personal access token

## Installation and Usage

To deploy the Lambda function, you will need to set up the AWS CDK. For detailed instructions, please refer to the [PersonalWebsiteAWS](https://github.com/ManueleNolli/PersonalWebsiteAws) repository.

## Folder Structure

```bash
index.ts # Lambda function code
services/
    github.ts
```

## Deployment Overview

The Lambda function is designed to fetch repository data for a specified GitHub user. Ensure that your GitHub token is configured properly to avoid authentication issues when accessing private repositories.

### Environment Keys

Create a `.env` file similar to `.env.example`, specifying your GitHub personal access token.

### AWS Services Used

- [AWS Lambda](https://aws.amazon.com/lambda/): Serverless compute service to run your code

### AWS CDK

For a complete overview of the AWS infrastructure used, including the GitHub repository service setup, check out the [PersonalWebsiteAWS](https://github.com/ManueleNolli/PersonalWebsiteAws) repository.

## CI/CD

The CI/CD pipeline is implemented using GitHub Actions. The workflow is defined in the file [actions.yml](./.github/workflows/actions.yml).

The steps include:

1. **Tests**: Run unit tests for the Lambda function.
2. **Build**: Package the Lambda function and its dependencies.
3. **Deploy**: Deploy the function to AWS with dependencies in a layer. The code is pushed to an S3 bucket.

---

This project is a straightforward and effective way to access GitHub repository information programmatically. If you have any questions or suggestions, feel free to open an issue! 😊
