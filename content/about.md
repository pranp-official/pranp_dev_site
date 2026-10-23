---
title: "About"
description: "Background, security engineering focus, and experience."
image: "/images/author.svg"
image_alt: "Pranav - Security Engineer"
image_style: "avatar"
---

# About Me

**TL;DR:** I am an Identity & Cloud Security Engineer and published researcher (75+ citations) currently pursuing my Master’s in Cybersecurity at **Georgia Tech**. Previously, I spent nearly five years as a Senior Core-Infrastructure Engineer at **Oracle Cloud Infrastructure (OCI)**, designing and scaling core Identity and Access Management (IAM) systems. 

**What I’m looking for:** I am actively exploring **Summer 2027 internships** and research collaborations in **Cloud IAM & Authorization, Workload Identity & Zero Trust, Key Management (KMS), Confidential Computing, and AI/Agent Security Engineering**.

---

## The Vantage Point

For nearly five years at Oracle Cloud Infrastructure, I lived in the control plane of hyperscale identity, redesigning authorization paths (working with 100+ OCI teams), eliminating race conditions across distributed replicas, and cutting replication load by 10× for services operating at massive scale.

When you work in cloud IAM long enough, you realize that every authorization decision rests on a set of quiet assumptions about the layers beneath it: that the cryptographic primitives are agile, that the distributed policy store is consistent across partitions, that the OS and hypervisor isolation boundaries hold, and that the entity presenting a token is a predictable human or service workload.

I came to **Georgia Tech** to peel back those layers, and to examine what happens when that foundational assumption breaks. I am genuinely interested in understanding how AI is going to break these foundational assumptions and how we can build systems that are provably trustworthy in this new era.

### My Core Thesis
My current work focuses on **authorization, identity, and trust boundaries for autonomous systems** (AI agents, ephemeral workloads, and non-human identities). I am interested in a single foundational question:

> *What must be true of the underlying platform—from hardware roots of trust and OS isolation up to consensus protocols and formal policy languages—for an authorization decision or a workload identity to be provably trustworthy?*

Today, I am bridging my production intuition in distributed IAM with formal depth in **applied cryptography, low-level systems security, and analyzable authorization policy**.

---

## What I Write About & Build

This site is my public lab notebook. I write from the perspective of an IAM engineer digging into the foundational layers below the application stack. Here, you will find notes, system designs, and post-mortems on:

* **Agent Authorization & Delegation:** Treating LLM prompt injection and tool-calling risks as classic *confused-deputy* and capability-boundary problems rather than purely ML alignment problems (scoping authority via OAuth 2.0 Token Exchange, MCP, and capability-based sandboxing).
* **Distributed Authorization & Policy Verification:** The trade-offs between cached authorization, replication consistency, and revocation latency (inspired by Zanzibar, Raft, and formal policy verification like Cedar).
* **Workload Identity & Attestation:** Bootstrapping trust in ephemeral environments (SPIFFE/SPIRE, microVM isolation, and what hardware attestations actually prove—and quietly assume).
* **Crypto Agility at Scale:** Practical migration paths for post-quantum cryptography in high-throughput token signing and key management systems.

---

## Industry Experience

### **Oracle Cloud Infrastructure (OCI)** — *Bengaluru, India*
**Senior Core Infrastructure Engineer** *(2024 – 2026)* | **Member of Technical Staff** *(2021 – 2024)*  
*Core developer and mentor on the OCI Identity and Access Management (IAM) & Identity Cloud Services team.*

* **Architecture & Cross-Cloud Rollouts:** Collaborated with Identity and Security Architects to design and deliver organization-wide security features, driving initiatives end-to-end across multiple OCI platform and product teams.
* **Authorization Hardening:** Strengthened API-level security by redesigning critical authorization paths and tightening access-control logic to protect sensitive cross-service workflows.
* **Distributed Systems & Scale:** Diagnosed and resolved major control-plane bottlenecks, eliminating redundant event traffic to **reduce load on the replication service by 10×**, and engineered concurrency safeguards that eliminated race conditions in a highly distributed environment.
* **Resilience & Mentorship:** Improved service reliability through enhanced telemetry, threat-detection workflows, and incident-response readiness while mentoring junior engineers on distributed architecture and debugging.
* **Recognition:** Awarded **4× OCI Spot Awards (2025)** for technical impact and execution.

