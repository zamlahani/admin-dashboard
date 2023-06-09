import { CircularProgress, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    loading: {
        display: 'flex',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

const MyLoading = () => {
    const classes = useStyles()

    return (
        <div className={classes.loading}>
            <CircularProgress/>
        </div>
    );
};

export default MyLoading;