# PLC Firmware Hardening

## 1. Introduction

This document summarizes the implementation of the hardening of WAGO firmware with an overview of the changes needed.

## 2. Hardening firmware

### 2.1 Changes compared to FW 03.00.39

The vulnerabilities reported in the "WAGO / 2019-0095" audit were processed:

- Basic security and system hardening
  - The file permissions of the private key for the web server have been adjusted, the key is no longer world-readable.
  - Packages have been updated where updates are available
- Cryptographic procedures
  - The encryption methods and extensions "curve25519-sha256", `"curve25519-sha256@libssh.org"` and `"kexgu-ess2@matt.ucc.asn.au"` have been deactivated. "Ssh-rsa" is still supported for reasons of compatibility.

### 2.2 Configuration of the system

#### Network interfaces

- Switched mode
- X1/X2: DHCP

#### Open network ports

| Port         | Protocol     | Description                    |
| ------------ | ------------ | ------------------------------ |
| TCP/22       | SSH          | System access                  |
| TCP/443      | HTTPS        | Web-based management (WBM)     |
