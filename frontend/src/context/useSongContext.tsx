import { useContext, useCallback } from "react";
import { SongContextPlaylist, SongsContext } from "./songContext";

const useSongContext = () => {
  const {
    addToPlaylist,
    currentlyPlaying,
    deleteFromPlaylist,
    playAudio,
    playlist,
    togglePlaying,
    setPlaylist,
    setCurrentlyPlaying
  } = useContext(SongsContext);

  const { isPlaying, id } = currentlyPlaying;

  const findPlaylistIndex = useCallback(() => {
    return playlist.findIndex(s => s.id === id);
  }, [playlist, id]);

  // let currentIndex = playlist.findIndex(s => s.id === id);
  let currentIndex = findPlaylistIndex();

  function bukAddPlaylist(songs: SongContextPlaylist[]) {
    const filteredNew = songs.filter(s => {
      return playlist.filter(existing => existing.id === s.id);
    });

    const currentList = [...playlist, ...filteredNew];
    setPlaylist(() => currentList);
  }

  function replacePlaylistAndPlay(songs: SongContextPlaylist[]) {
    const filteredNew = songs.filter(s => {
      return playlist.filter(existing => existing.id === s.id);
    });

    filteredNew[0].isPlaying = true;

    const currentList = [...filteredNew];

    setPlaylist(() => currentList);
    setCurrentlyPlaying(filteredNew[0]);
  }

  // Play the previous track in the tracks array
  function playPreviousTrack() {
    const newIndex =
      (((currentIndex + -1) % playlist.length) + playlist.length) %
      playlist.length;

    playTrack(newIndex);
  }

  // Play the next track in the tracks array
  function playNextTrack() {
    const newIndex = (currentIndex + 1) % playlist.length;

    playTrack(newIndex);
  }

  // Play a specific track
  function playTrack(index: number) {
    if (index === currentIndex) {
      console.log("Is Same Index");
      togglePlaying(true);
    } else {
      try {
        if (playlist.length > 0) {
          const newPL: SongContextPlaylist = playlist[index];
          if (newPL.id === currentlyPlaying.id) {
            console.log("You are trying to set the same track to play again");
            return;
          }

          const updatedPlayllist = playlist.map(p => {
            if (p.id === newPL.id) {
              return { ...p, isPlaying: true };
            } else if (p.id === currentlyPlaying.id) {
              return { ...p, isPlaying: false };
            } else {
              return p;
            }
          });

          setPlaylist(() => updatedPlayllist);
          playAudio(newPL);
        }
      } catch (e) {
        console.log(e);
      }
      // playAudio({ ...newPL, isPlaying: true });
    }
  }

  return {
    addToPlaylist,
    currentlyPlaying,
    setCurrentlyPlaying,
    isPlaying,
    playAudio,
    playlist,
    deleteFromPlaylist,
    togglePlaying,
    currentIndex,
    playTrack,
    playNextTrack,
    playPreviousTrack,
    bukAddPlaylist,
    replacePlaylistAndPlay
  };
};

export default useSongContext;
