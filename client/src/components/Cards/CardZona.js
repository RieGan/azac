import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ImgZonaHijau from "assets/img/img1.png";
import ImgZonaKuning from "assets/img/img2.png";
import ImgZonaMerah from "assets/img/img3.png";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
  root: {
    maxWidth: "100vw",
    maxHeight: "175px",
    borderRadius: "20px",
    boxShadow: "0px 8px 4px rgba(17, 17, 17, 0.04)",
    paddingTop: "12px",
    paddingBottom: "12px",
    marginTop: "60px"
  },
  sekarang: {
    fontSize: "12px",
    fontFamily: "Poppins",
    letterSpacing: "0.5px",
    lineHeight: "23px",
    marginTop: "10px"
  },
  zona: {
    fontSize: "20px",
    fontFamily: "Poppins",
    fontWeight: "700",
    letterSpacing: "0.5px"
  },
  img: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "0px"
  }
});

export default function CardZona(props) {
  const imageZone = (zona) => {
    if (zona === "Merah") return ImgZonaMerah;
    else if (zona === "Kuning") return ImgZonaKuning;
    else if (zona === "Hijau") return ImgZonaHijau;
    else return null;
  };
  const color = (zona) => {
    if (zona === "Merah") return "#FF9797";
    else if (zona === "Kuning") return "#EAFF97";
    else if (zona === "Hijau") return "#A0FF97";
    else return null;
  };

  const classes = useStyles();
  return (
    <Card
      className={classes.root}
      style={{ backgroundColor: color(props.zona) }}
    >
      <CardContent>
        <Container>
          <Grid container justify={"center"}>
            <Grid item xs={8}>
              <Typography component="p" className={classes.sekarang}>
                Sekarang kamu ada di
              </Typography>
              <Typography component="h2" className={classes.zona}>
                Zona {props.zona}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <img
                src={imageZone(props.zona)}
                alt={props.zona}
                className={classes.img}
              />
            </Grid>
          </Grid>
        </Container>
      </CardContent>
    </Card>
  );
}

CardZona.propTypes = {
  zona: PropTypes.string
};
