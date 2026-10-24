---
title: "Deepfake Image Detection using CNNs and Transfer Learning"
weight: 2
category: "research"
date: 2021-09-23T09:00:00-04:00
draft: false
description: "Dual-track digital forensics framework benchmarking a custom CNN with Error-Level Analysis (ELA) against transfer-learning backbones on StyleGAN faces."
tags: ["computer-vision", "deep-learning", "deepfake-detection", "cnn", "forensics", "research"]
venue: "IEEE CCGE 2021"
citations: 17
authors: ["Niteesh Kumar", "Pranav P", "Vishal Nirney", "Geetha V"]
doi: "10.1109/CCGE50943.2021.9776410"
links:
  - label: "IEEE Xplore"
    url: "https://ieeexplore.ieee.org/document/9776410"
---

## Overview

Advances in deep generative models like StyleGAN have made photorealistic counterfeit faces virtually indistinguishable from authentic photographs. These synthetic media pose significant security challenges for identity authentication, digital media integrity, and public trust.

Published at the **2021 International Conference on Computing, Communication and Green Engineering (IEEE CCGE)**, this research investigates automated digital forensic methods for detecting GAN-synthesized facial imagery. We benchmarked two distinct technical approaches:
1. **Deep Learning with Error-Level Analysis (ELA)**: A custom 9-layer CNN trained directly on JPEG compression error residuals to detect synthetic artifacts.
2. **Transfer Learning Feature Extraction**: Extracting deep spatial representations from pre-trained backbones (ResNet-50, VGG-16, Inception V3) and classifying them using downstream machine learning models.

The paper has garnered **17+ citations** in multimedia forensics literature.

---

## Detection Architecture

```mermaid
flowchart TD
  Input["<b>Input Face Image</b><br/>256×256 pixels (Kaggle 140k Real/Fake Faces)"]

  Input --> Path1
  Input --> Path2

  subgraph Path1["Path A: Transfer Learning (Feature Extraction + ML)"]
    direction TB
    subgraph Extractors["Pre-Trained ImageNet Backbones"]
      direction LR
      VGG_FE["<b>VGG-16</b><br/>fc2 layer (4096-D)"]
      Res_FE["<b>ResNet-50</b><br/>avg pool (2048-D)"]
      Inc_FE["<b>Inception V3</b><br/>avg pool (2048-D)"]
    end

    subgraph Classifiers["Downstream Classifiers"]
      direction LR
      SVM["<b>SVM</b>"]
      LR["<b>Logistic Regression</b><br/><b>88.47% Accuracy</b> (Top Model)"]
      RF["<b>Random Forest</b>"]
    end

    Extractors --> Classifiers
  end

  subgraph Path2["Path B: Deep Learning with Error-Level Analysis (ELA)"]
    direction TB
    ELA["<b>Error-Level Analysis (ELA)</b><br/>Identifies JPEG compression non-uniformity"]
    
    subgraph DLSuite["Evaluated CNN Architectures"]
      direction LR
      PropCNN["<b>Proposed Custom CNN</b><br/>9 layers · <b>87.46% Accuracy</b>"]
      VGG_DL["<b>VGG-16</b>"]
      GoogLeNet["<b>GoogLeNet</b>"]
      Res_DL["<b>ResNet-50</b>"]
    end

    ELA --> DLSuite
  end

  Path1 --> Decision{"<b>Deepfake Classification</b><br/>Authentic vs. Counterfeit"}
  Path2 --> Decision
```

---

## Key Findings

- **Error-Level Analysis Isolates Synthetic Artifacts**: While authentic camera photographs exhibit uniform compression across backgrounds and hair, StyleGAN faces display pronounced compression inconsistencies around eyes, mouth, and facial boundaries.
- **Proposed Custom CNN Outperformed Baselines**: Our lightweight 9-layer CNN trained on ELA maps reached **87.46% accuracy** and **87.57% F1-score** in 20 epochs, outperforming GoogLeNet (which required 100 epochs to reach 86.24%) and VGG-16 (84.13%).
- **Transfer Learning with ResNet-50 + Logistic Regression Won Overall**: Leveraging frozen ResNet-50 representations with a simple Logistic Regression classifier yielded the highest overall score of the study (**88.47% accuracy**, **88.40% F1-score**, **88.95% precision**), proving that combining pre-trained feature extractors with lightweight linear classifiers outperforms end-to-end training for this forensic task.
- **Dataset**: Evaluated on Kaggle's *"140k Real and Fake Faces"* dataset (70,000 Flickr-Faces-HQ authentic portraits and 70,000 StyleGAN synthetic faces).

---

## Citation

```bibtex
@inproceedings{kumar2021deepfake,
  author={Kumar, Niteesh and P, Pranav and Nirney, Vishal and V, Geetha},
  booktitle={2021 International Conference on Computing, Communication and Green Engineering (CCGE)}, 
  title={Deepfake Image Detection using CNNs and Transfer Learning}, 
  year={2021},
  pages={1--6},
  doi={10.1109/CCGE50943.2021.9776410}
}
```
