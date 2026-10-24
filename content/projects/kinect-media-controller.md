---
title: "Touchless HCI: Kinect Gesture Interface for Media Players"
weight: 7
category: "engineering"
date: 2019-11-10T09:00:00-04:00
draft: false
description: "Contactless human-computer interaction system translating Xbox One Kinect skeletal gestures into real-time VLC media player commands."
tags: ["hci", "computer-vision", "csharp", "kinect", "wpf", "python"]
links:
  - label: "GitHub"
    url: "https://github.com/pranp-official/kinect-audio-video-interface-master"
---

## Overview

Touchless Human-Computer Interaction (HCI) enables users to manipulate digital media in sterile environments (e.g., surgical suites, culinary spaces) or living-room entertainment contexts without touching mice, keyboards, or physical remote controls.

Developed as part of human-computer interface coursework, this system interfaces a **Microsoft Kinect for Xbox One** with desktop media players (VLC), translating upper-body skeletal gestures in 3D camera space into real-time playback actions.

---

## Technical Pipeline

```mermaid
flowchart TD
  subgraph Stage1["1. Motion Sensing & Depth Telemetry"]
    Kinect["<b>Kinect Sensor</b><br/>Depth + IR Video Stream"] --> Vitruvius["<b>Vitruvius SDK</b><br/>3D Joint Keypoints"]
  end

  subgraph Stage2["2. Gesture Recognition Client"]
    WPF["<b>C# WPF Application</b><br/>Trajectory Analysis"] --> Detect{"<b>Gesture Match</b>"}
    Detect -->|"SwipeLeft"| Pause["<b>Action: Pause</b>"]
    Detect -->|"SwipeRight"| Play["<b>Action: Play</b>"]
  end

  subgraph Stage3["3. Asynchronous IPC & Playback"]
    Bridge["<b>Python Dispatcher</b><br/>Async Subprocess"] --> HTTP["<b>VLC HTTP API</b><br/>GET /requests/status.xml"]
    HTTP --> Player["<b>VLC Media Player</b><br/>State: Playing / Paused"]
  end

  Vitruvius --> WPF
  Pause & Play --> Bridge
```

### 1. Skeletal Tracking via Vitruvius
The C# WPF client integrates the **LightBuzz Vitruvius** framework to track body joint coordinates in real-time camera space:
- Extracts positions and trajectories for shoulders, elbows, wrists, and hand tips.
- Evaluates kinematic displacement velocity vectors to isolate intentional swipe motions from natural conversational hand fidgeting.

### 2. Gesture Mapping
- **`SwipeLeft`**: Dispatches pause command when the user sweeps an open hand laterally across the torso plane.
- **`SwipeRight`**: Dispatches play / resume command.

### 3. Asynchronous IPC & HTTP Control
Rather than embedding heavy network libraries inside the WPF rendering loop:
- The GUI application asynchronously invokes a lightweight Python bridge passing the detected gesture token.
- The Python script dispatches authenticated HTTP GET requests to VLC's embedded web interface (`http://localhost:8080/requests/status.xml?command=pl_pause`), decoupling motion tracking from network transport latency.
