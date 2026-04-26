# Skybound Trials (2D Platformer)

You can play this directly in **VS Code**.

## Option 1 (Recommended): VS Code Live Server extension
1. Open this folder in VS Code.
2. Install the **Live Server** extension (by Ritwick Dey).
3. Right-click `index.html` and choose **Open with Live Server**.
4. Your browser will open automatically. Play from the menu:
   - choose a difficulty
   - click a level to start
   - move with **A/D** or **Arrow Left/Right**
   - jump with **W**, **Up Arrow**, or **Space**

## Option 2: Built-in VS Code terminal (no extension)
1. Open this folder in VS Code.
2. Open terminal in VS Code (`Terminal` → `New Terminal`).
3. Run:

   ```bash
   python3 -m http.server 8000
   ```

4. In your browser, open: `http://localhost:8000`
5. Click `index.html` if needed.

## Why not just double-click `index.html`?
Some browser/game features are more reliable when served over `http://localhost` instead of `file://`.

## Gameplay goal
Reach the green goal portal in each level while collecting coins and avoiding hazards/enemies. You earn money for completion, coins, and faster times.
