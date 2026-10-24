---
title: "Sarcasm Detection in Tweets with BERT and GloVe Embeddings"
weight: 1
category: "research"
date: 2020-07-09T09:00:00-04:00
draft: false
description: "End-to-end NLP classification pipeline comparing contextual (BERT) and static (GloVe) representations, incorporating full conversational context."
tags: ["nlp", "deep-learning", "bert", "sentiment-analysis", "research"]
venue: "ACL Workshop on Figurative Language Processing (2020)"
citations: 56
authors: ["Akshay Khatri", "Pranav P"]
doi: "10.18653/v1/2020.figlang-1.7"
links:
  - label: "ACL Anthology"
    url: "https://aclanthology.org/2020.figlang-1.7/"
  - label: "BibTeX"
    url: "https://aclanthology.org/2020.figlang-1.7.bib"
---

## Overview

Sarcasm is an inherently nuanced form of communication where the literal meaning of an utterance directly contradicts the intended pragmatic message. In short, noisy social media texts such as Twitter, sarcasm detection becomes especially challenging due to character limits, slang, emojis, and incomplete context.

Published in the **Proceedings of the Second Workshop on Figurative Language Processing (ACL 2020)**, this research investigates automated sarcasm detection by benchmarking contextual transformer embeddings (**BERT**) against dense non-contextual word vectors (**GloVe**), while explicitly modeling the conversational dialogue thread preceding the response.

The paper has garnered **56+ citations** across computational linguistics and affective computing literature.

---

## Technical Pipeline

```mermaid
flowchart TD
  subgraph Stage1["1. Conversational Dialogue Input"]
    Parent["<b>Parent Tweet / Context</b><br/>Preceding conversational turn"]
    Response["<b>Target Response Tweet</b><br/>Utterance to classify"]
  end

  subgraph Stage2["2. Social Media Preprocessing"]
    Norm["<b>Entropy Normalizer</b><br/>Slang expansion · Emojis · URLs"]
  end

  subgraph Stage3["3. Dual Embedding Architectures"]
    direction LR
    subgraph BranchBERT["Contextual Paradigm"]
      BERT["<b>BERT (bert-base-uncased)</b><br/>Bidirectional dynamic self-attention"]
    end
    subgraph BranchGloVe["Static Paradigm"]
      GloVe["<b>GloVe 300D Twitter</b><br/>Global co-occurrence matrix"]
    end
  end

  subgraph Stage4["4. Incongruity Scoring & Classification"]
    Classifier{"<b>Classifier Head</b><br/>Pragmatic contrast scoring"}
    Classifier --> Sarcastic["<b>Sarcastic</b><br/>Contextual tone clash"]
    Classifier --> NonSarcastic["<b>Non-Sarcastic</b><br/>Literal sentiment alignment"]
  end

  Parent & Response --> Norm
  Norm --> BranchBERT & BranchGloVe
  BranchBERT & BranchGloVe --> Classifier
```

## Technical Highlights

### 1. Conversational Context Modeling
Traditional sentiment classifiers evaluate individual tweets in isolation. However, sarcasm is frequently unintelligible without understanding what the speaker is reacting to. Our pipeline:
- Ingests the target response tweet paired with its parent conversational context.
- Encodes both dialogue turns to detect incongruity, pragmatic contrast, and tone divergence between the original statement and the reply.

### 2. Embedding Architecture Comparison
We compared two embedding paradigms:
- **BERT (`bert-base-uncased`)**: Bidirectional self-attention layers capture token representations dynamically based on surrounding syntactic and semantic context.
- **GloVe (300-dimensional Twitter vectors)**: Pre-trained static global co-occurrence vectors feeding downstream recurrent and dense classification heads.

### 3. Noise Normalization & Social Media Preprocessing
Twitter text contains high entropy. The preprocessing pipeline implemented:
- URL, hashtag, and user-mention tokenization (`@USER`, `HTTPURL`).
- Emoji translation and sentiment preservation.
- Contraction expansion and character repetition normalization (e.g., *"suuuper"* $\to$ *"super"*).

---

## Citation

```bibtex
@inproceedings{khatri-p-2020-sarcasm,
    title = "Sarcasm Detection in Tweets with {BERT} and {G}lo{V}e Embeddings",
    author = "Khatri, Akshay and P, Pranav",
    booktitle = "Proceedings of the Second Workshop on Figurative Language Processing",
    month = jul,
    year = "2020",
    address = "Online",
    publisher = "Association for Computational Linguistics",
    url = "https://aclanthology.org/2020.figlang-1.7/",
    doi = "10.18653/v1/2020.figlang-1.7",
    pages = "56--60"
}
```
