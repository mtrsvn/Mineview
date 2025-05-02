# Mineview - Minecraft Profile Viewer

**Mineview** is a small web-based tool that allows users to view Minecraft player profiles for both **Java Edition** and **Bedrock Edition**. It fetches player information such as username, UUID/XUID, and view of their skin. Users can also download the skin directly.

- ℹ️ Live Website: https://mtrsvn.github.io/Minewatch/
---

## 🌟 Features

- 🔍 Search Minecraft Java or Bedrock usernames
- 🎮 Supports both Java Edition and Bedrock Edition
- 📥 Download player skins as PNG files

---

## 🔧 APIs Used

### ✅ Java Edition

- **PlayerDB API**  
  https://playerdb.co/  
  Endpoint:  
  `https://playerdb.co/api/player/minecraft/{username}`

### ✅ Bedrock Edition

- **MCProfile.io API**  
  https://mcprofile.io/  
  Endpoint:  
  `https://mcprofile.io/api/v1/bedrock/gamertag/{gamertag}`

### ✅ Skin Rendering

- **Starlight Skins by Lunar Eclipse Studio**  
  https://starlightskins.lunareclipse.studio/  
  - Skin:  
    `https://starlightskins.lunareclipse.studio/render/walking/{username}/full`
  - Download PNG skin:  
    `https://starlightskins.lunareclipse.studio/render/skin/{username}/default`

---

## 🙏 Credits & Thanks

This project would not be possible without the following awesome APIs and services:

- 💚 [PlayerDB](https://playerdb.co) – for Minecraft Java player data  
- 💙 [MCProfile.io](https://mcprofile.io) – for Minecraft Bedrock player data  
- 💜 [Starlight Skins](https://starlightskins.lunareclipse.studio) by Lunar Eclipse Studio – for skin 

Big thanks to the creators and maintainers of these services for making them free and accessible to the community.

