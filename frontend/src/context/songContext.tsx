import { createContext, useCallback } from "react";
import React, { useState, useMemo } from "react";

const defaultSong = {
  id: "5de11a305a58b41df485e98a",
  isPlaying: false,
  name: "Ozuna - Dificil Olvidar",
  url:
    "https://res.cloudinary.com/wlopez/video/upload/v1575033391/vapemusic2/2019/10/Ozuna%20%E2%80%93%20Dif%C3%ADcil%20Olvidar.mp3/gkxjvzeulzhoy9l0mzz8.mp3",
  imageUrl:
    "https://res.cloudinary.com/wlopez/image/upload/v1575033390/vapemusic2/2019/10/Ozuna%20-%20Niviru%20Cover.jpg/Ozuna_-_Niviru_Cover_z7mtjj.jpg"
};

// const oldDefaultSong = {
//   id: "5dd49e481ff73853b4757400",
//   isPlaying: false,
//   name: "El Nene La Amenaza - Me Hace Falta",
//   url:
//     "https://storage.cloud.google.com/files-wilfred/2019/10/El Nene La Amenaza - Me Hace Falta.mp3",
//   imageUrl:
//     "https://storage.cloud.google.com/files-wilfred/2019/10/Randy Nota Loca - La Vida Es Asi.jpg"
// };

const initialPlaylist = [defaultSong];

export interface SongContextPlaylist {
  id: string;
  url: string;
  imageUrl: string;
  name: string;
  isPlaying: boolean;
}

export interface ISongContext {
  playAudio: (song: SongContextPlaylist) => void;
  addToPlaylist: (song: SongContextPlaylist) => void;
  playlist: SongContextPlaylist[];
  deleteFromPlaylist: (id: string) => void;
  currentlyPlaying: SongContextPlaylist;
  setCurrentlyPlaying: React.Dispatch<
    React.SetStateAction<SongContextPlaylist>
  >;
  togglePlaying: (playing: boolean) => void;
  setPlaylist: React.Dispatch<React.SetStateAction<SongContextPlaylist[]>>;
}

const initialContext: ISongContext = {
  playAudio: () => {},
  playlist: [],
  addToPlaylist: () => {},
  togglePlaying: () => {},
  setPlaylist: () => {},
  deleteFromPlaylist: () => {},
  currentlyPlaying: initialPlaylist[0],
  setCurrentlyPlaying: () => {}
};

const SongsContext = createContext(initialContext);

const SongsContextProvider: React.FC = React.memo(props => {
  const [playlist, setPlaylist] = useState<SongContextPlaylist[]>(
    initialPlaylist
  );

  const [currentlyPlaying, setCurrentlyPlaying] = useState<SongContextPlaylist>(
    initialPlaylist[0]
  );

  const currenlyValues = useMemo(
    () => ({
      currentlyPlaying,
      setCurrentlyPlaying
    }),
    [currentlyPlaying, setCurrentlyPlaying]
  );

  const playlistMemo = useMemo(
    () => ({
      playlist,
      setPlaylist
    }),
    [playlist, setPlaylist]
  );

  const addToPlaylist = useCallback(
    (song: SongContextPlaylist) => {
      // const exist = playlist.find(s => s.id === song.id);
      const exist = playlistMemo.playlist.find(s => s.id === song.id);
      if (exist) {
        // console.log("Song Is Already On THe Playlist");
        return;
      } else {
        // const currentList = [...playlist];
        const currentList = [...playlistMemo.playlist];

        currentList.push(song);
        playlistMemo.setPlaylist(() => currentList);
        // setPlaylist(() => currentList);
      }
    },
    [playlistMemo]
  );

  const playAudio = useCallback(
    (song: SongContextPlaylist) => {
      function playAudioFn(song: SongContextPlaylist) {
        const newFile: SongContextPlaylist = {
          ...song,
          isPlaying: true
        };

        // setCurrentlyPlaying(() => newFile);
        currenlyValues.setCurrentlyPlaying(() => newFile);

        addToPlaylist(newFile);
      }

      return playAudioFn(song);
    },
    [addToPlaylist, currenlyValues]
  );

  function togglePlaying(playing: boolean) {
    currenlyValues.setCurrentlyPlaying(c => {
      return { ...c, isPlaying: playing };
    });
    // setCurrentlyPlaying(c => {
    //   return { ...c, isPlaying: playing };
    // });
  }

  function deleteFromPlaylist(id: string) {
    const updatedPlaylist = playlist.filter(pi => pi.id !== id);
    playlistMemo.setPlaylist(() => updatedPlaylist);
    // setPlaylist(() => updatedPlaylist);
  }

  return (
    <SongsContext.Provider
      value={{
        ...currenlyValues,
        playAudio,
        addToPlaylist,
        playlist: playlistMemo.playlist,
        setPlaylist: playlistMemo.setPlaylist,
        togglePlaying,
        deleteFromPlaylist
      }}
    >
      {props.children}
    </SongsContext.Provider>
  );
});

export { SongsContext, SongsContextProvider };
