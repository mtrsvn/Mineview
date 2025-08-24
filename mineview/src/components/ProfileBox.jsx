import React, { useState } from "react";
// skinview3d is loaded globally via CDN, so window.skinview3d will be available

function ProfileBox() {
  const [username, setUsername] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearchJava = async () => {
    setLoading(true);
    setResult(<p>Loading Java profile...</p>);
    try {
      const response = await fetch(
        `https://playerdb.co/api/player/minecraft/${username}`
      );
      if (!response.ok) throw new Error("User not found");
      const result = await response.json();
      const data = result.data.player;
      setResult(
        <JavaResult data={data} />
      );
    } catch (err) {
      setResult(
        <p className="text-danger" style={{ fontSize: "90%" }}>Java user not found.</p>
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSearchBedrock = async () => {
    setLoading(true);
    setResult(<p>Loading Bedrock profile...</p>);
    try {
      const response = await fetch(
        `https://mcprofile.io/api/v1/bedrock/gamertag/${username}`
      );
      if (!response.ok) throw new Error("User not found");
      const data = await response.json();
      setResult(
        <BedrockResult data={data} />
      );
    } catch (err) {
      setResult(
        <p className="text-danger" style={{ fontSize: "90%" }}>Bedrock user not found.</p>
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-box">
      <div className="search-container">
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="form-control"
          placeholder="Steve"
          style={{ color: "#fff" }}
        />
        <div className="button-container">
          <button className="btn" disabled={loading} onClick={handleSearchJava}>Java</button>
          <button className="btn" disabled={loading} onClick={handleSearchBedrock}>Bedrock</button>
        </div>
      </div>
      <div id="result">{result}</div>
    </div>
  );
}

// Helper components for rendering results

function JavaResult({ data }) {
  React.useEffect(() => {
    // skinview3d needs to be loaded via CDN and available as window.skinview3d
    const container = document.getElementById("skinViewer");
    if (container && window.skinview3d && window.skinview3d.SkinViewer) {
      container.innerHTML = "";
      const isMobile = window.innerWidth <= 768;
      const width = isMobile ? 200 : 300;
      const height = isMobile ? 260 : 400;
      const skinViewer = new window.skinview3d.SkinViewer({
        width,
        height,
        skin: `https://starlightskins.lunareclipse.studio/render/skin/${data.id}/default`,
      });
      container.appendChild(skinViewer.canvas);
      if (window.skinview3d.IdleAnimation) {
        skinViewer.animation = new window.skinview3d.IdleAnimation();
        skinViewer.animation.speed = 0.5;
      }
    }
  }, [data.id]);
  return (
    <div style={{ margin: "10px" }}>
      <h4 style={{ margin: "10px", fontSize: "1.3em" }}>Java Profile: </h4>
      <p style={{ margin: "10px", fontSize: "90%" }}>
        Username: {data.username}
        <i className="fa-solid fa-copy" style={{ cursor: "pointer", fontSize: "0.9em", verticalAlign: "middle", marginLeft: "6px" }} title="Copy Username"
          onClick={() => navigator.clipboard.writeText(data.username)} />
      </p>
      <p style={{ margin: "10px", fontSize: "90%" }}>
        UUID: {data.id}
        <i className="fa-solid fa-copy" style={{ cursor: "pointer", fontSize: "0.9em", verticalAlign: "middle", marginLeft: "6px" }} title="Copy UUID"
          onClick={() => navigator.clipboard.writeText(data.id)} />
      </p>
      <div id="skinViewer" style={{ margin: "10px auto", width: "300px", height: "400px" }}></div>
      <div className="download-btn-container">
        <a
          href={`https://starlightskins.lunareclipse.studio/render/skin/${data.username}/default`}
          className="btn w-100"
          style={{ marginTop: "10px" }}
          download={`${data.username}_skin.png`}
        >
          Download Skin
        </a>
      </div>
    </div>
  );
}

function BedrockResult({ data }) {
  React.useEffect(() => {
    const container = document.getElementById("skinViewerBedrock");
    if (container && window.skinview3d && window.skinview3d.SkinViewer) {
      container.innerHTML = "";
      const isMobile = window.innerWidth <= 768;
      const width = isMobile ? 200 : 300;
      const height = isMobile ? 260 : 400;
      const skinViewer = new window.skinview3d.SkinViewer({
        width,
        height,
        skin: `https://starlightskins.lunareclipse.studio/render/skin/.${data.gamertag}/default`,
      });
      container.appendChild(skinViewer.canvas);
      if (window.skinview3d.IdleAnimation) {
        skinViewer.animation = new window.skinview3d.IdleAnimation();
        skinViewer.animation.speed = 0.5;
      }
    }
  }, [data.gamertag]);
  return (
    <div style={{ margin: "10px" }}>
      <h4 style={{ margin: "10px", fontSize: "1.3em" }}>Bedrock Profile: </h4>
      <p style={{ margin: "10px", fontSize: "90%" }}>
        Gamertag: {data.gamertag}
        <i className="fa-solid fa-copy" style={{ cursor: "pointer", fontSize: "0.9em", verticalAlign: "middle", marginLeft: "6px" }} title="Copy Gamertag"
          onClick={() => navigator.clipboard.writeText(data.gamertag)} />
      </p>
      <p style={{ margin: "10px", fontSize: "90%" }}>
        XUID: {data.xuid}
        <i className="fa-solid fa-copy" style={{ cursor: "pointer", fontSize: "0.9em", verticalAlign: "middle", marginLeft: "6px" }} title="Copy XUID"
          onClick={() => navigator.clipboard.writeText(data.xuid)} />
      </p>
      <div id="skinViewerBedrock" style={{ margin: "10px auto", width: "300px", height: "400px" }}></div>
      <div className="download-btn-container">
        <a
          href={`https://starlightskins.lunareclipse.studio/render/skin/.${data.gamertag}/default`}
          className="btn w-100"
          style={{ marginTop: "10px" }}
          download={`.${data.gamertag}_skin.png`}
        >
          Download Skin
        </a>
      </div>
    </div>
  );
}

export default ProfileBox;