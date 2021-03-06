import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    appBar:{
        backgroundColor: '#9C4421',
        color: '#F7FAFC',
    },
    button:{
        color: '#F7FAFC',
        paddingTop: '12px',
    },
    title: {
      flexGrow: 1,
      display: 'none',
      paddingLeft: '20px',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      
    },
    inputRoot: {
      color: 'inherit',
    },
    toolbar: theme.mixins.toolbar,
    inputInput: {
      paddingLeft: `calc(1em + ${theme.spacing(1)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '20ch',
        '&:focus': {
          width: '30ch',
        },
      },
    },
  });

const Search = ({ classes, searchValue, onChange, onSearch, onKeyPress }) => {
    return (
        <div className={classes.root}>
            <div className={classes.toolbar} />
            <AppBar className={classes.appBar}>
                <Toolbar>
                <Typography id='title' className={classes.title} variant="h6" noWrap>
                    <Link style={{color: 'inherit', textDecoration: 'inherit'}}to='/'> Melange </Link>
                </Typography>
                <div className={classes.search} >
                        <InputBase
                            id='input'
                            placeholder="Planet search..."
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            value={searchValue}
                            onChange={onChange}
                            onKeyPress={onKeyPress}
                        />
                        <Button id='button' className={classes.button} type='submit' onClick={onSearch}>Search</Button>
                 </div>
                </Toolbar>
            </AppBar>     
        </div>
    )
}

export default withStyles(styles)(Search)