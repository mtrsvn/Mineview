import React, { useState } from "react";
// skinview3d is loaded globally via CDN, so window.skinview3d will be available

function ProfileBox() {
  const [username, setUsername] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Use flex and justify-center items-center for button text centering
  const inputBtnHeight = "min-h-[36px] h-[36px]";
  const btnClass = `btn profile-btn ${inputBtnHeight} rounded-[10px] px-[10px] py-[2px] border-[1.5px] border-white text-white bg-transparent transition-all duration-200 hover:bg-[#444] hover:text-white hover:shadow-[0_0_8px_#222] hover:cursor-pointer focus:bg-[#444] focus:text-white focus:shadow-[0_0_8px_#222] focus:cursor-pointer w-full sm:w-auto flex justify-center items-center`;
  const inputClass = `form-control profile-input ${inputBtnHeight} rounded-[10px] px-[10px] py-[2px] border-[1.5px] border-white text-white bg-[#222] transition-all duration-200 focus:border-[#888] focus:shadow-[0_0_6px_#222] hover:border-[#888] hover:shadow-[0_0_6px_#222] w-full sm:w-auto`;

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
        <p className="text-red-600 text-[90%]">Java user not found.</p>
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
        <p className="text-red-600 text-[90%]">Bedrock user not found.</p>
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-box">
      <div className="search-container flex flex-col sm:flex-row gap-[10px] mb-[6px]">
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className={inputClass}
          placeholder="Steve"
        />
        <div className="button-container flex flex-col sm:flex-row gap-[10px] flex-none w-full sm:w-auto">
          <button
            className={btnClass}
            disabled={loading}
            onClick={handleSearchJava}
            style={{ fontSize: "1em" }}
          >
            Java
          </button>
          <button
            className={btnClass}
            disabled={loading}
            onClick={handleSearchBedrock}
            style={{ fontSize: "1em" }}
          >
            Bedrock
          </button>
        </div>
      </div>
      <div id="result">{result}</div>
      {/* Add responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .profile-box .search-container {
            flex-direction: column !important;
          }
          .profile-box .profile-input {
            width: 100% !important;
            min-width: 0 !important;
          }
          .profile-box .button-container {
            flex-direction: column !important;
            width: 100% !important;
          }
          .profile-box .button-container .profile-btn {
            width: 100% !important;
            min-width: 0 !important;
          }
        }
        @media (max-width: 500px) {
          .profile-box #skinViewer, 
          .profile-box #skinViewerBedrock {
            width: 100% !important;
            height: 220px !important;
            min-width: 0;
          }
        }
      `}</style>
    </div>
  );
}

function JavaResult({ data }) {
  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    if (window.Swal) {
      window.Swal.fire({
        title: `Copied ${label}`,
        timer: 1200,
        showConfirmButton: false,
        position: "top",
        toast: true,
        icon: undefined,
        customClass: {
          title: 'swal-title-dark'
        }
      });
    }
  };

  React.useEffect(() => {
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
    <div className="m-[6px]">
      <h4 className="m-[6px] text-[1.3em]">Java Profile: </h4>
      <p className="m-[6px] text-[90%]">
        Username: {data.username}
        <i className="fa-solid fa-copy cursor-pointer text-[0.9em] align-middle ml-[6px]" title="Copy Username"
          onClick={() => handleCopy(data.username, "Username")} />
      </p>
      <p className="m-[6px] text-[90%]">
        UUID: {data.id}
        <i className="fa-solid fa-copy cursor-pointer text-[0.9em] align-middle ml-[6px]" title="Copy UUID"
          onClick={() => handleCopy(data.id, "UUID")} />
      </p>
      <div id="skinViewer" className="m-[6px_auto]" style={{ width: "300px", height: "400px", maxWidth: "100%" }}></div>
      <div className="download-btn-container">
        <a
          href={`https://starlightskins.lunareclipse.studio/render/skin/${data.username}/default`}
          className="btn profile-btn mt-[6px] rounded-[10px] block px-[10px] py-[4px] border-[1.5px] border-white text-white bg-transparent transition-all duration-200 hover:bg-[#444] hover:text-white hover:shadow-[0_0_8px_#222] hover:cursor-pointer focus:bg-[#444] focus:text-white focus:shadow-[0_0_8px_#222] focus:cursor-pointer"
          download={`${data.username}_skin.png`}
        >
          Download Skin
        </a>
      </div>
    </div>
  );
}

function BedrockResult({ data }) {
  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    if (window.Swal) {
      window.Swal.fire({
        title: `Copied ${label}`,
        timer: 1200,
        showConfirmButton: false,
        position: "top",
        toast: true,
        icon: undefined,
        customClass: {
          title: 'swal-title-dark'
        }
      });
    }
  };

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
    <div className="m-[6px]">
      <h4 className="m-[6px] text-[1.3em]">Bedrock Profile: </h4>
      <p className="m-[6px] text-[90%]">
        Gamertag: {data.gamertag}
        <i className="fa-solid fa-copy cursor-pointer text-[0.9em] align-middle ml-[6px]" title="Copy Gamertag"
          onClick={() => handleCopy(data.gamertag, "Gamertag")} />
      </p>
      <p className="m-[6px] text-[90%]">
        XUID: {data.xuid}
        <i className="fa-solid fa-copy cursor-pointer text-[0.9em] align-middle ml-[6px]" title="Copy XUID"
          onClick={() => handleCopy(data.xuid, "XUID")} />
      </p>
      <div id="skinViewerBedrock" className="m-[6px_auto]" style={{ width: "300px", height: "400px", maxWidth: "100%" }}></div>
      <div className="download-btn-container">
        <a
          href={`https://starlightskins.lunareclipse.studio/render/skin/.${data.gamertag}/default`}
          className="btn profile-btn mt-[6px] rounded-[10px] block px-[10px] py-[4px] border-[1.5px] border-white text-white bg-transparent transition-all duration-200 hover:bg-[#444] hover:text-white hover:shadow-[0_0_8px_#222] hover:cursor-pointer focus:bg-[#444] focus:text-white focus:shadow-[0_0_8px_#222] focus:cursor-pointer"
          download={`.${data.gamertag}_skin.png`}
        >
          Download Skin
        </a>
      </div>
    </div>
  );
}

export default ProfileBox;