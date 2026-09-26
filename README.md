# Blacksite Extraction

Play the top-down extraction shooter with a friend using GitHub Codespaces. No local install is required.

1. On GitHub, click **Code → Codespaces → Create codespace on main**.
2. In the Codespace terminal, run `cd Blacksite_Coop && node server.js`.
3. In the **Ports** tab, find port **8080**, set its visibility to **Public**, and click its forwarded URL.
4. On the game page, click **Create Room → Copy Link** and share the invite with your friend. The room supports two players total.
5. Keep the Codespace running while playing. Set the port back to Private when done.

Codespaces supplies Node.js. The game uses only built-in Node modules and needs no package installation. The browser client and WebSocket server run through the same port.
