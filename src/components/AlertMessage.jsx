import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import * as React from 'react';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function AlertMessage({ type = 'success', message }) {
    const [state, setState] = React.useState({
        active: true,
        vertical: 'top',
        horizontal: 'right',
    });
    const { vertical, horizontal, active } = state;

    const handleClose = () => {
        setState({ ...state, active: false });
    };
    return (
        <Snackbar
            anchorOrigin={{ vertical, horizontal }} open={active}
            onClose={handleClose}
            key={vertical + horizontal}>
            <Alert severity={type} style={{
                minWidth: 250, minHeight: 60, display: 'flex', alignItems: 'center'
            }}>
                <span style={{ fontSize: 12, }}>{message}</span>
            </Alert>
        </Snackbar>
    )
}

export default AlertMessage
