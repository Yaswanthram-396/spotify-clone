// "use client";

// import React, { useState, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation"; // Corrected import
// import Cookies from "js-cookie";
// import { Play, Pause, Volume2 } from "lucide-react";
// import "./index.css";

// export default function MusicPlayer() {
//   const params = useParams();
//   const { id, songsId } = params; // Get album ID & song ID from route
//   const router = useRouter();
//   const [playlist, setPlaylist] = useState(null); // Ensure correct data handling
//   const [audio, setAudio] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [currentSongName, setCurrentSongName] = useState("");
//   const [currentSongArtist, setCurrentSongArtist] = useState("");
//   const token = Cookies.get("token");
//   const audioid = "67e5af0f751582b11fd50c5e"; // Hardcoded audioID (Make it dynamic later)
//   const [audioUrl, setAudioUrl] = useState(null);
//   // const audioRef = useRef(null);

//   useEffect(() => {
//     if (!audioid) return;
//     handlefetchAudio();

//     return () => {
//       if (audioUrl) URL.revokeObjectURL(audioUrl); // Cleanup Object URL
//     };
//   }, [audioid]);

//   useEffect(() => {
//     if (id && songsId) {
//       fetchAudio();
//     }
//   }, [id, songsId]); // Ensure songsId is included for re-fetching
//   const handlefetchAudio = async () => {
//     try {
//       const response = await fetch(`/api/music/${audioid}`);

//       if (!response.ok) {
//         console.error("Error fetching audio:", response.status);
//         return;
//       }

//       const blob = await response.blob();
//       const url = URL.createObjectURL(blob);
//       setAudioUrl(url);
//     } catch (error) {
//       console.error("Error fetching audio:", error);
//     }
//   };
//   const fetchAudio = async () => {
//     try {
//       const response = await fetch(`/api/musicplayer/${id}/${songsId}`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) {
//         console.log("Error fetching song:", response.status);
//       } else {
//         const data = await response.json();
//         setPlaylist(data.song);
//         setAudio(new Audio(data.song.audio_url)); // Assuming audio_url contains the song link
//         setIsLoading(false);
//       }
//     } catch (error) {
//       console.error("Error fetching audio:", error);
//     }
//   };

//   const togglePlayPause = () => {
//     if (!audio) return;

//     if (isPlaying) {
//       audio.pause();
//     } else {
//       audio.play();
//     }
//     setIsPlaying(!isPlaying);
//   };
//   const handleSongClick = (song) => {
//     console.log(song);
//     setCurrentSongName(song.track);
//     setCurrentSongArtist(song.artist);
//   };

