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
      <p style="margin: 10px; font-size: 90%;">
        Username: ${data.username}
        <i class="fa-solid fa-copy" id="copyJavaUsername" style="cursor: pointer; font-size: 0.9em; vertical-align: middle; margin-left: 6px;" title="Copy Username"></i>
      </p>
      <p style="margin: 10px; font-size: 90%;">
        UUID: ${data.id}
        <i class="fa-solid fa-copy" id="copyJavaUUID" style="cursor: pointer; font-size: 0.9em; vertical-align: middle; margin-left: 6px;" title="Copy UUID"></i>
      </p>
      <div id="skinViewer" style="margin: 10px auto; width: 300px; height: 400px;"></div>
      <div class="download-btn-container">
        <a href="#" id="downloadJavaSkin"
           class="btn w-100"
           style="margin-top: 10px;"
        >
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
          const isMobile = window.innerWidth <= 768;
          const width = isMobile ? 200 : 300;
          const height = isMobile ? 260 : 400;
          if (typeof skinview3d !== 'undefined' && skinview3d.SkinViewer) {
            const skinViewer = new skinview3d.SkinViewer({
              width,
              height,
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
 
    setTimeout(() => {
      const copyUsernameBtn = document.getElementById('copyJavaUsername');
      if (copyUsernameBtn) {
        copyUsernameBtn.onclick = () => {
          navigator.clipboard.writeText(data.username);
          copyUsernameBtn.style.opacity = "0.5";
          setTimeout(() => copyUsernameBtn.style.opacity = "1", 800);
        };
      }
      const copyUUIDBtn = document.getElementById('copyJavaUUID');
      if (copyUUIDBtn) {
        copyUUIDBtn.onclick = () => {
          navigator.clipboard.writeText(data.id);
          copyUUIDBtn.style.opacity = "0.5";
          setTimeout(() => copyUUIDBtn.style.opacity = "1", 800);
        };
      }

      // Download Java skin handler
      const downloadJavaSkin = document.getElementById('downloadJavaSkin');
      if (downloadJavaSkin) {
        downloadJavaSkin.onclick = async (e) => {
          e.preventDefault();
          const url = `https://starlightskins.lunareclipse.studio/render/skin/${data.username}/default`;
          const response = await fetch(url);
          const blob = await response.blob();
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = `${data.username}_skin.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(link.href);
        };
      }
    }, 100);
    
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
      <p style="margin: 10px; font-size: 90%;">
        Gamertag: ${data.gamertag}
        <i class="fa-solid fa-copy" id="copyBedrockGamertag" style="cursor: pointer; font-size: 0.9em; vertical-align: middle; margin-left: 6px;" title="Copy Gamertag"></i>
      </p>
      <p style="margin: 10px; font-size: 90%;">
        XUID: ${data.xuid}
        <i class="fa-solid fa-copy" id="copyBedrockXUID" style="cursor: pointer; font-size: 0.9em; vertical-align: middle; margin-left: 6px;" title="Copy XUID"></i>
      </p>
      <div id="skinViewerBedrock" style="margin: 10px auto; width: 300px; height: 400px;"></div>
      <div class="download-btn-container">
        <a href="#" id="downloadBedrockSkin"
           class="btn w-100"
           style="margin-top: 10px;"
        >
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
          const isMobile = window.innerWidth <= 768;
          const width = isMobile ? 200 : 300;
          const height = isMobile ? 260 : 400;
          if (typeof skinview3d !== 'undefined' && skinview3d.SkinViewer) {
            const skinViewer = new skinview3d.SkinViewer({
              width,
              height,
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


    setTimeout(() => {
      const copyGamertagBtn = document.getElementById('copyBedrockGamertag');
      if (copyGamertagBtn) {
        copyGamertagBtn.onclick = () => {
          navigator.clipboard.writeText(data.gamertag);
          copyGamertagBtn.style.opacity = "0.5";
          setTimeout(() => copyGamertagBtn.style.opacity = "1", 800);
        };
      }
      const copyXUIDBtn = document.getElementById('copyBedrockXUID');
      if (copyXUIDBtn) {
        copyXUIDBtn.onclick = () => {
          navigator.clipboard.writeText(data.xuid);
          copyXUIDBtn.style.opacity = "0.5";
          setTimeout(() => copyXUIDBtn.style.opacity = "1", 800);
        };
      }

      // Download Bedrock skin handler
      const downloadBedrockSkin = document.getElementById('downloadBedrockSkin');
      if (downloadBedrockSkin) {
        downloadBedrockSkin.onclick = async (e) => {
          e.preventDefault();
          const url = `https://starlightskins.lunareclipse.studio/render/skin/.${data.gamertag}/default`;
          const response = await fetch(url);
          const blob = await response.blob();
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = `.${data.gamertag}_skin.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(link.href);
        };
      }
    }, 100);
    
  } catch (err) {
    resultDiv.innerHTML = `<p class="text-danger" style="font-size: 90%;">Bedrock user not found.</p>`;
  }
}