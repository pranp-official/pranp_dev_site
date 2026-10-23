---
title: "Cloud IAM Sentinel"
date: 2026-09-15T10:00:00-04:00
draft: false
description: "An automated real-time auditor for AWS and GCP IAM policies that detects privilege escalation vectors and unused administrator entitlements."
tags: ["iam", "security-tools", "cloud"]
links:
  - label: "GitHub"
    url: "https://github.com/pranp-official/cloud-iam-sentinel"
  - label: "Documentation"
    url: "https://github.com/pranp-official"
---

Cloud IAM Sentinel is a lightweight Go daemon that continuously streams IAM policy changes via CloudTrail and Cloud Audit logs, evaluates effective permissions using graph analysis, and flags toxic privilege combinations before they can be exploited.

### Core Features

- Graph-based path traversal to uncover indirect privilege escalation (e.g., `iam:PassRole` combined with `lambda:CreateFunction`).
- Near real-time Slack and PagerDuty alerts for wild-card policy attachments.
- Zero external runtime dependencies; compiles to a single binary.
