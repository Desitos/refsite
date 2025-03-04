import React, {useState, useEffect} from 'react'; 
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import siglogo from './signature.png';
import twtIcon from './twticon.png';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Grow from '@material-ui/core/Grow';
import Background from './stripes-light.png'

const getMuiTheme = ()=> createMuiTheme({
  palette: {
    primary: {
      main:  "#5043a0",
    }
  },
});

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'...And thank all you artists who made this possible!'}
    </Typography>,
    <Typography variant="body2" color="textSecondary" align="center">
      {'Website created by '}
      {<div></div>}
      {
        <a href="https://twitter.com/chinoki346">
        <img src={twtIcon} height="30px" width="30px" align="center"/>
        </a>
        }
      {<a href="https://twitter.com/chinoki346"> Chino (@chinoki346)</a>}
    </Typography>
    
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    backgroundImage: `url(${Background})`
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '100%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Album() {
  const classes = useStyles();
  const [listOfImages, setListOfImages] = useState([]);
  const [checked, setChecked] = React.useState(true);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  function importAll(r) {
    return r.keys().map(r);
  }

  //Grabbing Filename and Arist Name from the source file
  //Source files should be formatted to use @ as a delimiter between the two
  //i.e.: filename@ArtistName
  function cutName(name)
  {
    var temp = name.match("[^\/]+$");
    temp = ("").concat(temp);
    temp = temp.substr(0, temp.indexOf("@"))
    return temp;
  }
  function cutArtist(name)
  {
    var temp = name.match("[^\/]+$");
    temp = ("").concat(temp);
    temp = temp.substr(temp.indexOf("@") + 1)
    temp = temp.substr(0, temp.indexOf("."))
    return temp;
  }

  useEffect(() => 
  {
    //For some reason some images get base64'd...no noticable pattern except if it's an indexed PNG, in that case convert to RGB
    //After trying tons of different solutions, overwriting the existing file in GIMP fixes this weird file format bug
    setListOfImages(importAll(require.context('./images/', false, /\.(jpe?g|png|gif|svg|jfif)$/i)));  
  }, [])

  return (
    <React.Fragment>
      <CssBaseline />
      <MuiThemeProvider theme={getMuiTheme()}>
      <AppBar src="relative">
        <Toolbar>
         <a href="https://twitter.com/Desiitos"> <img src={siglogo} className={classes.icon} /></a>
          <Typography variant="h6" color="inherit" noWrap>
            Reference Sheet Site
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              <br/>You found my refsite!
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              i stole aka forked this website from 
              <br></br>
              <a href="https://twitter.com/chinoki346"> @chinoki346</a> to highlight cool art check a look
              <br></br> <br></br>
              Last Updated Feb. 05 2025
            </Typography>
          </Container>
        </div>
        <Container className={classes.cardGrid}>
          {/* End hero unit */}
          <Grid container spacing={2}>
            {listOfImages.map((image, index) => (
                <Grow
                in={checked}
                style={{ transformOrigin: '0 0 0', transitionDelay: index*100 }}
              >
              <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                <Card height={4} className={classes.card}>

                  <CardMedia
                    className={classes.cardMedia}
                    image={image}
                    title={image.match("[^\/]+$")}
                  />

                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                    {cutName(image)}
                    </Typography>
                    <Typography>
                      <b>Artist:</b> {cutArtist(image)}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button href={image} target="_blank" size="small" color="primary">
                      View
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              </Grow>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Thank you for visiting!
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Ya'll're'ist really awesome for checking this all out.
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
      </MuiThemeProvider>
    </React.Fragment>
  );
}
