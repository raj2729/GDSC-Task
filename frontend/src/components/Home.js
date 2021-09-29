import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Header from "./Header";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: "#FEFFFF",
    padding: theme.spacing(10, 0, 4),
  },
  header: {
    height: "55vh",
    backgroundSize: "1000px 700px",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "65% 50%",
    backgroundImage: `url(https://cdn.dribbble.com/users/1595567/screenshots/6378552/6.gif)`,
  },
  heroText: {
    margin: "0 10% 0 30%",
    color: "black",
  },
  cardGrid: {
    backgroundColor: "#FEFFFF",
    paddingBottom: theme.spacing(8),
  },
  heading: {
    width: "100%",
    fontSize: 30,
    fontWeight: "500",
    textDecoration: "underline",
  },
  card: {
    backgroundColor: "white",
    height: "100%",
    boxShadow: "5px 5px 5px 5px lightgrey",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    margin: "2%",
    paddingTop: "56.25%",
  },
  cardContent: {
    flexGrow: 1,
  },
}));

function Home() {
  const classes = useStyles();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="xl">
            <Grid
              container
              alignItems="center"
              className={classes.header}
            ></Grid>
          </Container>
        </div>
        <Container maxWidth="xl" style={{ paddingBottom: "120px" }}>
          <Grid item className={classes.heroText}>
            {userInfo ? (
              <Typography variant="h4" gutterBottom>
                Welcome to Student Dashboard
              </Typography>
            ) : (
              <Typography variant="h4" gutterBottom>
                Login to access Student Dashboard
              </Typography>
            )}
          </Grid>
        </Container>
        <Container className={classes.cardGrid}>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image="https://cdn.dribbble.com/users/2514124/screenshots/5439070/girl_3.gif"
                  title="Image title"
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h" component="h2">
                    Life Time Access
                  </Typography>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged.
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image="https://i.pinimg.com/originals/16/9c/11/169c11293f5c08a325ee1bbc8a0d4cb8.gif"
                  title="Image title"
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h" component="h2">
                    Low Cost
                  </Typography>
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it has a more-or-less
                  normal distribution of letters, as opposed to using 'Content
                  here, content here', making it look like readable English.
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image="https://www.excelsisdeo.com/images/AlphaTestersAnimation_60.gif"
                  title="Image title"
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h" component="h2">
                    Learning at your Finger Tips
                  </Typography>
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration in some
                  form, by injected humour, or randomised words which don't look
                  even slightly believable. If you are going to use a passage of
                  Lorem Ipsum, you need to be sure there isn't anything
                  embarrassing hidden in the middle of text.
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </main>
      <Footer />
    </React.Fragment>
  );
}

export default Home;
