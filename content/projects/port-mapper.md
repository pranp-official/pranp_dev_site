---
title: "Port Mapper: Lightweight Socket Port Scanner"
date: 2020-03-12T09:00:00-04:00
draft: false
description: "Minimalist, zero-dependency network auditing tool written in Python using low-level BSD sockets to discover open ports across IP ranges."
tags: ["security-tools", "networking", "python", "sockets", "cli"]
links:
  - label: "GitHub"
    url: "https://github.com/pranp-official/port-mapper"
---

## Overview

Network exploration tools like Nmap are powerful, but enterprise and air-gapped environments often restrict external tool installations or third-party binary downloads. Having a native, zero-dependency network discovery script is vital for rapid host diagnostics and baseline security auditing.

**Port Mapper** (`P0rt M4pp3r`) is a lightweight CLI port-scanning tool implemented purely in standard library Python using low-level BSD socket programming.

---

## Scanning Architecture

```mermaid
flowchart TD
  subgraph Stage1["1. CLI Argument Parsing"]
    direction LR
    CLI["<b>Target Specification</b><br/>IPs & port arguments"] --> Parser["<b>Argparse Engine</b><br/>Extract mode flags"]
  end

  subgraph Stage2["2. Scan Modalities"]
    direction LR
    Parser --> Mode{"<b>Dispatch Mode</b>"}
    Mode -->|"Simple: -s"| Single["<b>Single Port Probe</b><br/>Specific port verification"]
    Mode -->|"Multi: -m"| Multi["<b>Port List Sweep</b><br/>Known services: 22, 80, 443..."]
    Mode -->|"Range: -r"| Range["<b>Range Enumerator</b><br/>Contiguous port block"]
  end

  subgraph Stage3["3. Socket Probe & Handshake"]
    direction LR
    Single & Multi & Range --> Socket["<b>BSD Socket Layer</b><br/>AF_INET, SOCK_STREAM"]
    Socket --> TCP["<b>TCP 3-Way Handshake</b><br/>Configurable connection timeout"]
  end

  subgraph Stage4["4. State Classification & Output"]
    direction LR
    TCP --> Result{"<b>connect() State</b>"}
    Result -->|"Success"| Open["<b>Open Port Detected</b><br/>Active listening daemon"]
    Result -->|"Timeout / Refused"| Closed["<b>Closed / Filtered</b><br/>Host unreachable or silent drop"]
  end
```

## Capabilities & Implementation

### 1. Zero-Dependency Socket Architecture
Built exclusively with Python's native `socket` and `argparse` modules, allowing immediate execution on any machine with Python 3 without virtualenv setup or package manager dependencies.

### 2. Flexible Scanning Modes
The utility supports three distinct operational use cases:
- **Simple Single-Port Probing (`-s port ip`)**: Rapid check to verify if a specific daemon or service port (e.g., SSH on port 22) is open and accepting TCP handshakes.
- **Multi-Port Service Sweeps (`-m port1,port2,... ip`)**: Targeted enumeration across known high-value service ports (e.g., `22,80,443,3306,5432,6379,8080`) on an individual target.
- **Port Range Sweeps (`-r start-port end-port ip1,ip2,...`)**: Exhaustive scanning across a contiguous port range (e.g., `1000-5000`) spanning one or multiple target IP addresses.

### 3. Connection State Handling
Implements standard non-blocking/timed TCP three-way handshake probes (`SOCK_STREAM`), capturing `connect()` outcomes to differentiate actively listening ports from filtered drops and closed sockets with clean console reporting.