//   return (
//     <div className="music-player">
//       <header className="header">
//         <button className="back-button" onClick={() => router.back()}>
//           ← Back
//         </button>
//         <div className="playlist-info">
//           <img
//             src="https://s3-alpha-sig.figma.com/img/41ee/8e30/d8745ae5f0b5fd016ad3dc446e3a0c73?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=J4NvO2P7PG7cVdHKP3dbw8hC6T-x4B9FtLcIkzlfoEOY5wCBsJdXO3QHlgYZHI9Jg-rt9yb3ZTEr1h2YwzhwjPBil21kISHQvwamw-kSoVnAvpscEwN~fpT5IoX9QbGJQt-Pe1pg9BCQDGiB1qSvwRbZvG1D4va48adqfenKVtrNgmt3Rske6j9qP0k5kylpGOTME7LVMJRtaSeuzIlpiFYEXcSwN6WdjtUquZlIukeVbm5y4I5XSRsZXoT0LQkvoxrcWN~J8PYv8zsZcwGG6ZG2WuxzEgSwAA6ufTSTOshERj4J72Ly4vQNSU~aBJqjMfQtPbPhNHVwue1d0RXvSA__"
//             alt="Playlist Cover"
//             className="cover"
//           />
//           <div
//             style={{ display: "flex", flexDirection: "column", gap: "20px" }}
//             className="playlist-info-container"
//           >
//             <div className="editor-song">
//               <p className="editor-picks">Editor's picks</p>
//             </div>
//             <div className="heading-song">
//               <h1 className="heading-of-playlist">
//                 {playlist?.name || "Unknown Song"}
//               </h1>
//             </div>
//             <div className="artist-name">
//               <p className="editor-picks">
//                 {playlist?.artist || "Unknown Artist"}
//               </p>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="song-list-control">
//         <table className="song-list">
//           <thead>
//             <tr>
//               <th></th>
//               <th>Track</th>
//               <th>Album</th>
//               <th>Time</th>
//               <th>Artist</th>
//               <th>Added</th>
//             </tr>
//           </thead>
//           <tbody>
//             {playlist?.songs?.map((song, index) => (
//               <tr
//                 key={index}
//                 className="song"
//                 style={{
//                   backgroundColor:
//                     song.track === currentSongName ? "#303030" : "",
//                 }}
//                 onClick={() => handleSongClick(song)}
//               >
//                 <td>{index + 1}</td>
//                 <td>{song.track}</td>
//                 <td>{song.album}</td>
//                 <td>{song.time}</td>
//                 <td>{song.artist}</td>
//                 <td>{song.added}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <div className="song-list-container mobile-song-list">
//           {playlist?.songs?.map((song, index) => (
//             <div
//               key={index}
//               className={`song-item ${
//                 song.track === currentSongName ? "active" : ""
//               }`}
//               onClick={() => handleSongClick(song)}
//             >
//               <div className="song-info">
//                 <p className="song-title">{song.track}</p>
//                 <p className="song-artist">{song.artist}</p>
//               </div>
//               <p className="song-time">{song.time}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="player">
//         <div className="now-playing">
//           <img
//             src="https://s3-alpha-sig.figma.com/img/41ee/8e30/d8745ae5f0b5fd016ad3dc446e3a0c73?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=J4NvO2P7PG7cVdHKP3dbw8hC6T-x4B9FtLcIkzlfoEOY5wCBsJdXO3QHlgYZHI9Jg-rt9yb3ZTEr1h2YwzhwjPBil21kISHQvwamw-kSoVnAvpscEwN~fpT5IoX9QbGJQt-Pe1pg9BCQDGiB1qSvwRbZvG1D4va48adqfenKVtrNgmt3Rske6j9qP0k5kylpGOTME7LVMJRtaSeuzIlpiFYEXcSwN6WdjtUquZlIukeVbm5y4I5XSRsZXoT0LQkvoxrcWN~J8PYv8zsZcwGG6ZG2WuxzEgSwAA6ufTSTOshERj4J72Ly4vQNSU~aBJqjMfQtPbPhNHVwue1d0RXvSA__"
//             alt="Now Playing"
//             className="playing-cover"
//           />
//           <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
//             <p className="now-title">{currentSongName}</p>
//             <p className="now-artist">{currentSongArtist}</p>
//           </div>
//         </div>

//         <div className="controls">

//           <div className="music-player">
//             {audioUrl ? (
//               <audio controls>
//                 <source src={audioUrl} type="audio/mpeg" />
//                 Your browser does not support the audio element.
//               </audio>
//             ) : (
//               <p>Loading audio...</p>
//             )}
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }

// "use client";

// import React, { useState, useEffect, useRef } from "react";

// export default function MusicPlayer() {
//   const audioid = "67e5af0f751582b11fd50c5e"; // Hardcoded audioID (Make it dynamic later)
//   const [audioUrl, setAudioUrl] = useState(null);
//   const audioRef = useRef(null);

//   useEffect(() => {
//     if (!audioid) return;
//     fetchAudio();

//     return () => {
//       if (audioUrl) URL.revokeObjectURL(audioUrl); // Cleanup Object URL
//     };
//   }, [audioid]);

//   const fetchAudio = async () => {
//     try {
//       const response = await fetch(`/api/music/${audioid}`);

//       if (!response.ok) {
//         console.error("Error fetching audio:", response.status);
//         return;
//       }

//       const blob = await response.blob();
//       const url = URL.createObjectURL(blob);
//       setAudioUrl(url);
//     } catch (error) {
//       console.error("Error fetching audio:", error);
//     }
//   };

//   return (
//     <div className="music-player">
//       {audioUrl ? (
//         <audio controls ref={audioRef} autoPlay>
//           <source src={audioUrl} type="audio/mpeg" />
//           Your browser does not support the audio element.
//         </audio>
//       ) : (
//         <p>Loading audio...</p>
//       )}
//     </div>
//   );
// }

"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Play, Pause, Volume2 } from "lucide-react";
import "./index.css";
import Loading from "../loading";
import Link from "next/link";
import Something from "../something";

