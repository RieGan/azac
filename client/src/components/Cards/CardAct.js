import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Slider from "react-slick";
import Grid from "@material-ui/core/Grid";
//import "./assets/font.css";
//import classes from "*.module.css";

const useStyles = makeStyles({
  root: {
    maxWidth: "100vw",
    borderRadius: "20px",
    boxShadow: "0px 8px 4px rgba(17, 17, 17, 0.04)",
    paddingTop: "12px",
    paddingBottom: "12px"
  },
  title: {
    fontWeight: "700",
    fontFamily: "Poppins"
  },
  titleAct: {
    fontSize: "12px",
    fontFamily: "Poppins",
    fontWeight: "700",
    letterSpacing: "0.5px"
  },
  contentAct: {
    fontSize: "12px",
    fontFamily: "Poppins",
    letterSpacing: "0.5px",
    lineHeight: "23px",
    marginTop: "10px"
  },
  zonaHijau: {
    backgroundColor: "#A0FF97"
  },
  zonaKuning: {
    backgroundColor: "#EAFF97"
  },
  zonaMerah: {
    backgroundColor: "#FF9797"
  }
});

const carouselSetting = {
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000
};

export default function CardAct(props) {
  const classes = useStyles();
  const color = (zona) => {
    if (zona === 2) return classes.zonaMerah;
    else if (zona === 1) return classes.zonaKuning;
    else if (zona === 0) return classes.zonaHijau;
    else return null;
  };

  return (
    <>
      <Grid
        container
        justify={"center"}
        alignItems={"center"}
        direction={"column"}
      >
        <Grid item>
          <Typography component="h4" className={classes.title}>
            Rekomendasi Aktivitas
          </Typography>
        </Grid>
        <Grid item>
          <Typography component="p" className={classes.contentAct}>
            Berikut adalah rekomendasi aktivitas untuk
          </Typography>
        </Grid>
        <Grid item>
          <Typography component="h4" className={classes.titleAct}>
            Zona {props.zonaText}
          </Typography>
        </Grid>
      </Grid>
      <Slider {...carouselSetting}>
        {props.recommendations.map((value) => (
          <Card
            className={classes.root + " " + color(props.zona)}
            key={value.id}
          >
            <CardContent>
              <Typography component="h4" className={classes.titleAct}>
                {value.title}
              </Typography>
              <Typography component="p" className={classes.contentAct}>
                {value.caption}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Slider>
    </>
  );
}

CardAct.propTypes = {
  recommendations: PropTypes.array,
  zona: PropTypes.number,
  zonaText: PropTypes.string
};
