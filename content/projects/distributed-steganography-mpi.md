---
title: "Distributed Steganography via Visual Cryptography & Genetic Algorithms"
date: 2021-06-15T09:00:00-04:00
draft: false
description: "Parallelizing a computationally intensive multi-stage steganography model across a distributed cluster using MPI, visual cryptography, and genetic search."
tags: ["distributed-systems", "cryptography", "steganography", "genetic-algorithms", "mpi", "research"]
venue: "Springer ICIoTCT 2021"
authors: ["Harsh Maru", "P. Pranav", "Yashwanth Miryala", "Bhawana Rudra"]
doi: "10.1007/978-3-030-76736-5_21"
links:
  - label: "Springer Chapter"
    url: "https://link.springer.com/chapter/10.1007/978-3-030-76736-5_21"
  - label: "MPI Cluster Code"
    url: "https://github.com/pranp-official/dcs-project"
  - label: "Algorithm Code"
    url: "https://github.com/pranp-official/steganography-using-genetic-algorithm-visual-crypto"
---

## Overview

Steganography hides confidential payloads inside innocuous cover carriers such that third-party observers cannot detect the transmission. However, achieving high embedding capacity while preserving visual imperceptibility and cryptographic strength requires computationally demanding optimization.

Published in **Advances in Intelligent Systems and Computing (Springer ICIoTCT 2021)**, this project proposes a high-security steganographic pipeline combining **(2, 2) Visual Cryptography**, **Least Significant Bit (LSB) embedding**, and **Genetic Algorithm (GA) optimization**, distributed across an MPI cluster to eliminate performance bottlenecks.

---

## Architecture & Pipeline

```mermaid
flowchart TD
  subgraph Stage1["1. Cryptographic Share Generation"]
    Secret["<b>Secret Payload</b><br/>Confidential Image / Text"] --> VC["<b>(2, 2) Visual Cryptography</b><br/>Naor-Shamir Threshold Scheme"]
    VC --> S1["<b>Share 1</b><br/>Noise Matrix"]
    VC --> S2["<b>Share 2</b><br/>Noise Matrix"]
  end

  subgraph Stage2["2. Distributed Genetic Algorithm (MPI Cluster)"]
    Cover["<b>Cover Carrier Image</b><br/>Target Bitmap Container"] --> Master
    S1 --> Master["<b>Master Node</b><br/>Population Generation & Scattering"]
    Master -->|"MPI Scatter"| W1["<b>Worker 1</b><br/>PSNR/SSIM Eval"]
    Master -->|"MPI Scatter"| W2["<b>Worker 2</b><br/>PSNR/SSIM Eval"]
    Master -->|"MPI Scatter"| W3["<b>Worker 3</b><br/>PSNR/SSIM Eval"]
    W1 & W2 & W3 -->|"MPI Gather"| Agg["<b>Selection & Crossover</b><br/>Optimal Chromosome Search"]
  end

  subgraph Stage3["3. Steganographic Carrier Synthesis"]
    Agg --> BestGene["<b>Optimal Chromosome</b><br/>Target Coordinates"]
    BestGene --> LSB["<b>LSB Embedding Engine</b><br/>Least Significant Bitplane"]
    LSB --> Stego["<b>Stego-Carrier Output</b><br/>Perceptually Indistinguishable"]
  end
```

### 1. Visual Cryptography Splitting
The secret payload is divided into two distinct random shares ($S_1, S_2$) using a Naor-Shamir threshold scheme. Neither share conveys information individually; only their superimposition or cryptographic recombination reconstructs the original payload.

### 2. Genetic Algorithm Optimization
Embedding secret bits into arbitrary cover locations alters statistical pixel distributions and exposes the message to chi-square and steganalysis attacks. We used a Genetic Algorithm to discover optimal embedding positions:
- **Chromosomes**: Encode candidate sequences of pixel coordinates within the cover carrier.
- **Fitness Function**: Maximizes Peak Signal-to-Noise Ratio (PSNR) and Structural Similarity Index (SSIM) while minimizing Mean Squared Error (MSE), ensuring the carrier remains visually and statistically indistinguishable from the pristine original.

### 3. Distributed Cluster Computing with MPI
Evaluating genetic fitness over high-resolution cover images across dozens of generations is compute-bound. Using `mpi4py`, NFS shared storage, and SSH cluster interconnects:
- The master node distributes candidate sub-populations across worker nodes.
- Workers compute image slicing, fitness evaluations, and LSB projections concurrently.
- Results are gathered at each generation boundary for selection and crossover, achieving near-linear speedup as worker nodes scale.

---

## Citation

```bibtex
@incollection{maru2021distributed,
  author={Maru, Harsh and Pranav, P. and Miryala, Yashwanth and Rudra, Bhawana},
  title={Distributed Computing Solution for Steganography Using Visual Cryptography and Genetic Algorithm},
  booktitle={Internet of Things and Connected Technologies},
  series={Advances in Intelligent Systems and Computing},
  volume={1382},
  pages={201--211},
  year={2021},
  publisher={Springer},
  doi={10.1007/978-3-030-76736-5_21}
}
```
