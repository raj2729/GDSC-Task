import Box from "@material-ui/core/Box";
import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { useDispatch, useSelector } from "react-redux";
import InputLabel from "@material-ui/core/InputLabel";

// Importing Header
import Header from "./Header";
import { USER_LOGIN_SUCCESS } from "../constants/userConstants";

const useStyles = makeStyles({
  profileCard: {
    width: "85% !important",

    /* display: flex !important; */
    justifyContent: "center !important",
    alignItems: "center !important",
    margin: "30px auto !important",
    margin: "2% !important",
    boxShadow: "5px 5px 5px 5px lightgrey !important",
    borderRadius: "30px !important",
    zIndex: "0",
    marginLeft: "8% !important",
  },
  profilePic: {
    borderRadius: "999px",
    width: "150px",
    display: "flex !important",
    justifyContent: "center !important",
    alignItems: "center !important",
    margin: "70px auto !important",
    position: "relative",
    bottom: "10px",
    padding: "1%",
    border: "5px solid gray",
    zIndex: "1",
  },
  name: {
    textAlign: "center",
    position: "relative",
    bottom: "30px",
  },
  description: {
    padding: "5%",
    marginTop: "-50px",
    marginLeft: "20px",
  },
  table: {
    minWidth: "400 !important",
    width: "70% !important",
    padding: "4% !important",
    /* margin: 5%; */
    boxShadow: "5px 5px 5px 5px lightgrey !important",
    borderRadius: "30px !important",
    display: "flex !important",
    /* justify-content: center !important; */
    /* align-items: center !important; */
    margin: "5% auto !important",
    /* height: 400px; */
  },
  tableText: {
    fontWeight: "bold",
    color: "rgb(0, 153, 255)",
    /* line-height: -10px; */
  },
  editBtn: {
    display: "flex !important",
    justifyContent: "center !important",
    alignItems: "center !important",
    margin: "50px auto !important",
    borderRadius: "999px",
  },
  smallCard: {
    width: "70%",
    /* display: flex !important; */
    justifyContent: "center !important",
    alignItems: "center !important",
    margin: "10px auto !important",
    boxShadow: " 5px 5px 5px 5px lightgrey !important",
    borderRadius: "30px !important",
    padding: "3%",
    height: "50%",
    paddingLeft: "50px",
    /* margin-bottom: 100px; */
  },
  numOfCourses: {
    fontSize: "60px",
    position: "relative",
    bottom: "80px",
  },
  smallCardImg: {
    width: "200px",
    /* z-index: 100;
     */
    position: "relative",
    bottom: "200px",
    right: "-100px",
    margin: "5%",
  },
  formControl: {
    minWidth: 200,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

function EditProfilePage({ history }) {
  const classes = useStyles();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [names, setName] = useState(userInfo.data.name);
  const [email, setEmail] = useState(userInfo.data.email);
  // const [password, setPassword] = useState(userInfo.data.password);
  const [year, setYear] = useState(userInfo.data.year);
  const [division, setDivision] = useState(userInfo.data.division);
  const [sapid, setSapid] = useState(userInfo.data.sapid);
  const dispatch = useDispatch();
  const rows = [
    +createData(
      <p className={classes.tableText}>Name</p>,

      <Input value={names} />
    ),
    createData(
      <p className={classes.tableText}>Name</p>,
      //   <Input value={names} />
      <Input
        type="text"
        value={names}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
    ),
    createData(
      <p className={classes.tableText}>Email</p>,
      <Input
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
    ),
    createData(
      <p className={classes.tableText}>Division</p>,
      <FormControl className={classes.formControl}>
        <InputLabel>Division</InputLabel>
        <Select
          value={division}
          onChange={(e) => {
            setDivision(e.target.value);
          }}
        >
          <MenuItem value={"A"}>A</MenuItem>
          <MenuItem value={"B"}>B</MenuItem>
          <MenuItem value={"C"}>C</MenuItem>
        </Select>
      </FormControl>
    ),
    createData(
      <p className={classes.tableText}>Year</p>,
      <FormControl className={classes.formControl}>
        <InputLabel>Year</InputLabel>
        <Select
          value={year}
          onChange={(e) => {
            setYear(e.target.value);
          }}
        >
          <MenuItem value={"FE"}>FE</MenuItem>
          <MenuItem value={"SE"}>SE</MenuItem>
          <MenuItem value={"TE"}>TE</MenuItem>
          <MenuItem value={"BE"}>BE</MenuItem>
        </Select>
      </FormControl>
    ),
    createData(
      <p className={classes.tableText}>Sap Id</p>,
      <Input
        type="text"
        value={sapid}
        onChange={(e) => {
          setSapid(e.target.value);
        }}
      />
    ),
  ];

  const editProfileSubmitHandler = async () => {
    userInfo.data.division = division;
    userInfo.data.name = names;
    userInfo.data.year = year;
    userInfo.data.sapid = sapid;
    userInfo.data.email = email;
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        name: names,
        email: email,
        year: year,
        division: division,
        sapid: sapid,
      }),
    };

    await fetch(
      `http://localhost:8080/user/userUpdate/${userInfo.data._id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response.data);
        alert("Profile has been updated successfully");
      });

    history.push("/myProfile");
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: userInfo,
    });
  };

  return (
    <>
      <Header />
      <Box m={2} pt={9} />
      <Card className={classes.profileCard}>
        <Grid container>
          <h1 style={{ marginLeft: "100px" }}>Edit Profile</h1>
          <Grid item xs={12} sm={12}>
            <TableContainer component={Paper} className={classes.table}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow></TableRow>
                </TableHead>

                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.calories}</TableCell>
                      <TableCell align="right">{row.fat}</TableCell>
                      <TableCell align="right">{row.carbs}</TableCell>
                      <TableCell align="right">{row.protein}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Button
              variant="contained"
              color="primary"
              className={classes.editBtn}
              onClick={editProfileSubmitHandler}
            >
              Save Details
            </Button>
          </Grid>
        </Grid>
      </Card>
    </>
  );
}

export default EditProfilePage;
