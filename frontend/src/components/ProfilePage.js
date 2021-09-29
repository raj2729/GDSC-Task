import React, { useEffect } from "react";
import Box from "@material-ui/core/Box";
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
import { useSelector } from "react-redux";
import Header from "./Header";

const useStyles = makeStyles({
  profileCard: {
    width: "85% !important",

    justifyContent: "center !important",
    alignItems: "center !important",
    margin: "30px auto !important",
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
    margin: "5% auto !important",
  },
  tableText: {
    fontWeight: "bold",
    color: "rgb(0, 153, 255)",
  },
  editBtn: {
    display: "flex !important",
    justifyContent: "center !important",
    alignItems: "center !important",
    margin: "5px auto !important",
    borderRadius: "999px",
  },
  smallCard: {
    width: "70%",
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
    position: "relative",
    bottom: "200px",
    right: "-100px",
    margin: "5%",
  },
});

function ProfilePage({ history }) {
  const classes = useStyles();

  const userLogin = useSelector((state) => state.userLogin);
  let { userInfo } = userLogin;

  useEffect(() => {
    fetch(`http://localhost:8080/user/userDetails/${userInfo.data._id}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        userInfo = response.data;
        return response;
      });
  }, []);

  return (
    <>
      <Header />
      <Box m={2} pt={9} />
      <Card className={classes.profileCard}>
        <Grid container>
          <Grid item xs={12} sm={4}>
            <img
              src="https://res.cloudinary.com/dizvyn9b5/image/upload/v1632241300/oxndm5wvrwbmgoortsbs.jpg"
              alt="pic"
              className={classes.profilePic}
            />
            <h1 className={classes.name}>{userInfo.data.name}</h1>
          </Grid>
          <Grid item xs={12} sm={8}>
            <TableContainer component={Paper} className={classes.table}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow></TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key="Name">
                    <TableCell component="th" scope="row">
                      Name
                    </TableCell>
                    <TableCell align="right">{userInfo.data.name}</TableCell>
                  </TableRow>
                  <TableRow key="Email">
                    <TableCell component="th" scope="row">
                      Email
                    </TableCell>
                    <TableCell align="right">{userInfo.data.email}</TableCell>
                  </TableRow>
                  <TableRow key="Division">
                    <TableCell component="th" scope="row">
                      Division
                    </TableCell>
                    {userInfo.data.division !== "Z" ? (
                      <TableCell align="right">
                        {userInfo.data.division}
                      </TableCell>
                    ) : (
                      <TableCell align="right" style={{ color: "red" }}>
                        Add your division first
                      </TableCell>
                    )}
                  </TableRow>
                  <TableRow key="Year">
                    <TableCell component="th" scope="row">
                      Year
                    </TableCell>
                    {userInfo.data.division !== "Z" ? (
                      <TableCell align="right">{userInfo.data.year}</TableCell>
                    ) : (
                      <TableCell align="right" style={{ color: "red" }}>
                        Add your year first
                      </TableCell>
                    )}
                  </TableRow>
                  <TableRow key="Sap ID">
                    <TableCell component="th" scope="row">
                      Sap ID
                    </TableCell>
                    {userInfo.data.division !== "Z" ? (
                      <TableCell align="right">{userInfo.data.sapid}</TableCell>
                    ) : (
                      <TableCell align="right" style={{ color: "red" }}>
                        Add your Sap ID first
                      </TableCell>
                    )}
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Card>
    </>
  );
}

export default ProfilePage;
