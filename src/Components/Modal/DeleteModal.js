import React from 'react';
import { Box, Typography, Modal, Button, Stack } from '@mui/material';
import { useContext } from 'react';
import { UserContext } from '../../Context/UserContext';
import api from '../Api/Api';
const DeleteModal = ({open, setOpen}) => {
const {userId} = useContext(UserContext)
  const handleClose = () => {
    setOpen(false);
  };

  const deletePupils = async () => {
    try {
      const response = await api.delete(
        `/Workers/${userId}/`
      );
        console.log(response.data);
      setOpen(false)
      window.location.reload()
    } catch (error) {
      console.error(error);
    }
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    textAlign: 'center',
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Вы хотите удалить ?
          </Typography>
          <Stack sx={{marginTop: '20px', marginLeft: '30%'}} direction="row" spacing={2}>
      <Button onClick={deletePupils} variant="contained" color="success">
      Да
      </Button>
      <Button onClick={handleClose} variant="outlined" color="error">
      Нет 
      </Button>
    </Stack>
        </Box>
      </Modal>
    </div>
  );
};

export default DeleteModal;
