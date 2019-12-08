import { Container, Typography } from "@material-ui/core";
import React from "react";
import ArtistsList from "../content/artists/artistList";
import PageHead from "../shared/pageHead";

interface Props {}

const songs = [
  {
    artistList: ["sech", "justin quiles"]
  },
  {
    artistList: ["farruko"]
  },
  {
    artistList: [
      "anuel aa",
      "daddy yankee",
      "wisin",
      "farruko",
      "zion & lennox"
    ]
  },
  {
    artistList: ["anuel aa", "bad bunny"]
  },
  {
    artistList: ["karol g"]
  },
  {
    artistList: ["justin quiles"]
  },
  {
    artistList: ["farruko"]
  },
  {
    artistList: ["luke combs"]
  },
  {
    artistList: [
      "dimelo flow",
      "sech",
      "dalex",
      "justin quiles",
      "lenny tavarez",
      "feid",
      "wisin",
      "zion"
    ]
  },
  {
    artistList: [
      "dalex",
      "lenny tavarez",
      "farruko",
      "natti natasha",
      "anitta",
      "justin quiles"
    ]
  },
  {
    artistList: ["espinoza paz"]
  },
  {
    artistList: ["icon", "lenny tavarez", "darell"]
  },
  {
    artistList: ["jhay cortez", "ozuna"]
  },
  {
    artistList: ["ozuna"]
  },
  {
    artistList: ["ozuna"]
  },
  {
    artistList: ["ozuna"]
  },
  {
    artistList: ["ozuna", "anuel aa", "snoop dogg"]
  },
  {
    artistList: ["ozuna", "dalex", "nicky jam"]
  },
  {
    artistList: ["ozuna", "sech"]
  },
  {
    artistList: ["ozuna", "diddy", "dj snake"]
  },
  {
    artistList: ["ozuna", "swae lee"]
  },
  {
    artistList: ["ozuna", "willy"]
  },
  {
    artistList: ["rauw alejandro", "farruko"]
  },
  {
    artistList: ["tempo", "ñengo flow", "baby rasta"]
  },
  {
    artistList: ["farruko", "ozuna", "arcangel"]
  },
  {
    artistList: ["luke combs"]
  },
  {
    artistList: ["luke combs"]
  },
  {
    artistList: ["luke combs"]
  },
  {
    artistList: ["romeo santos"]
  },
  {
    artistList: ["romeo santos"]
  },
  {
    artistList: ["rvssian", "darell", "myke towers", "zion & lennox"]
  },
  {
    artistList: ["quimico ultra mega"]
  },
  {
    artistList: ["natti natasha", "romeo santos"]
  },
  {
    artistList: ["nacho"]
  },
  {
    artistList: [
      "kevvo",
      "farruko",
      "chencho",
      "arcangel",
      "nengo",
      "darell",
      "brytiago"
    ]
  },
  {
    artistList: ["karol g", "jessie reyez"]
  },
  {
    artistList: ["j álvarez", "juhn el allstar"]
  },
  {
    artistList: ["farruko", "ozuna", "lunay", "sech"]
  },
  {
    artistList: ["cuitla vega"]
  },
  {
    artistList: ["akon", "farruko"]
  },
  {
    artistList: ["tempo"]
  },
  {
    artistList: ["sech", "ozuna"]
  },
  {
    artistList: ["sech", "farruko", "nicky jam", "zion", "lunay"]
  },
  {
    artistList: ["fat joe", "anuel aa", "cardi b"]
  },
  {
    artistList: ["manuel turizo"]
  },
  {
    artistList: ["toxic crow", "pablo chill-e"]
  },
  {
    artistList: ["manuel turizo", "zion & lennox"]
  },
  {
    artistList: ["anuel aa", "ozuna"]
  },
  {
    artistList: ["miky woodz"]
  },
  {
    artistList: ["valentino", "dalex", "lenny tavárez", "sech"]
  },
  {
    artistList: [
      "alex rose",
      "miky woodz",
      "rauw alejandro",
      "juhn el allstar",
      "jd pantoja"
    ]
  },
  {
    artistList: ["jhay cortez"]
  },
  {
    artistList: ["manuel turizo"]
  },
  {
    artistList: ["darell", "brytiago"]
  },
  {
    artistList: ["carlitos rossy"]
  },
  {
    artistList: ["farruko"]
  },
  {
    artistList: ["baby johnny"]
  },
  {
    artistList: ["noriel", "myke towers", "rauw alejandro", "almighty"]
  },
  {
    artistList: ["omy de oro", "bad bunny", "shootter ledo"]
  }
];

const artists: React.FC<Props> = () => {
  const myarray: string[] = [];
  songs.forEach(a => {
    return a.artistList.map(s => {
      return myarray.push(s);
    });
  });

  const arrayValues = [...(new Set(myarray) as any)];

  console.log(arrayValues);

  return (
    <Container maxWidth="lg">
      <PageHead title="Artists" />
      <div>
        <br />
        <br />
        <br />
        <Typography component="h1" variant="h4">
          Artists
        </Typography>
        <br />
        <br />
        <br />
      </div>

      <ArtistsList list={arrayValues as any} />
      <br />
      <br />
      <br />
      <br />
    </Container>
  );
};

export default artists;
