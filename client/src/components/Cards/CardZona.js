import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ImgZonaHijau from "assets/img/img1.png";

const useStyles = makeStyles({
    root: {
        maxWidth: "320px",
        backgroundColor: "#A0FF97",
        borderRadius: "20px",
        boxShadow: "0px 8px 4px rgba(17, 17, 17, 0.04)",
        paddingTop: "12px",
        paddingBottom: "12px"
    },
    sekarang: {
        fontSize: "12px",
        fontFamily: "Poppins",
        letterSpacing: "0.5px",
        lineHeight: "23px",
        marginTop: "10px",
    },
    zona: {
        fontSize: "20px",
        fontFamily: "Poppins",
        fontWeight: "700",
        letterSpacing: "0.5px",
    },
    wrap: {
        display: "flex",
        justifyContent: "space-between"
    }
});

export default function CardZona() {
    const classes = useStyles();
    return(
        <Card className={classes.root}>
            <CardContent>
            <div className={classes.wrap}>
            <div className={classes.left}>
                <Typography component="p" className={classes.sekarang}>
                    Sekarang kamu ada di
                </Typography>
                <Typography component="h2" className={classes.zona}>
                    Zona Hijau
                </Typography>
            </div>
            <div className={classes.right}>
                <img src="{ImgZonaHijau}" />
            </div>
            </div>
            </CardContent>
        </Card>
    );
}