function SideBarContent() {
  const [editorPics, setEditorPics] = useState([]);
  const [musicData, setMusicData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    fetchMusicData();
  }, []);
  const fetchMusicData = async () => {
    const cookie = Cookies.get("token");
    setIsLoading(true);
    try {
      const response = await fetch("/api/podcasts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookie.value}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch music data");
      }

      const data = await response.json();
      console.log(data);
      setMusicData(data.audio);
      setIsLoading(false);
      setError(false);
    } catch (error) {
      console.error("Error fetching music data:", error);
      setError(true);
      setIsLoading(false);
    }
  };

  return (
    <div className="side-content-container">
      {error ? (
        <Something />
      ) : (
        <>
          {isLoading ? (
            <Loading />
          ) : (
            <div>
              {musicData.map((item, index) => (
                <div className="side-content-heading" key={item._id}>
                  <div className="side-content-heading-container">
                    <h3 className="heading-text">{item.heading}</h3>
                  </div>
                  <div className="song-box-container">
                    {item.Album.map((song) => (
                      // <img src={song.image} alt={song.name} />
                      <Link
                        href={`/musicplayer/${item._id}/${song.id}`}
                        key={song.id}
                      >
                        <div className="song-box-with-name" key={song.id}>
                          <div className="song-box">
                            {/* <p>{song.name}</p> */}
                          </div>
                          <p>{song.name}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function MusicPlayer() {
  const params = useParams();
  const { id, songsId } = params;
  const router = useRouter();
  const [playlist, setPlaylist] = useState(null);
  const [audio, setAudio] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongName, setCurrentSongName] = useState("");
  const [currentSongArtist, setCurrentSongArtist] = useState("");
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const token = Cookies.get("token");
  const audioid = "67e5af0f751582b11fd50c5e";
  const [audioUrl, setAudioUrl] = useState(null);
  const audioRef = useRef(null);
  const progressRef = useRef(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!audioid) return;
    handlefetchAudio();

    return () => {
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [audioid]);

  useEffect(() => {
    if (id && songsId) {
      fetchAudio();
    }
  }, [id, songsId]);

  useEffect(() => {
    if (audioUrl && !audio) {
      const newAudio = new Audio(audioUrl);
      setAudio(newAudio);

      newAudio.addEventListener("loadedmetadata", () => {
        setDuration(newAudio.duration);
      });

      newAudio.addEventListener("timeupdate", () => {
        setCurrentTime(newAudio.currentTime);
      });

      return () => {
        newAudio.pause();
        newAudio.removeEventListener("loadedmetadata", () => {});
        newAudio.removeEventListener("timeupdate", () => {});
      };
    }
  }, [audioUrl, audio]);

  const handlefetchAudio = async () => {
    try {
      const response = await fetch(`/api/music/${audioid}`);

      if (!response.ok) {
        console.error("Error fetching audio:", response.status);
        return;
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
    } catch (error) {
      setError(true);
      console.error("Error fetching audio:", error);
    }
  };

  const fetchAudio = async () => {
    try {
      const response = await fetch(`/api/musicplayer/${id}/${songsId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.log("Error fetching song:", response.status);
      } else {
        const data = await response.json();
        setPlaylist(data.song);
        setIsLoading(false);
        setError(false);
      }
    } catch (error) {
      setError(true);
      console.error("Error fetching audio:", error);
    }
  };

  const togglePlayPause = () => {
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSongClick = (song) => {
    console.log(song);
    setCurrentSongName(song.track);
    setCurrentSongArtist(song.artist);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleProgressChange = (e) => {
    if (!audio || !duration) return;

    const progressBar = progressRef.current;
    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (clickX / width) * duration;

    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  return (
    <div className="music-player">
      {error ? (
        <Something />
      ) : (
        <>
          <header className="header">
            <button className="back-button" onClick={() => router.back()}>
              ← Back
            </button>
            <div className="playlist-info">
              <img
                src="https://s3-alpha-sig.figma.com/img/41ee/8e30/d8745ae5f0b5fd016ad3dc446e3a0c73?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=J4NvO2P7PG7cVdHKP3dbw8hC6T-x4B9FtLcIkzlfoEOY5wCBsJdXO3QHlgYZHI9Jg-rt9yb3ZTEr1h2YwzhwjPBil21kISHQvwamw-kSoVnAvpscEwN~fpT5IoX9QbGJQt-Pe1pg9BCQDGiB1qSvwRbZvG1D4va48adqfenKVtrNgmt3Rske6j9qP0k5kylpGOTME7LVMJRtaSeuzIlpiFYEXcSwN6WdjtUquZlIukeVbm5y4I5XSRsZXoT0LQkvoxrcWN~J8PYv8zsZcwGG6ZG2WuxzEgSwAA6ufTSTOshERj4J72Ly4vQNSU~aBJqjMfQtPbPhNHVwue1d0RXvSA__"
                alt="Playlist Cover"
                className="cover"
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
                className="playlist-info-container"
              >
                <div className="editor-song">
                  <p className="editor-picks">Editor's picks</p>
                </div>
                <div className="heading-song">
                  <h1 className="heading-of-playlist">
                    {playlist?.name || "Unknown Song"}
                  </h1>
                </div>
                <div className="artist-name">
                  <p className="editor-picks">
                    {playlist?.artist || "Unknown Artist"}
                  </p>
                </div>
              </div>
            </div>
          </header>

          <div className="song-list-control">
            <table className="song-list">
              <thead>
                <tr>
                  <th></th>
                  <th>Track</th>
                  <th>Album</th>
                  <th>Time</th>
                  <th>Artist</th>
                  <th>Added</th>
                </tr>
              </thead>
              <tbody>
                {playlist?.songs?.map((song, index) => (
                  <tr
                    key={index}
                    className="song"
                    style={{
                      backgroundColor:
                        song.track === currentSongName ? "#303030" : "",
                    }}
                    onClick={() => handleSongClick(song)}
                  >
                    <td>{index + 1}</td>
                    <td>{song.track}</td>
                    <td>{song.album}</td>
                    <td>{song.time}</td>
                    <td>{song.artist}</td>
                    <td>{song.added}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="song-list-container mobile-song-list">
              {playlist?.songs?.map((song, index) => (
                <div
                  key={index}
                  className={`song-item ${
                    song.track === currentSongName ? "active" : ""
                  }`}
                  onClick={() => handleSongClick(song)}
                >
                  <div className="song-info">
                    <p className="song-title">{song.track}</p>
                    <p className="song-artist">{song.artist}</p>
                  </div>
                  <p className="song-time">{song.time}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="player">
            <div className="now-playing">
              <img
                src="https://s3-alpha-sig.figma.com/img/41ee/8e30/d8745ae5f0b5fd016ad3dc446e3a0c73?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=J4NvO2P7PG7cVdHKP3dbw8hC6T-x4B9FtLcIkzlfoEOY5wCBsJdXO3QHlgYZHI9Jg-rt9yb3ZTEr1h2YwzhwjPBil21kISHQvwamw-kSoVnAvpscEwN~fpT5IoX9QbGJQt-Pe1pg9BCQDGiB1qSvwRbZvG1D4va48adqfenKVtrNgmt3Rske6j9qP0k5kylpGOTME7LVMJRtaSeuzIlpiFYEXcSwN6WdjtUquZlIukeVbm5y4I5XSRsZXoT0LQkvoxrcWN~J8PYv8zsZcwGG6ZG2WuxzEgSwAA6ufTSTOshERj4J72Ly4vQNSU~aBJqjMfQtPbPhNHVwue1d0RXvSA__"
                alt="Now Playing"
                className="playing-cover"
              />
              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                <p className="now-title">{currentSongName}</p>
                <p className="now-artist">{currentSongArtist}</p>
              </div>
            </div>

            <div className="controls">
              <div className="custom-audio-player">
                <button onClick={togglePlayPause} className="play-pause-btn">
                  {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                </button>
                <div className="audio-player-time">
                  <span className="current-time">
                    {formatTime(currentTime)}
                  </span>
                  <span>/</span>
                  <span className="duration">{formatTime(duration)}</span>
                </div>
                <div
                  className="progress-bar"
                  ref={progressRef}
                  onClick={handleProgressChange}
                >
                  <div
                    className="progress"
                    style={{
                      width: duration
                        ? `${(currentTime / duration) * 100}%`
                        : "0%",
                      backgroundColor: "#00ff00",
                    }}
                  />
                  <div
                    className="progress-handle"
                    style={{
                      left: duration
                        ? `${(currentTime / duration) * 100}%`
                        : "0%",
                    }}
                  />
                </div>
              </div>
            </div>
            <div>
              <button
                onClick={togglePlayPause}
                className="play-pause-btn-mobile"
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </button>
            </div>
          </div>
          <SideBarContent />
          {/* </div> */}
        </>
      )}
    </div>
  );
}
