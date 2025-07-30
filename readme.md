
# HOLIGAN Loot Viewer V1.0.0

A desktop tool for **Albion Online** players to **analyze and compare chest logs with loot events**.  
It highlights which items were **deposited into chests (Found)** and which items were **kept or missing (Missing)**.  
Includes **lazy-loaded item icons**, **filtering**

---

## ✨ Features

- Compare **chest logs** and **loot logs** from Albion Online
- Player-based loot visualization
- Shows:
  - Item icon and name
  - Quantity
  - Loot timestamp
  - Looted-from source (e.g., mob, chest)
- Status color coding:
  - 🟢 **Found** → Item deposited into chest
  - 🔴 **Missing** → Item not deposited
- **Filter buttons**: All / Found / Missing
- **Lazy-loaded item icons** with `loading.gif`
- **Fallback icons** for items that do not exist in Albion render API
- Hacker-themed interface with green glowing effects

---

## 📂 Project Structure

holigan-loot-viewer/
├─ main.js # Electron main process
├─ index.html # Main UI page
├─ renderer.js # Frontend logic (filters, lazy loading)
├─ compareLoots.js # Core file comparison logic
├─ icons/ # Contains app.ico, app.icns, fallback icons, loading.gif
└─ package.json

---

## ⚙️ Requirements

- **Node.js 20+**
- **npm** or **yarn**
- **Electron 30+**
- **electron-builder** for packaging

---

## 🚀 Usage

1. Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/holigan-loot-viewer.git
cd holigan-loot-viewer
Install dependencies:


npm install
Start the app in development mode:


npm start
Select your Chest Log and Loot Event Log files
→ Click Analyze to generate a visual comparison.


📝 License
MIT License © 2025
Use freely, but keep the copyright notice.

💡 Notes
Items with special IDs like Treasure_*, Wardrobe_* may not have renderable icons.

Fallback icons will be used automatically for missing items.
