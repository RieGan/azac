import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import Slider from "react-slick";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
  root: {
    maxWidth: "100vh",
    borderRadius: "20px",
    backgroundColor: "#EBEEFF",
    boxShadow: "none",
    padding: "10px 8px"
  },
  iconHospital: {
    backgroundColor: "#7348ED",
    padding: "5px",
    borderRadius: "10px",
    color: "#FFFFFF",
    marginBottom: "24px"
  },
  nameHospital: {
    fontWeight: "700",
    fontFamily: "Poppins"
  },
  addressHospital: {
    fontFamily: "Poppins",
    fontSize: "12px",
    letterSpacing: "0.5px",
    lineHeight: "23px",
    marginTop: "10px"
  },
  buttonMap: {
    backgroundColor: "#7348ED",
    textAlign: "center",
    borderRadius: "15px",
    padding: "15px",
    width: "230px",
    fontFamily: "Poppins",
    color: "#FFFFFF",
    textTransform: "initial"
  }
});

const carouselSetting = {
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000
};

const clickMaps = (value) => {
  const a = document.createElement("a");
  a.href = "https://google.com/maps/search/" + value;
  a.target = "_blank";
  a.click();
};
export default function CardHospital(props) {
  const classes = useStyles();
  const { hospitals } = props;
  return (
    <>
      <Grid container justify={"center"}>
        <Grid item>
          <Typography component="h2" className={classes.nameHospital}>
            RS Rujukan Terdekat
          </Typography>
        </Grid>
      </Grid>
      <Slider {...carouselSetting}>
        {hospitals.map((value, index) => (
          <React.Fragment key={Math.random() * index}>
            <Card className={classes.root}>
              <CardContent>
                <LocalHospitalIcon
                  fontSize="large"
                  className={classes.iconHospital}
                />
                <Typography component="h2" className={classes.nameHospital}>
                  {value.name}
                </Typography>
                <Typography component="p" className={classes.addressHospital}>
                  {value.address}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  className={classes.buttonMap}
                  onClick={(event) => {
                    clickMaps(value.name);
                    event.preventDefault();
                  }}
                >
                  Buka di Maps
                </Button>
              </CardActions>
            </Card>
          </React.Fragment>
        ))}
      </Slider>
    </>
  );
}

CardHospital.propTypes = {
  hospitals: PropTypes.array
};
