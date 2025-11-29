<h1 align="center">📝 n8n-nodes-craft 📝</h1>
<h3 align="center">Automate your Craft docs. Stop manual copy-pasting.</h3>

<p align="center">
  <strong>
    <em>The ultimate n8n community nodes for Craft. Manage daily notes, documents, blocks, tasks, and collections — all from your workflows.</em>
  </strong>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/n8n-nodes-craft-daily-notes"><img alt="npm" src="https://img.shields.io/npm/v/n8n-nodes-craft-daily-notes.svg?style=flat-square&color=4D87E6"></a>
  <a href="#"><img alt="node" src="https://img.shields.io/badge/node-%3E%3D20.15.0-4D87E6.svg?style=flat-square"></a>
  &nbsp;&nbsp;•&nbsp;&nbsp;
  <a href="LICENSE.md"><img alt="license" src="https://img.shields.io/badge/License-MIT-F9A825.svg?style=flat-square"></a>
  <a href="https://docs.n8n.io/integrations/community-nodes/"><img alt="n8n" src="https://img.shields.io/badge/n8n-Community%20Node-FF6D5A.svg?style=flat-square"></a>
</p>

<p align="center">
  <img alt="daily notes" src="https://img.shields.io/badge/📅_Daily_Notes-blocks,_tasks,_search-2ED573.svg?style=for-the-badge">
  <img alt="documents" src="https://img.shields.io/badge/📄_Documents-multi--doc_management-2ED573.svg?style=for-the-badge">
</p>

<div align="center">

### 🧭 Quick Navigation

[**⚡ Install**](#-installation) • 
[**🔑 Setup**](#-setup) • 
[**✨ Features**](#-features) • 
[**🎮 Examples**](#-examples) •
[**🛠️ Development**](#️-development)

</div>

---

**Two powerful nodes in one package.** Whether you're automating daily journaling, syncing tasks to external systems, or building AI-powered document workflows — this package has you covered.

<div align="center">
<table>
<tr>
<td align="center">
<h3>📅</h3>
<b>Craft Daily Notes</b><br/>
<sub>Blocks, tasks, collections, search</sub>
</td>
<td align="center">
<h3>📄</h3>
<b>Craft Documents</b><br/>
<sub>Multi-document management</sub>
</td>
<td align="center">
<h3>🤖</h3>
<b>AI Agent Ready</b><br/>
<sub>Works with n8n AI tools</sub>
</td>
</tr>
</table>
</div>

---

## 💥 Why This Exists

Craft is beautiful for writing. But getting data in and out? Pain. This package fixes that.

<table align="center">
<tr>
<td align="center"><b>❌ Without This Node</b></td>
<td align="center"><b>✅ With This Node</b></td>
</tr>
<tr>
<td>
<ol>
  <li>Open Craft. Copy block IDs manually.</li>
  <li>Write custom API scripts.</li>
  <li>Debug authentication issues.</li>
  <li>Pray your automation works.</li>
</ol>
</td>
<td>
<ol>
  <li>Install the node.</li>
  <li>Paste your Connect URL.</li>
  <li>Build workflows visually.</li>
  <li>Ship it. ☕</li>
</ol>
</td>
</tr>
</table>

---

## 🚀 Installation

### Community Nodes (Recommended)

1. Go to **Settings → Community Nodes** in n8n
2. Click **Install**
3. Enter `n8n-nodes-craft-daily-notes`
4. Click **Install**

### Manual Installation

```bash
cd ~/.n8n/nodes
npm install n8n-nodes-craft-daily-notes
```

---

## 🔑 Setup

<table>
<tr>
<td width="50%">

### Daily Notes API

1. In Craft: **Settings → Connect → Daily Notes & Tasks**
2. Copy your Connect API URL
3. In n8n: Create **Craft Daily Notes API** credentials
4. Paste the URL

</td>
<td width="50%">

### Documents API

1. In Craft: **Settings → Connect → Your Connection**
2. Copy your Connect API URL
3. In n8n: Create **Craft Documents API** credentials
4. Paste the URL

</td>
</tr>
</table>

> **🔐 Security Note:** The API URL contains your auth token. Keep it private.

---

## ✨ Features

<div align="center">

### Craft Daily Notes

| Resource | Operations |
|:--------:|:-----------|
| **📦 Block** | Get, Insert, Update, Delete, Move, Search |
| **✅ Task** | Get, Add, Update, Delete |
| **🗂️ Collection** | List, Get Schema, Get/Add/Update/Delete Items |
| **🔍 Search** | Search Across All Daily Notes |

### Craft Documents

| Resource | Operations |
|:--------:|:-----------|
| **📄 Document** | List All Documents |
| **📦 Block** | Get, Insert, Update, Delete, Move, Search |
| **🗂️ Collection** | List, Get Schema, Get/Add/Update/Delete Items |
| **🔍 Search** | Search Across All Documents |

</div>

### 🎯 Key Capabilities

- **📅 Relative Dates** — Use `today`, `tomorrow`, `yesterday` or `YYYY-MM-DD`
- **🤖 AI Agent Support** — Works as a tool in AI-powered workflows
- **📋 Smart Dropdowns** — Collections load dynamically from your data
- **⚡ Declarative Routing** — Clean, maintainable node architecture

---

## 🎮 Examples

### Get Today's Daily Note

```
Node: Craft Daily Notes
Resource: Block → Get
Date: today
```

### Add Task to Inbox

```
Node: Craft Daily Notes
Resource: Task → Add
Content: "Review pull requests"
Location: Inbox
```

### Insert Content into Document

```
Node: Craft Documents
Resource: Block → Insert
Document ID: (select from dropdown)
Content: "## Meeting Notes\n\n- Point 1\n- Point 2"
```

### Search Across Everything

```
Node: Craft Daily Notes
Resource: Search → Search Across Daily Notes
Terms: "project alpha"
```

---

## 🛠️ Development

```bash
# Install dependencies
npm install

# Development mode (hot reload)
npm run dev

# Build for production
npm run build

# Lint code
npm run lint
```

### Project Structure

```
├── credentials/          # API credential definitions
├── nodes/
│   ├── CraftDailyNotes/  # Daily Notes node
│   └── CraftDocuments/   # Documents node
├── icons/                # Node icons (light/dark)
└── dist/                 # Compiled output
```

---

## 📚 Resources

- [Craft Connect Documentation](https://www.craft.do/s/hLrMZpKFfYRWPT)
- [n8n Community Nodes Guide](https://docs.n8n.io/integrations/community-nodes/)
- [Changelog](CHANGELOG.md)

---

<div align="center">

## 👤 Author

**Yigit Konur**

[![GitHub](https://img.shields.io/badge/GitHub-yigitkonur-181717?style=flat-square&logo=github)](https://github.com/yigitkonur)
[![Email](https://img.shields.io/badge/Email-yigit@konur.dev-EA4335?style=flat-square&logo=gmail&logoColor=white)](mailto:yigit@konur.dev)

---

**[MIT License](LICENSE.md)** — Built with 🔥 for the Craft + n8n community.

</div>
