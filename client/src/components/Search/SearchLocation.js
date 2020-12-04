import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { API_URL } from "const";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Container from "@material-ui/core/Container";
import InputAdornment from "@material-ui/core/InputAdornment";
import RoomIcon from "@material-ui/icons/Room";
import SearchIcon from "@material-ui/icons/Search";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  form: {
    backgroundColor: "#FFFFFF",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "transparent"
      },
      "&:hover fieldset": {
        borderColor: "transparent"
      },
      "&.Mui-focused fieldset": {
        borderColor: "transparent"
      }
    },
    borderRadius: "15px",
    marginTop: "30px",
    width: "320px",
  }
});
export default function SearchLocation(props) {
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState("");
  const [selectList, setSelectList] = useState([]);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const setKecamatan = (id_kecamatan) => {
    props.fetchByKecamatan(id_kecamatan);
    setSearchValue("");
    setMenuAnchor(null);
  };

  const get = (url) => {
    return fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    }).then((response) => response.json());
  };
  const handleSubmitSearch = async (event) => {
    if (menuAnchor === null) setMenuAnchor(event.currentTarget);
    const url = API_URL + "search/" + searchValue;
    setSelectList(await get(url));
    event.preventDefault();
  };
  const handleChangeSearchValue = (event) => {
    setSearchValue(event.target.value);
  };
  const handleCloseMenu = () => {
    setMenuAnchor(null);
  };

  return (
    <Container maxWidth={"sm"}>
      <Grid container justify={"center"}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant={"outlined"}
            id="component-filled"
            placeholder={props.text}
            className={classes.form}
            onKeyPress={(event) => {
              if (event.key === "Enter") handleSubmitSearch(event);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position={"start"}>
                  <RoomIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position={"end"}>
                  <SearchIcon onClick={handleSubmitSearch} />
                </InputAdornment>
              )
            }}
            value={searchValue}
            onChange={handleChangeSearchValue}
          />
          <Menu
            open={!!menuAnchor}
            anchorEl={menuAnchor}
            onClose={handleCloseMenu}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center"
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center"
            }}
          >
            {selectList.map((value) => (
              <MenuItem
                key={value.id}
                onClick={(event) => {
                  setKecamatan(value.id);
                  event.preventDefault();
                }}
              >
                {value.text}
              </MenuItem>
            ))}
          </Menu>
        </Grid>
      </Grid>
    </Container>
  );
}

SearchLocation.propTypes = {
  fetchByKecamatan: PropTypes.func,
  text: PropTypes.string
};
