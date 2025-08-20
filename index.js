// Java Edition Search: Fetches and displays Minecraft Java profile info and renders the player's skin using skinview3d or a fallback image.
async function searchJava() {
  const username = document.getElementById("usernameInput").value.trim();
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "<p>Loading Java profile...</p>";

  try {
    const response = await fetch(
      `https://playerdb.co/api/player/minecraft/${username}`
    );
    if (!response.ok) throw new Error("User not found");
    const result = await response.json();
    const data = result.data.player;

    resultDiv.innerHTML = `
    <div style="margin: 10px;">
      <h4 style="margin: 10px; font-size: 1.3em;">Java Profile: </h4>
      <p style="margin: 10px; font-size: 90%;">Username: ${data.username}</p>
      <p style="margin: 10px; font-size: 90%;">UUID: ${data.id}</p>
      <div id="skinViewer" style="margin: 10px auto; width: 300px; height: 400px;"></div>
      <div class="download-btn-container">
        <a href="https://starlightskins.lunareclipse.studio/render/skin/${data.username}/default"
           download="${data.username}_skin.png"
           style="font-size: 1em; text-decoration: none; color: #9FB3DF;"
           target="_blank">
           Download Skin
        </a>
      </div>
    </div>
  `;
  
    setTimeout(() => {
      const container = document.getElementById('skinViewer');
      if (container) {
        container.innerHTML = '';
        try {
          if (typeof skinview3d !== 'undefined' && skinview3d.SkinViewer) {
            const skinViewer = new skinview3d.SkinViewer({
              width: 300,
              height: 400,
              skin: `https://crafatar.com/skins/${data.id}`
            });
            container.appendChild(skinViewer.canvas);
            if (skinview3d.IdleAnimation) {
              skinViewer.animation = new skinview3d.IdleAnimation();
              skinViewer.animation.speed = 0.5;
            }
          } else {
            throw new Error('skinview3d library not loaded');
          }
        } catch (skinError) {
          container.innerHTML = `<img src="https://starlightskins.lunareclipse.studio/render/walking/${data.username}/full" style="width: 200px; height: auto;" alt="${data.username} skin">`;
        }
      }
    }, 500);
    
  } catch (err) {
    resultDiv.innerHTML = `<p class="text-danger" style="font-size: 90%;">Java user not found.</p>`;
  }
}

// Bedrock Edition Search: Fetches and displays Minecraft Bedrock profile info and renders the player's skin using skinview3d or a fallback image.
async function searchBedrock() {
  const username = document.getElementById("usernameInput").value.trim();
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "<p>Loading Bedrock profile...</p>";

  try {
    const response = await fetch(
      `https://mcprofile.io/api/v1/bedrock/gamertag/${username}`
    );
    if (!response.ok) throw new Error("User not found");
    const data = await response.json();
    resultDiv.innerHTML = `
    <div style="margin: 10px;">
      <h4 style="margin: 10px; font-size: 1.3em;">Bedrock Profile: </h4>
      <p style="margin: 10px; font-size: 90%;">Gamertag: ${data.gamertag}</p>
      <p style="margin: 10px; font-size: 90%;">XUID: ${data.xuid}</p>
      <div id="skinViewerBedrock" style="margin: 10px auto; width: 300px; height: 400px;"></div>
      <div class="download-btn-container">
        <a href="https://starlightskins.lunareclipse.studio/render/skin/.${data.gamertag}/default"
           download=".${data.gamertag}_skin.png"
           style="font-size: 1em; text-decoration: none; color: #9FB3DF;"
           target="_blank">
           Download Skin
        </a>
      </div>
    </div>
  `;
  
    setTimeout(() => {
      const container = document.getElementById('skinViewerBedrock');
      if (container) {
        container.innerHTML = '';
        try {
          if (typeof skinview3d !== 'undefined' && skinview3d.SkinViewer) {
            const skinViewer = new skinview3d.SkinViewer({
              width: 300,
              height: 400,
              skin: `https://starlightskins.lunareclipse.studio/render/skin/.${data.gamertag}/default`
            });
            container.appendChild(skinViewer.canvas);
            if (skinview3d.IdleAnimation) {
              skinViewer.animation = new skinview3d.IdleAnimation();
              skinViewer.animation.speed = 0.5;
            }
          } else {
            throw new Error('skinview3d library not loaded');
          }
        } catch (skinError) {
          container.innerHTML = `<img src="https://starlightskins.lunareclipse.studio/render/skin/.${data.gamertag}/default" style="width: 200px; height: auto;" alt="${data.gamertag} skin">`;
        }
      }
    }, 500);
    
  } catch (err) {
    resultDiv.innerHTML = `<p class="text-danger" style="font-size: 90%;">Bedrock user not found.</p>`;
  }
}