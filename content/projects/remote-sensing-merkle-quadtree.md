---
title: "Remote Sensing Change Detection via Merkle & Quadtrees"
weight: 4
category: "engineering"
date: 2020-11-20T09:00:00-04:00
draft: false
description: "Spatial change-detection algorithm combining Quadtree geometric decomposition with cryptographic Merkle Trees for rapid verification of satellite imagery diffs."
tags: ["data-structures", "cryptography", "computer-vision", "remote-sensing", "python"]
links:
  - label: "GitHub"
    url: "https://github.com/pranp-official/remote-image-analysis"
---

## Overview

High-resolution satellite and aerial imagery datasets are enormous, frequently spanning gigabytes to terabytes per capture. When monitoring environmental change—such as deforestation, wildfire damage, flood expansion, or urban development—comparing entire multi-gigapixel rasters pixel-by-pixel across time intervals is computationally wasteful because the overwhelming majority of the terrain remains unchanged.

This project implements a spatial indexing and change-detection pipeline using a **Merkle Quadtree** (`merkleQuadTree`), marrying hierarchical 2D spatial decomposition with cryptographic hash trees to perform $O(\log N)$ difference localization.

---

## Technical Architecture

```mermaid
flowchart TD
  subgraph Stage1["1. Spatial Slicing & Hash Computation"]
    direction LR
    Img["<b>Satellite Raster</b><br/>Multi-spectral imagery"] --> Slice["<b>image_slicer</b><br/>64 Quadrant Leaf Tiles"]
    Slice --> Hash["<b>Dual Hashing</b><br/>Perceptual + SHA-256 Digest"]
  end

  subgraph Stage2["2. Merkle Quadtree Verification Hierarchy"]
    direction TB
    Root["<b>Root Digest (parent_hash)</b><br/>Top-Level Region Digest"]
    Root --> Q1["<b>Quad NW</b><br/>Level 1 Hash"]
    Root --> Q2["<b>Quad NE</b><br/>Level 1 Hash"]
    Root --> Q3["<b>Quad SW</b><br/>Level 1 Hash"]
    Root --> Q4["<b>Quad SE</b><br/>Level 1 Hash"]
    Q1 -.-> Leaf["<b>Level 3 Leaf Slices</b><br/>64 Sub-tile Hashes"]
  end

  subgraph Stage3["3. Difference Traversal Algorithm"]
    direction LR
    Compare{"<b>Compare Roots</b><br/>Time T0 vs T1"} -->|"Match"| NoDiff["<b>Halt O(1)</b><br/>No change detected"]
    Compare -->|"Mismatch"| Prune["<b>Branch Traversal</b><br/>Traverse altered subtrees only"]
    Prune --> Diff["<b>Bounding Box Diff</b><br/>O(log N) change localized"]
  end

  Hash --> Root
  Root -.-> Compare
```

### 1. Quadtree Recursive Slicing
- Uses `image_slicer` to recursively subdivide high-resolution satellite imagery into quadrants across hierarchical depth levels (down to Level 3, producing 64 fine-grained geographic tiles).
- Each bounding box quadrant represents a spatially localized coordinate region on the Earth's surface.

### 2. Multi-Level Merkle Hashing
- Computes cryptographic digests (SHA-256) and perceptual hashes (`imagehash`) for each leaf tile. Perceptual hashing accounts for minor sensor noise and lighting variations, while cryptographic hashing guarantees strict bitwise integrity.
- Intermediate nodes concatenate and hash child digests upwards through `hash_level3`, `hash_level2`, `hash_level1`, culminating in a single top-level `parent_hash` (the Merkle root).

### 3. Logarithmic Difference Traversal
- When comparing two temporal snapshots of the same geographic region (Time $T_0$ vs Time $T_1$):
  1. Compare the root `parent_hash`. If identical, zero change has occurred across the entire multi-gigabyte area; comparison halts in $O(1)$ time.
  2. If mismatched, the algorithm descends only down the child branches whose hashes diverge, pruning the traversal tree for unchanged quadrants.
  3. Change bounding boxes are extracted directly at the leaf level, pinpointing modified ground regions without reprocessing millions of static pixels.
