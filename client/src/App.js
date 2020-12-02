import React, { useEffect, useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import CardAct from "components/Cards/CardAct";
import CardHospital from "components/Cards/CardHospital";
import CardZona from "components/Cards/CardZona";
import { API_URL } from "const";
import "./App.css";
import SearchLocation from "./components/Search/SearchLocation";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

export default function Home() {
  const [zona, setZona] = useState(0);
  const [kecamatan, setKecamatan] = useState({
    id: "",
    prov: "",
    alamat: ""
  });
  const [listRumahSakit, setListRumahSakit] = useState([]);
  const [listRekomendasi, setListRekomendasi] = useState([]);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
        fetchByLocation(location);
      },
      () => {
        const location = {
          latitude: -7.7972,
          longitude: 110.3688
        };
        fetchByLocation(location);
        alert("mohon izinkan/aktifkan lokasi");
      }
    );
  }, []);

  const get = (url) => {
    return fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    }).then((response) => response.json());
  };

  const fetchByLocation = async (location) => {
    const url_zona =
      API_URL + "zone/lat=" + location.latitude + "&lon=" + location.longitude;
    const res_zona = await get(url_zona);
    setZona(res_zona.levelKerawanan);

    const url_kecamatan = API_URL + "kecamatan/" + res_zona.kode_kecamatan;
    const res_kecamatan = await get(url_kecamatan);
    setKecamatan({
      id: res_kecamatan.id,
      prov: res_kecamatan.prov,
      alamat:
        "Kec. " +
        res_kecamatan.kec +
        ", Kab. " +
        res_kecamatan.kab +
        ", Prov. " +
        res_kecamatan.prov
    });

    const url_hospital = API_URL + "hospital/" + res_kecamatan.prov;
    const res_hospital = await get(url_hospital);
    setListRumahSakit(res_hospital);

    const url_rekomendasi =
      API_URL + "recomendation/" + res_zona.levelKerawanan;
    const res_rekomendasi = await get(url_rekomendasi);
    setListRekomendasi(res_rekomendasi);
  };

  const fetchByKecamatan = async (id_kecamatan) => {
    const url_zona = API_URL + "zone/kecamatan=" + id_kecamatan;
    const res_zona = await get(url_zona);
    setZona(res_zona.levelKerawanan);

    const url_kecamatan = API_URL + "kecamatan/" + res_zona.kode_kecamatan;
    const res_kecamatan = await get(url_kecamatan);
    setKecamatan({
      id: res_kecamatan.id,
      prov: res_kecamatan.prov,
      alamat:
        "Kec. " +
        res_kecamatan.kec +
        ", Kab. " +
        res_kecamatan.kab +
        ", Prov. " +
        res_kecamatan.prov
    });

    const url_hospital = API_URL + "hospital/" + res_kecamatan.prov;
    const res_hospital = await get(url_hospital);
    setListRumahSakit(res_hospital);

    const url_rekomendasi =
      API_URL + "recomendation/" + res_zona.levelKerawanan;
    const res_rekomendasi = await get(url_rekomendasi);
    setListRekomendasi(res_rekomendasi);
  };

  const levelZona = (zona_int) => {
    let zona = "";
    switch (zona_int) {
      case 0:
        zona = "Hijau";
        break;
      case 1:
        zona = "Kuning";
        break;
      case 2:
        zona = "Merah";
        break;
    }
    return zona;
  };
  const useStyles = makeStyles({
    gradient: {
      width: "100vw",
      height: "40vh",
      background: "linear-gradient(100.28deg, #5C24FC 2.78%, #3215A3 107.36%);",
      position: "absolute",
      zIndex: "-2"
    },
    whitebg: {
      width: "100vw",
      height: "1000px",
      background: "#FFFFFF",
      position: "absolute",
      zIndex: "-1",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      marginTop: "395px",
      borderRadius: "32px"
    },
    title: {
      textAlign: "center",
      color: "white",
      fontWeight: "900",
      paddingTop: "50px",
      fontSize: "28px"
    },
    desc: {
      fontSize: "12px",
      textAlign: "center",
      color: "white",
    }
  });
  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.gradient}></div>
      <div className={classes.whitebg}></div>
      <Container maxWidth="sm">
        <Typography className={classes.title}>
            AZAC
        </Typography>
        <Typography className={classes.desc}>
          asfalís zoí apó to covid a.k.a safe life from covid
        </Typography>
        <SearchLocation
          text={kecamatan.alamat}
          fetchByKecamatan={fetchByKecamatan}
        />
        <CardZona zona={levelZona(zona)} className={classes.zone} />
        <br />
        <CardHospital hospitals={listRumahSakit} />
        <br />
        <CardAct
          recommendations={listRekomendasi}
          zona={zona}
          zonaText={levelZona(zona)}
        />
      </Container>
    </React.Fragment>
  );
}
