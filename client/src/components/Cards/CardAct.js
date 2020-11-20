import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
//import "./assets/font.css";
//import classes from "*.module.css";

const useStyles = makeStyles({
    root: {
        maxWidth: "320px",
        backgroundColor: "#A0FF97",
        borderRadius: "20px",
        boxShadow: "0px 8px 4px rgba(17, 17, 17, 0.04)",
        paddingTop: "12px",
        paddingBottom: "12px"
    },
    titleAct: {
        fontSize: "12px",
        fontFamily: "Poppins",
        fontWeight: "700",
        letterSpacing: "0.5px",
    },
    contentAct: {
        fontSize: "12px",
        fontFamily: "Poppins",
        letterSpacing: "0.5px",
        lineHeight: "23px",
        marginTop: "10px",
    }
});

export default function CardAct() {
    const classes = useStyles();
    return(
        <Card className={classes.root}>
            <CardContent>
                <Typography component="h4" className={classes.titleAct}>
                    Kegiatan outdoor relatif aman
                </Typography>
                <Typography component="p" className={classes.contentAct}>
                Kamu bisa melakukan olahraga outdoor seperti bersepeda dengan tetap menerapkan protokol kesehatan
                </Typography>
            </CardContent>
        </Card>
    );
}