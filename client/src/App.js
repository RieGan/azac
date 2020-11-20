import React from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import CardAct from "components/Cards/CardAct";
import CardHospital from "components/Cards/CardHospital";
import CardZona from "components/Cards/CardZona"
//import "./App.css";

export default function Home() {
  return(
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <CardZona />
        <CardHospital />
        <CardAct />
      </Container>
    </React.Fragment>
  );
};
