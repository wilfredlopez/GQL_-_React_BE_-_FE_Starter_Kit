import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import React from "react";
import config from "../../config";
import { catStyles } from "../shared/catStyles";
import PageHead from "../shared/pageHead";
import { RouteComponentProps } from "react-router";

interface ContactoProps extends RouteComponentProps {}
const Contacto: React.FC<ContactoProps> = () => {
  const classes = catStyles();

  return (
    <div className={classes.root}>
      <PageHead title="Contacto" />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Container maxWidth="sm" className="text-center">
            <img
              src="/android-chrome-512x512.png"
              style={{}}
              width={150}
              alt="VapeMusic Logo"
            />
            <h1>{config.siteName}</h1>
          </Container>
          <Paper
            className={classes.paper}
            style={{ marginTop: "1rem", padding: "1rem 0" }}
          >
            {/* <h2 className="text-center">Contact</h2> */}
            <p>By Wilfred Lopez</p>

            <div className="my-4">
              <div>
                <small>Garfield, NJ 07026 USA</small>
              </div>
              <small>Copyright @2019 - {config.siteName}</small>
            </div>

            <p>
              {/* Email:{" "} */}
              <a
                href="mailto:listenUpMusic@gmail.com"
                className={classes.privacyLink}
              >
                wilfredlopez@outlook.com
              </a>
            </p>
            <a
              href="https://wilfredlopez.net"
              title="www.wilfredlopez.net"
              target="_blank"
              className={classes.privacyLink}
              rel="noopener noreferrer"
            >
              www.wilfredlopez.net
            </a>
            <div>
              <p>
                Help keep this website active and updated{" "}
                <a
                  href="https://www.patreon.com/bePatron?u=27568507"
                  title="Become a patron"
                  rel="noopener noreferrer"
                  className={classes.privacyLink}
                  target="_blank"
                >
                  Become a Patron{" "}
                </a>
              </p>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Contacto;
