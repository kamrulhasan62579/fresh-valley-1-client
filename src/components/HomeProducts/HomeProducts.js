import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
          margin: theme.spacing(1),
        },
        maxWidth: 300,
      },
  media: {
    height: 300,
  },
}));

export default function HomeProducts(props) {
    const {name, image, price} = props.product;
  const classes = useStyles();

  return (
   <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 col-xxl-3 p-2 d-flex justify-content-center">
      <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={image}
        />
        <CardContent >
          <Typography gutterBottom variant="h5" component="h2">
           {name}
          </Typography>
          <Typography gutterBottom variant="h6" component="h4">
          Price: ${price}
          </Typography>
         
        </CardContent>
      </CardActionArea>
      <CardActions>
        {
            props.children
        }
      </CardActions>
    </Card>
   </div>
  );
}
