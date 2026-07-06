# 001 - TK Pro Design Google Drive Sync

Professional synchronization system that automatically mirrors a Google Drive workspace to GitHub and deploys project assets to Dropbox using GitHub Actions.

---

## Overview

This project provides an automated synchronization pipeline where:

- **Google Drive** is the working environment.
- **GitHub** is the single source of truth.
- **Dropbox** is the deployment mirror.

The system scans a selected Google Drive folder, detects changes, synchronizes them to GitHub, and automatically deploys the synchronized workspace to Dropbox after every successful commit.

---

## Architecture

```text
Google Drive
      │
      ▼
Google Apps Script
      │
      ▼
GitHub Repository
      │
      ▼
GitHub Actions
      │
      ▼
Dropbox
```

---

## Features

- Automatic Google Drive scanning
- Snapshot-based synchronization
- Detect new files
- Detect modified files
- Detect deleted files
- Detect renamed files
- Detect moved files
- Preserve folder hierarchy
- Automatic GitHub commits
- Automatic Dropbox deployment
- Automatic synchronization triggers
- Timestamped logging
- Lock protection against concurrent syncs
- Automatic CHANGELOG generation

---

## Repository Structure

```text
.
├── workspace/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── README.md
└── CHANGELOG.md
```

---

## Google Apps Script Files

```text
Code.gs
Config.gs
DriveScanner.gs
StateManager.gs
ChangeDetector.gs
GitHubMapper.gs
GitHubClient.gs
Changelog.gs
Logger.gs
Utilities.gs
Triggers.gs
```

---

## Synchronization Workflow

1. Scan Google Drive.
2. Load previous snapshot.
3. Detect changes.
4. Upload new files.
5. Update modified files.
6. Process renamed files.
7. Process moved files.
8. Delete removed files.
9. Generate CHANGELOG.md.
10. Save new snapshot.
11. Push updates to GitHub.
12. Deploy to Dropbox using GitHub Actions.

---

## GitHub Secrets

The following repository secret is required:

| Secret | Description |
|--------|-------------|
| `DROPBOX_ACCESS_TOKEN` | Dropbox API Access Token |

Google Apps Script Script Properties:

| Property | Description |
|----------|-------------|
| `GITHUB_TOKEN` | GitHub Personal Access Token |

---

## Current Version

**v1.0.0**

---

## Maintainer

**TK Pro Design**
