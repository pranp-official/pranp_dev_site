---
title: "The Shift Toward Ephemeral Credentials in Cloud Environments"
date: 2026-10-18T22:57:11-04:00
draft: false
description: "Why long-lived API keys and service account tokens are a vulnerability of the past, and how short-lived STS tokens change the threat model."
tags: ["cloud-security", "iam", "aws"]
---

Static credentials represent one of the most persistent liabilities in modern cloud infrastructure. Despite years of best-practice evangelism, hard-coded API tokens, long-lived access keys in CI/CD pipelines, and unrotated service account secrets continue to account for a vast percentage of initial access vectors in cloud breaches.

## The Flaw with Static Credentials

Static secrets decouple permission from identity over time:
- They are stored at rest in plaintext or weakly encrypted environment variables.
- They lack context: an access key used from a developer workstation looks identical to one exfiltrated and executed across foreign IP ranges.
- Revocation is disruptive and often feared by operations teams.

## Moving to OIDC and Short-Lived Tokens

The antidote is workload identity federation using OpenID Connect (OIDC). Instead of embedding an AWS Secret Key or GCP Service Account JSON into GitHub Actions or GitLab CI, we exchange a cryptographically signed JSON Web Token (JWT) issued by the CI provider for a temporary security token valid for minutes, not months.
