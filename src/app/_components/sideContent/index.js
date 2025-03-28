"use client";

import React, { useEffect, useState } from "react";
import "./index.css";
import Cookies from "js-cookie";

import Loading from "../loading";
import Link from "next/link";
import Something from "../something";
// const musicData = [
//   {
//     heading: "Editor's Picks",
//     Album: [
//       { id: 1, name: "All Out 90s", image: "/editor1.png" },
//       { id: 2, name: "Bollywood Hits", image: "/editor2.png" },
//       { id: 3, name: "Bollywood R&B", image: "/editor3.png" },
//       { id: 4, name: "Romantic Tunes", image: "/editor4.png" },
//       { id: 5, name: "Telugu Songs", image: "/editor5.png" },
//       { id: 6, name: "Happy Days", image: "/editor6.png" },
//       { id: 7, name: "Throwback Hits", image: "/editor7.png" },
//       { id: 8, name: "Hindustani", image: "/editor8.png" },
//       { id: 9, name: "80s Hits", image: "/editor9.png" },
//       { id: 10, name: "Drive", image: "/editor10.png" },
//     ],
//   },
//   {
//     heading: "Genres & Moods",
//     Album: [
//       { id: 1, name: "Love", image: "/genre1.png" },
//       { id: 2, name: "Romantic", image: "/genre2.png" },
//       { id: 3, name: "Bollywood", image: "/genre3.png" },
//       { id: 4, name: "8-Pop", image: "/genre4.png" },
//       { id: 5, name: "Party", image: "/genre5.png" },
//       { id: 6, name: "Tollywood", image: "/genre6.png" },
//       { id: 7, name: "Hip-Hop", image: "/genre7.png" },
//       { id: 8, name: "Rock", image: "/genre8.png" },
//       { id: 9, name: "Classic", image: "/genre9.png" },
//       { id: 10, name: "Relax", image: "/genre10.png" },
//       { id: 11, name: "Focus", image: "/genre11.png" },
//       { id: 12, name: "Hollywood", image: "/genre12.png" },
//     ],
//   },
//   {
//     heading: "New Releases",
//     Album: [
//       { id: 1, name: "The Boys", image: "/new1.png" },
//       { id: 2, name: "Last Night", image: "/new2.png" },
//       { id: 3, name: "Shakthi", image: "/new3.png" },
//       { id: 4, name: "MCA", image: "/new4.png" },
//       { id: 5, name: "1", image: "/new5.png" },
//       { id: 6, name: "Arjun Suravaram", image: "/new6.png" },
//       { id: 7, name: "Bahubali", image: "/new7.png" },
//       { id: 8, name: "Dhruva", image: "/new8.png" },
//       { id: 9, name: "Ajay Badri", image: "/new9.png" },
//       { id: 10, name: "Nenu Naa Rakshasi", image: "/new10.png" },
//       { id: 11, name: "Ongole", image: "/new11.png" },
//       { id: 12, name: "Hello!", image: "/new12.png" },
//     ],
//   },
// ];
function SideContent() {
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
      const response = await fetch("/api/audiopodc", {
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

export default SideContent;

// import React, { useState } from "react";
// import { Play, Pause, Volume2 } from "lucide-react";
// import "./index.css";

// const songs = [
//   {
//     track: "The Life of Ram",
//     album: "96",
//     time: "02:55",
//     artist: "Kala Bhairava",
//     added: "2 Months ago",
//   },
//   {
//     track: "Neetho unte",
//     album: "Josh",
//     time: "02:55",
//     artist: "Sooranna",
//     added: "5 days ago",
//   },
//   {
//     track: "Seetha andhallu",
//     album: "Subbasankalpam",
//     time: "02:55",
//     artist: "Subbasankalpam",
//     added: "2 years ago",
//   },
//   {
//     track: "Love u chinna",
//     album: "Love mocktail",
//     time: "02:55",
//     artist: "Love mocktail",
//     added: "2 Months ago",
//   },
//   {
//     track: "Neeve Neeve",
//     album: "Amma nanna oka tamil ammayi",
//     time: "02:55",
//     artist: "G. V. Prakash",
//     added: "1 Month ago",
//   },
//   {
//     track: "Hoyna Hoyna",
//     album: "Kaathalae kaathalae - Version 1",
//     time: "02:55",
//     artist: "Daler Mehndi",
//     added: "6 Months ago",
//   },
//   {
//     track: "Bujji Bangarm",
//     album: "Guna369",
//     time: "02:55",
//     artist: "Sarath Santosh",
//     added: "8 days ago",
//   },
//   {
//     track: "Kaathalae kaathalae - Version 2",
//     album: "Tholiprema",
//     time: "02:55",
//     artist: "Nakash Aziz",
//     added: "2 Months ago",
//   },
// ];

// const SideContent = () => {
//   const [isPlaying, setIsPlaying] = useState(false);

//   return (
//     <div className="music-player">
//       <header className="header">
//         <button className="back-button">← Back</button>
//         <div className="playlist-info">
//           <img
//             src="https://s3-alpha-sig.figma.com/img/41ee/8e30/d8745ae5f0b5fd016ad3dc446e3a0c73?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=J4NvO2P7PG7cVdHKP3dbw8hC6T-x4B9FtLcIkzlfoEOY5wCBsJdXO3QHlgYZHI9Jg-rt9yb3ZTEr1h2YwzhwjPBil21kISHQvwamw-kSoVnAvpscEwN~fpT5IoX9QbGJQt-Pe1pg9BCQDGiB1qSvwRbZvG1D4va48adqfenKVtrNgmt3Rske6j9qP0k5kylpGOTME7LVMJRtaSeuzIlpiFYEXcSwN6WdjtUquZlIukeVbm5y4I5XSRsZXoT0LQkvoxrcWN~J8PYv8zsZcwGG6ZG2WuxzEgSwAA6ufTSTOshERj4J72Ly4vQNSU~aBJqjMfQtPbPhNHVwue1d0RXvSA__"
//             alt="Playlist Cover"
//             className="cover"
//           />
//           <div
//             style={{ display: "flex", flexDirection: "column", gap: "20px" }}
//           >
//             <p className="editor-picks">Editor's picks</p>
//             <h1 className="heading-of-playlist">All Out 90’s Telugu</h1>
//             <p className="editor-picks">Mickey J. Meyer</p>
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
//             {songs.map((song, index) => (
//               <tr key={index} className="song">
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
//       </div>

//       <div className="player">
//         <div className="now-playing">
//           <img
//             src="https://s3-alpha-sig.figma.com/img/41ee/8e30/d8745ae5f0b5fd016ad3dc446e3a0c73?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=J4NvO2P7PG7cVdHKP3dbw8hC6T-x4B9FtLcIkzlfoEOY5wCBsJdXO3QHlgYZHI9Jg-rt9yb3ZTEr1h2YwzhwjPBil21kISHQvwamw-kSoVnAvpscEwN~fpT5IoX9QbGJQt-Pe1pg9BCQDGiB1qSvwRbZvG1D4va48adqfenKVtrNgmt3Rske6j9qP0k5kylpGOTME7LVMJRtaSeuzIlpiFYEXcSwN6WdjtUquZlIukeVbm5y4I5XSRsZXoT0LQkvoxrcWN~J8PYv8zsZcwGG6ZG2WuxzEgSwAA6ufTSTOshERj4J72Ly4vQNSU~aBJqjMfQtPbPhNHVwue1d0RXvSA__"
//             alt="Now Playing"
//             className="playing-cover"
//           />

//           <div>
//             <p className="now-title">Avunanna</p>
//             <p className="now-artist">Naresh Iyer, Swetha</p>
//           </div>
//         </div>
//         <div className="controls">
//           <button onClick={() => setIsPlaying(!isPlaying)} className="play-btn">
//             {isPlaying ? <Pause /> : <Play />}
//           </button>
//           <input type="range" className="progress-bar" />
//         </div>
//         <Volume2 className="volume-icon" />
//       </div>
//     </div>
//   );
// };

// export default SideContent;
