import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Link } from 'react-router-dom'
import Container from '@material-ui/core/Container';
import GridList from '@material-ui/core/GridList';
import Grid from '@material-ui/core/Grid';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Spinner from './Spinner'
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: theme.spacing(2), 
  },
  gridList: {
    width: 400,
    height: 'auto',
    paddingTop: 10,
    paddingBottom: 5,
    overFlowY: 'auto',
  },
  title: {
      color: '#ED8936',
      fontSize: '24px'
  },
  planetGrid: {
   
  },
  subtitle: {
      fontSize: '16px',
      paddingTop: '5px'
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});


const PLANETS = gql`
    {
        planets(order_by: {name: asc}) {
            name
            inhabitants
            id
            imageUrl
        }
    }

`

const Planets = ({ newPlanets, classes }) => {

    const { loading, error, data } = useQuery(PLANETS)

    const renderPlanets = (planets) => {
        return planets.map(({ id, name, imageUrl, inhabitants }) => (
            <div key={id}>  
            <Container>
              <Link to={`/planet/${id}`}>
                <Grid container>
                    <Grid>
                        <GridList md={3} cellHeight={260} cols={1} className={classes.gridList} >
                            <GridListTile>
                                    <img src={imageUrl} alt={name}/>
                                <GridListTileBar 
                                    title={name}
                                    subtitle={<span> {inhabitants} </span> }
                                    classes={{
                                        title: classes.title,
                                        subtitle: classes.subtitle
                                    }}
                                />
                            </GridListTile>  
                        </GridList>
                    </Grid>     
                </Grid> 
              </Link>                     
            </Container>    
            </div>
        ))
    }

    if (loading) return <Spinner />
    if (error) return <p>Error :( </p>

    return <div className={classes.root}>{renderPlanets(newPlanets || data.planets)}</div>
}

export default withStyles(styles)(Planets)