### **Earlier Internships**
* **Centre for Development of Advanced Computing (CDAC)** — *Research Intern (2020 – 2021):* Researched and benchmarked machine learning pipelines and static/dynamic analysis techniques for counterfeit Android application detection.
* **Hewlett Packard Enterprise (HPE)** — *Summer Intern (2020):* Built an automated security testing framework integrating multiple vulnerability scanners with automated triage and analysis pipelines.
* **Karnataka State Police (Computer Wing)** — *InfoSec Intern (2019):* Engineered an ELK-based SOC dashboard for real-time monitoring, evaluated data-center security tooling, and authored operational security advisories. This was part of the state wide talent hunt for cybersecurity, where I was part of the first batch of interns and one of the youngest interns selected.

---

## Education

* **Georgia Institute of Technology** — *Atlanta, GA*  
  **M.S. in Cybersecurity (Information Security)** *(2026 – Present)*  
  *Focus:* Applied Cryptography, Secure Computer Systems, Software & Binary Security, Critical Infrastructure Resilience, and Information Security Policy.  
  *Leadership:* Serving as a **Graduate Senator** in the Student Government Association, advocating for campus technology policy and graduate student initiatives.

* **National Institute of Technology Karnataka, Surathkal (NITK)** — *India*  
  **B.Tech in Information Technology** *(2017 – 2021)* — *CGPA: 8.36 / 10.0*  
  *Activities:* Technical Committee Member at IEEE NITK and the NITK Web Club; led winter mentorship programs in Computer Networks.

---

## Selected Research & Publications

My early research explored the intersection of machine learning, computer vision, natural language processing, and distributed systems, earning **75+ citations** across peer-reviewed venues:

* **[Sarcasm Detection in Tweets with BERT and GloVe Embeddings](https://aclanthology.org/2020.figlang-1.7/)** *(ACL Workshop on Figurative Language Processing, 2020)* — **[56 Citations]**  
  Built an end-to-end NLP classification pipeline comparing contextual (BERT) and non-contextual (GloVe) embeddings across balanced datasets.
* **[Deepfake Image Detection using CNNs and Transfer Learning](https://ieeexplore.ieee.org/document/9776410)** *(IEEE CCGE, 2021)* — **[17 Citations]**  
  Benchmarked custom CNN architectures against transfer-learning feature extraction pipelines, evaluating trade-offs in digital image forensics accuracy and computational efficiency.
* **[Distributed Computing Solution for Steganography Using Visual Cryptography and Genetic Algorithm](https://link.springer.com/chapter/10.1007/978-3-030-76736-5_21)** *(Springer ICIoTCT, 2021)*  
  Parallelized a computationally intensive steganography model (combining LSB, Visual Cryptography, and Genetic Algorithms) across a distributed cluster using MPI, NFS, and SSH.
* **[Comparative Performance Evaluation of Web-Based Book Recommender Systems](https://ieeexplore.ieee.org/document/9777116)** *(IEEE ICOEI, 2022)* — **[4 Citations]**  
  Implemented KNN and SVD collaborative filtering systems and conducted server/database throughput and latency benchmarking using Apache JMeter and Sysbench.

*(I have also served as a Technical Paper Reviewer for the 6th International Conference on Communication, Computing & Industry 6.0 — C2I6 2025).*

---

## Selected Engineering Projects

* **Low-Latency Vision Pipeline for Sports Analytics:** Engineered an automated badminton shot-detection and player-profiling system using OpenPose skeleton extraction and real-time ML classification pipelines.
* **Remote Sensing Change Detection via Merkle & Quadtrees:** Designed a high-efficiency spatial change-detection algorithm combining Quadtrees with cryptographic Merkle Trees for fast verification of satellite imagery diffs.
* **Zero-Touch University Result ETL & Analytics:** Built a one-click ETL pipeline that automated exam data ingestion and spun up customized ELK dashboards for instant academic performance analytics.

---

## Honors & Scholarships

* **J.N. Tata Endowment Scholar (2026):** Awarded the J.N. Tata Endowment Loan Scholarship for higher education abroad following a rigorous nationwide technical selection process.
* **4× Spot Awards — Oracle Cloud Infrastructure (2025):** Recognized for engineering excellence in cloud identity infrastructure.

---

## Let’s Connect

I enjoy talking to engineers, researchers, and architects working on **cloud identity, distributed consensus, workload attestation, confidential computing, and AI agent security**. 

If your team is building core security or identity infrastructure,and especially if you are hiring **Summer 2027 interns** who ship production-ready systems - I’d love to chat.

* **GitHub:** [github.com/pranp-official](#)
* **LinkedIn:** [linkedin.com/in/pranp](#)
* **Email:** [pranav.prakash.msc@gmail.com](mailto:pranav.prakash.msc@gmail.com)
