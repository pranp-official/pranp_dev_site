---
title: "Quick Reference: AWS STS AssumeRoleWithWebIdentity"
date: 2026-10-10T11:00:00-04:00
draft: false
description: "Minimal AWS CLI snippet to exchange a GitHub Actions OIDC token for AWS STS temporary credentials."
tags: ["aws", "oidc", "cheatsheet"]
---

When configuring Workload Identity Federation from GitHub Actions to AWS, use this one-liner for local testing:

```bash
aws sts assume-role-with-web-identity \
  --role-arn "arn:aws:iam::123456789012:role/GitHubActionsDeploymentRole" \
  --role-session-name "LocalTestSession" \
  --web-identity-token "$OIDC_JWT_TOKEN" \
  --duration-seconds 3600
```

Key reminder: Ensure the IAM Role's trust relationship strictly validates the `token.actions.githubusercontent.com:sub` claim to match only the target repository and branch: `repo:pranp-official/repo-name:ref:refs/heads/main`.
