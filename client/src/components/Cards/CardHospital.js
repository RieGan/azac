import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';

const useStyles = makeStyles({
    root: {
        maxWidth: "250px",
        borderRadius: "20px",
        backgroundColor: "#EBEEFF",
        boxShadow: "none",
        padding: "10px 8px",
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
        fontFamily: "Poppins",
    },
    addressHospital: {
        fontFamily: "Poppins",
        fontSize: "12px",
        letterSpacing: "0.5px",
        lineHeight: "23px",
        marginTop: "10px",
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

export default function CardHospital() {
    const classes = useStyles();
    return(
        <Card className={classes.root}>
            <CardContent>
                <LocalHospitalIcon fontSize="large" className={classes.iconHospital} />
                <Typography component="h2" className={classes.nameHospital}>
                RS PKU Muhammadiyah Yogyakarta
                </Typography>
                <Typography component="p" className={classes.addressHospital}>
                Jl. KH. Ahmad Dahlan No.20, Ngupasan, Kec. Gondomanan...
                </Typography>
            </CardContent>
            <CardActions>
                <Button className={classes.buttonMap}>Buka di Maps</Button>
            </CardActions>
        </Card>
    );
}