import React, { useEffect, useState, useRef } from "react";
import throttle from "../../../utils/throttle";
import SongContent from "../songs/SongContent";
import { Button, Container, CircularProgress } from "@material-ui/core";
import useSongContext from "../../../context/useSongContext";
import { SongContextPlaylist } from "../../../context/songContext";
import { PlayArrow } from "@material-ui/icons";
import { BigSpinner } from "../../shared/BigSpinner";

export interface ISearchProps {
  query: string;
  initialLimit: number;
}
const globalIncrement = 3; //*could be replaced by the initial limit
const bottomTheshold = 950;

//WITH LAZY LOADING

const SearchContent: React.FC<ISearchProps> = ({
  query,
  initialLimit
}: ISearchProps) => {
  const [limit, setLimit] = useState(initialLimit);
  const [hasMore, setHasMore] = useState(true);
  const [wait, setWait] = useState(false);
  const refSkip = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [scrollBotton, setScrollBotton] = useState<number | null>(null);
  const throttledOnScrollListener = throttle(onScrollListener, 150);
  const { replacePlaylistAndPlay } = useSongContext();

  const fakeData: SongContextPlaylist[] = [];
  const loading = false;
  const data = fakeData;

  function onScrollListener(e: MouseEvent) {
    if (e && scrollRef && scrollRef.current) {
      setScrollBotton(scrollRef.current.getBoundingClientRect().bottom);
      // console.log(scrollRef.current.getBoundingClientRect().bottom)
    }
  }

  useEffect(() => {
    document.addEventListener("scroll", throttledOnScrollListener);
    return () => {
      document.removeEventListener("scroll", throttledOnScrollListener);
    };
  }, [throttledOnScrollListener]);

  return (
    <div ref={scrollRef} style={{ width: "100%" }}>
      {query !== "" ? (
        <>
          <br />
          <br />
          <h1 style={{ textAlign: "center" }}>
            Results for{" "}
            <u>{query.substring(0, 1).toUpperCase() + query.substring(1)}</u>
          </h1>

          {/* LOGIC FOR SEARCH HERE */}
          <div>
            {() => {
              const callFecthMore = (newLimit: number) => {
                setWait(true);

                const fetchMore = ({ query, updateQuery }: any) => {};

                async function fetchTheInfo() {
                  await fetchMore({
                    query: "searchSongs",
                    updateQuery: (
                      previewsResults: any,
                      { fetchMoreResult }: any
                    ) => {
                      if (fetchMoreResult && fetchMoreResult.searchSongs) {
                        setLimit(newLimit);

                        // if (scrollBotton) {
                        //   scrollThreshold.current = scrollRef.current
                        //     ? scrollRef.current.getBoundingClientRect()
                        //         .bottom + 900
                        //     : scrollBotton + 900
                        // }

                        if (
                          fetchMoreResult.searchSongs.songs.length ===
                          fetchMoreResult.searchSongs.totalCount
                        ) {
                          setHasMore(false);
                        }

                        if (scrollRef.current) {
                          setScrollBotton(
                            scrollRef.current.getBoundingClientRect().bottom
                          );
                        }

                        return fetchMoreResult;
                      }

                      return previewsResults;
                    },
                    variables: {
                      query: query,
                      limit: newLimit,
                      skip: refSkip.current
                    }
                  });
                }
                fetchTheInfo().then(() => {
                  setTimeout(() => {
                    setWait(false);
                  }, 2000);
                });
              };

              if (data && data.length > 0) {
                if (data.length === 1) {
                  setHasMore(false);
                }
                const passThreshold =
                  scrollBotton !== null && scrollBotton < bottomTheshold;

                const doCallMore =
                  hasMore &&
                  data.length > 0 &&
                  passThreshold &&
                  !loading &&
                  !wait;

                return (
                  <>
                    <div>
                      {doCallMore ? callFecthMore(limit + globalIncrement) : ""}
                      <div>
                        <div
                          style={{
                            position: "fixed",

                            right: "3%",
                            top: "9%",
                            zIndex: 1
                          }}
                        >
                          <Button
                            variant="contained"
                            color="primary"
                            style={{
                              backgroundColor: "rgba(205, 47, 47, 0.89)"
                            }}
                            title="Play all results"
                            endIcon={<PlayArrow />}
                            onClick={() => {
                              const songsTopdate: SongContextPlaylist[] = data.map(
                                s => {
                                  let newS: SongContextPlaylist = {
                                    id: s.id,
                                    imageUrl: s.imageUrl,
                                    isPlaying: false,
                                    name: s.name,
                                    url: s.url
                                  };

                                  return newS;
                                }
                              );

                              replacePlaylistAndPlay(songsTopdate);
                            }}
                          >
                            Play All
                          </Button>
                        </div>
                        {/* <Container>
                          {hasMore && <p>Scroll Down To Load More</p>}
                        </Container> */}
                        <SongContent Songs={data} />
                        <Container
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignContent: "center",
                            alignItems: "center"
                          }}
                        >
                          <div style={{ height: "100px" }}>
                            {hasMore || loading ? (
                              <CircularProgress />
                            ) : (
                              <p>All Results Loaded</p>
                            )}
                          </div>
                        </Container>
                      </div>
                    </div>
                  </>
                );
              } else if (data && data.length > 0) {
                return <div>No Results Found</div>;
              } else {
                return <BigSpinner />;
              }
            }}
          </div>
        </>
      ) : (
        <div>
          <p>Please specify a search query</p>
        </div>
      )}
    </div>
  );
};

export default SearchContent;
