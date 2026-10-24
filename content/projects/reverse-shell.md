---
title: "Interactive Reverse Shell C2 & Terminal Payload"
weight: 6
category: "engineering"
date: 2020-08-18T09:00:00-04:00
draft: false
description: "Two-stage Python command-and-control listener and target payload engineered for persistent directory state and interactive terminal emulation."
tags: ["security-tools", "offensive-security", "networking", "python", "c2"]
links:
  - label: "GitHub"
    url: "https://github.com/pranp-official/reverse-shell"
---

## Overview

Traditional basic reverse shells (such as `/bin/sh` piped through netcat) suffer from severe operational limitations: stateful commands like `cd` fail to persist working directory context across execution lines, interactive program prompts freeze the connection, and stderr output is frequently lost or silently discarded.

This project implements a custom two-stage Python Command-and-Control (C2) framework consisting of a listener Command Center (`command-control.py`) and a remote agent Payload (`payload.py`) communicating over a raw TCP socket. The framework is engineered to provide a responsive, pseudo-terminal experience for security research and controlled penetration testing labs.

---

## Architecture & Design

```mermaid
sequenceDiagram
  autonumber
  participant Target as Remote Target (payload.py)
  participant C2 as Command Center (command-control.py)
  
  C2->>C2: Bind & Listen on TCP Port (e.g., 8006)
  Target->>C2: Initiate Outbound TCP Connection
  Target->>C2: Send Environment Handshake (user, hostname, cwd)
  C2-->>Target: Send Command (e.g., "cd /var/log && ls -la")
  Target->>Target: Intercept "cd" via os.chdir() or exec via subprocess
  Target-->>C2: Stream stdout & stderr + updated cwd prompt
  C2->>C2: Render interactive shell prompt ~user@host:cwd$
```

### 1. Stateful Working Directory Tracking
In naive reverse shells, each command runs in an isolated subprocess fork; executing `cd /tmp` changes the directory of the ephemeral child process and exits, leaving subsequent commands running in the original launch directory. The payload intercepts directory-changing primitives, modifies the parent process execution state via `os.chdir()`, and synchronizes the active working directory back to the C2 operator.

### 2. Dual-Channel Standard I/O Redirection
The payload captures both standard output (`stdout`) and standard error (`stderr`) pipes from `subprocess.Popen`, multiplexing them into the TCP socket stream so syntax errors, permission denials, and command output are accurately reflected back to the controller.

### 3. Interactive Terminal Emulation
The C2 controller dynamic prompt mirrors native Bash/Zsh syntax (`~username@hostname:working_directory$`), creating an intuitive CLI interface without requiring manual terminal line discipline workarounds (such as `python -c 'import pty; pty.spawn("/bin/bash")'`).
