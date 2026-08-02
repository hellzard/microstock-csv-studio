# Security Policy

## Supported Versions

Currently, only the `master` branch (latest release) is supported with security updates.

## Reporting a Vulnerability

If you discover a security vulnerability within BuatinCSV, please send an e-mail to the maintainer team. All security vulnerabilities will be promptly addressed.

## Built-in Security Features

### CSV Formula Injection Mitigation
BuatinCSV automatically sanitizes all exported CSV fields. Any field starting with `=`, `+`, `-`, or `@` will be prefixed with a single quote (`'`) to prevent spreadsheet software from executing unintended formulas.

### Content Security Policy (CSP)
The application enforces strict CSP headers preventing unauthorized scripts, framing, and clickjacking attacks. See `next.config.ts` for details.

### Local-First Data
All data processed by default stays exclusively within the user's browser (IndexedDB). No metadata or file names are sent to any remote servers unless Cloud Sync is explicitly enabled.
