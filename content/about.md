---
title: "About"
description: "Cloud identity engineer and Master's student at Georgia Tech, using this program to go deeper on systems security and AI security."
image: "/images/pranav-author.png"
image_alt: "Pranav"
image_style: "avatar"
---

**TL;DR:** I spent nearly five years at **Oracle Cloud Infrastructure (OCI)** as a developer on the Identity and Access Management (IAM) team, most recently as a senior developer. In 2026 I stepped away from industry for a **Master's in Cybersecurity at Georgia Tech**, a deliberate break to go deeper on the foundations beneath that work, broaden my range beyond IAM, and learn from leading researchers how AI is changing security.

**What I'm looking for:** I'm exploring **Summer 2027 internships** and research collaborations in **Cloud IAM & Authorization, Workload Identity & Zero Trust, Key Management (KMS), Confidential Computing, and AI/Agent Security**. I'm also open to other areas of security, since breadth is part of why I'm here. I'd like to learn by working on real problems alongside people who know more than I do.

---

## Where I'm Starting From

For nearly five years at OCI, I was part of a team working on the control plane of hyperscale identity. As a developer, and later a senior developer, my contributions included redesigning authorization paths (working with 100+ OCI teams), fixing race conditions across distributed replicas, and a change that cut replication load by 10× for services operating at massive scale.

I was lucky to learn alongside architects and engineers with deep experience in OAuth, identity and cloud security, and to be taught just as much by the people on the other side of our APIs. The developers and architects on teams integrating with us were my most honest design reviewers. Their feedback was often one sentence, "great, but how do I roll this out on Monday?", and it opened my eyes to the trade-offs security architects face every day: security versus usability, ease of maintenance and onboarding, simpler customer flows. I'm still learning from both.

That work taught me which questions matter, and it also showed me the edges of what I know. Every authorization decision rests on quiet assumptions about the layers beneath it: that the cryptographic primitives are agile, that the distributed policy store is consistent across partitions, that the OS and hypervisor isolation boundaries hold, and that the entity presenting a token is a predictable human or service workload.

I worked *above* those layers every day. I have not studied them formally, and I don't yet understand them well enough. That gap is why I'm here.

## Why a Master's, and why now

AI agents, ephemeral workloads and non-human identities are putting pressure on exactly those assumptions. I would rather learn how that works from the people defining the field than rediscover it in production. So I made this a deliberate break: time to upgrade my skills, do research, and learn from some of the best people working in security today.

There is a second reason. All of my experience so far is in IAM, so I also want breadth. I'm open to exploring any area of security, and this term I'm studying security policy and critical infrastructure resilience alongside cryptography and information security.

### What I want to learn

- **Systems security:** how isolation, memory safety, hypervisors and hardware roots of trust actually hold up, and where they quietly fail.
- **AI and agent security:** how autonomous systems that call tools and act on a user's behalf change what "authorization" has to mean.
- **How AI is changing the foundations of traditional security models:** which long-held assumptions about users, services and trust boundaries stop being true.
- **How new security models are being designed:** zero trust, capability-based designs and analyzable policy languages, and what makes one of them trustworthy.
- **Applied cryptography:** including what post-quantum migration means for token signing and key management at scale.
- **Security policy and critical infrastructure security:** areas outside my IAM background that I'm exploring now to widen my view of the field.

### A question I'm working toward

> *What must be true of the underlying platform, from hardware roots of trust and OS isolation up to consensus protocols and formal policy languages, for an authorization decision or a workload identity to be provably trustworthy?*

I don't have a complete answer. This is the question I'm using my coursework and research to get closer to, combining my experience in distributed IAM with formal depth in applied cryptography, low-level systems security and analyzable authorization policy.

---

## What I'll Write Here

This site is my public lab notebook. I'm writing as someone learning in public, so expect notes, questions, system designs and things I got wrong, not final answers. The topics I plan to dig into:

* **Agent Authorization & Delegation:** whether LLM prompt injection and tool-calling risks are better understood as classic *confused-deputy* and capability-boundary problems than as purely ML alignment problems (OAuth 2.0 Token Exchange, MCP, capability-based sandboxing).
* **Distributed Authorization & Policy Verification:** the trade-offs between cached authorization, replication consistency and revocation latency (Zanzibar, Raft, and formal policy verification such as Cedar).
* **Workload Identity & Attestation:** bootstrapping trust in ephemeral environments (SPIFFE/SPIRE, microVM isolation, and what hardware attestation actually proves and quietly assumes).
* **Crypto Agility at Scale:** what practical migration paths to post-quantum cryptography could look like for high-throughput token signing and key management.

