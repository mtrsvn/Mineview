// Java Edition Search
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
      <div style="margin-bottom:15px;">
        <img src="https://starlightskins.lunareclipse.studio/render/walking/${data.username}/full" 
             class="skin-image" 
             style="margin: 10px;" />
      </div>
      <div>
        <a href="https://starlightskins.lunareclipse.studio/render/skin/${data.username}/default" 
           download="${data.username}_skin.png" 
           style="font-size: 1em; text-decoration: none; color: #9FB3DF;"
           target="_blank">
           Download Skin
        </a>
      </div>
    </div>
  `;
  
  
  } catch (err) {
    resultDiv.innerHTML = `<p class="text-danger" style="font-size: 90%;">Java user not found.</p>`;
  }
}

// Bedrock Edition Search
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
      <div style="margin-bottom:15px;">
        <img src="https://starlightskins.lunareclipse.studio/render/walking/.${data.gamertag}/full" 
             class="skin-image" 
             style="margin: 10px;" />
      </div>
      <div>
        <a href="https://starlightskins.lunareclipse.studio/render/skin/.${data.gamertag}/default" 
           download=".${data.gamertag}_skin.png" 
           style="font-size: 1em; text-decoration: none; color: #9FB3DF;"
           target="_blank">
           Download Skin
        </a>
      </div>
    </div>
  `;
  } catch (err) {
    resultDiv.innerHTML = `<p class="text-danger" style="font-size: 90%;">Bedrock user not found.</p>`;
  }
}