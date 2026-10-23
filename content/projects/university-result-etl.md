---
title: "Zero-Touch University Result ETL & Analytics"
date: 2020-01-15T09:00:00-04:00
draft: false
description: "Automated ETL pipeline transforming unstructured university examination PDF gazettes into structured Elasticsearch indices and Kibana analytics dashboards."
tags: ["data-engineering", "elk-stack", "python", "analytics", "etl"]
---

## Overview

University semester examination results are often released as large, semi-structured PDF gazettes containing thousands of student roll numbers, course codes, internal evaluation marks, and semester grade point averages (SGPA/CGPA). Analyzing institutional performance trends—such as grade deflation in specific courses, departmental pass percentages, or prerequisite correlation—historically required painstaking manual spreadsheet manipulation.

This project engineered a "zero-touch" automated ETL pipeline that ingests raw examination PDF releases, cleanses and normalizes student performance records, indexes the data into an **Elasticsearch** cluster, and generates interactive **Kibana** dashboards for academic analytics.

---

## Architecture & Data Flow

```mermaid
flowchart TD
  subgraph Stage1["1. Raw Document Ingestion & Extraction"]
    PDF["<b>Raw Exam Gazettes</b><br/>Semi-structured PDF releases"] --> Parser["<b>Python PDF Parser</b><br/>Tabular & OCR Cleanser"]
  end

  subgraph Stage2["2. Data Normalization & Validation"]
    Parser --> Normalizer["<b>Schema Normalizer</b><br/>Letter Grades to Grade Points"]
    Normalizer --> Calc["<b>Metric Calculator</b><br/>SGPA, CGPA & Backlog Flags"]
    Calc --> JSON["<b>JSON Event Documents</b><br/>Validated Schema Records"]
  end

  subgraph Stage3["3. Search Indexing & Visualization"]
    JSON --> ES["<b>Elasticsearch Cluster</b><br/>Sharded Indices by Batch/Branch"]
    ES --> Kibana["<b>Kibana Dashboards</b><br/>Bell Curves · GPA Distributions · Pass Rates"]
  end
```

### 1. Ingestion & Tabular PDF Extraction
- Built custom Python extraction routines to parse dense, multi-column PDF layouts where table borders and whitespace alignments frequently drift across pages.
- Handled edge cases including absent candidates, withheld results, grade revisions, and multi-line course descriptors.

### 2. Normalization & Schema Validation
- Converted letter grades (`S`, `A`, `B`, `C`, `D`, `E`, `F`) into normalized numerical grade points aligned with university grading scales.
- Calculated cumulative GPA trajectories, flagged backlog status, and enriched student records with departmental and cohort metadata.

### 3. Aggregations & Analytics Dashboards
Indexed records into Elasticsearch to enable instantaneous querying and aggregated statistical reporting via Kibana:
- **Grade Distribution Curves**: Visualizing bell curves across individual core courses to detect grading anomalies or unusually high failure rates.
- **Departmental Benchmarking**: Comparing performance metrics across academic disciplines and graduating cohorts.
- **Correlation Insights**: Identifying gateway courses where lower foundational grades correlated strongly with downstream semester attrition.