---

## What I Bring: Industry Experience

### **Oracle Cloud Infrastructure (OCI)** — *Bengaluru, India*
**Senior Core Infrastructure Engineer** *(2024 – 2026)* | **Member of Technical Staff** *(2021 – 2024)*  
*Core developer and mentor on the OCI Identity and Access Management (IAM) & Identity Cloud Services team.*

* **Identity integration for internal teams:** Worked with internal OCI service teams to integrate them with Identity Cloud Services, and was one of the owners of the API suite that made this seamless. That simplified customer onboarding for those teams and made OCI IAM/IDCS their default solution for identity and access management.
* **Federation and provisioning:** Worked on the application-management team, which holds the central configuration for third-party identity providers (SAML, OAuth, OpenID Connect, federation, provisioning and synchronization) and maintains connectors to external providers. Because this layer touches most others, I gained exposure across much of the identity stack.
* **Large-scale migration:** Part of the team migrating Oracle's Fusion application fleet onto OCI IAM/IDCS, at a scale of tens of thousands of pods and hundreds of millions of identities. Designed and developed features in the application-management layer and the internal integration API that supported no-downtime upgrades and safe rollback when a new build misbehaved.
* **Bridging two authorization models (identity domains):** Joined when most of the identity domains work was already built, and contributed at the seam between policy-based authorization with signed requests (OCI IAM) and role-based access control with bearer tokens (IDCS). My focus was making APIs behave safely under both models, since two individually secure systems can combine into subtle gaps. That meant working across two data planes and sources of truth, supporting token-exchange use cases, extending APIs to accept signature-based requests (bearer tokens can be replayed if leaked and tend to encourage insecure practices), and rolling changes out without breaking compatibility, while working with internal teams and external customers who pushed back on losing those habits. I also helped find and close gaps in how the two systems' semantics interact.
* **Distributed Systems & Scale:** Diagnosed and resolved major control-plane bottlenecks, eliminating redundant event traffic to **reduce load on the replication service by 10×**, and engineered concurrency safeguards that eliminated race conditions in a highly distributed environment.
* **Mentorship:** Mentored junior engineers on distributed architecture and debugging.
* **Recognition:** Awarded **4× OCI Spot Awards (2025)** for technical impact and execution.

### **Earlier Internships**
* **Centre for Development of Advanced Computing (CDAC)** — *Research Intern (2020 – 2021):* Researched and benchmarked machine learning pipelines and static/dynamic analysis techniques for counterfeit Android application detection.
* **Hewlett Packard Enterprise (HPE)** — *Summer Intern (2020):* Built an automated security testing framework integrating multiple vulnerability scanners with automated triage and analysis pipelines.
* **Karnataka State Police (Computer Wing)** — *InfoSec Intern (2019):* Engineered an ELK-based SOC dashboard for real-time monitoring, evaluated data-center security tooling, and authored operational security advisories. This was part of the state-wide talent hunt for cybersecurity, where I was part of the first batch of interns and one of the youngest interns selected.

---

## Education

* **Georgia Institute of Technology** — *Atlanta, GA*  
  **M.S. in Cybersecurity (Information Security)** *(2026 – Present)*  
  *Studying:* Applied Cryptography, Secure Computer Systems, Software & Binary Security, Critical Infrastructure Resilience, and Information Security Policy.  

* **National Institute of Technology Karnataka, Surathkal (NITK)** — *India*  
  **B.Tech in Information Technology** *(2017 – 2021)* — *CGPA: 8.36 / 10.0*  
  *Activities:* Technical Committee Member at IEEE NITK and the NITK Web Club; led winter mentorship programs in Computer Networks.

---

## Selected Research & Publications

My earlier research explored machine learning, computer vision, natural language processing and distributed systems, and earned **75+ citations** across peer-reviewed venues. That ML background is part of why AI security interests me now.

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

## Let's Connect

I'd like to hear from engineers, researchers and architects working on **cloud identity, distributed consensus, workload attestation, confidential computing, and AI agent security**, both to learn how you think about these problems and to find where I can contribute.

If your team is building core security or identity infrastructure, and especially if you're hiring **Summer 2027 interns** who bring production experience and are eager to learn the research side, I'd love to chat.

* **GitHub:** [github.com/pranp-official](#)
* **LinkedIn:** [linkedin.com/in/pranp](#)
* **Email:** [pranav.prakash.msc@gmail.com](mailto:pranav.prakash.msc@gmail.com)