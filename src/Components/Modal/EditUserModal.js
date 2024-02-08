import React, { useState } from 'react';
import {
  Box,
  Typography,
  Modal,
  Button,
  TextField,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import api from '../Api/Api';
import { useContext } from 'react';
import { UserContext } from '../../Context/UserContext';
import { useEffect } from 'react';

const EditUsersModal = ({ editUsersModal, setEditUsersModal, editUsers }) => {
    const {users} = useContext(UserContext)
  const [values, setValues] = useState({
    full_name: '',
    phone_number: '',
    email: '',
    status: '',
    gender: '',
    image: null, 
  });

  useEffect(() => {
    if (editUsersModal && editUsers) {
      if (editUsers) {
        setValues({
          full_name: editUsers.full_name,
          phone_number: editUsers.phone_number,
          email: editUsers.email,
          status: editUsers.status,
          gender: String(editUsers.gender),
          image: editUsers.image,
        });
      }
    }
  }, [editUsersModal, editUsers, users]);
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleImageChange = (event) => {
    setValues({
      ...values,
      image: event.target.files[0],
    });
  };

  const handleClose = () => {
    setEditUsersModal(false);
  };

  const addPupil = async () => {
    try {
      const formData = new FormData();
      for (const key in values) {
        formData.append(key, values[key]);
      }

      const response = await api.patch(
        `/Workers/${editUsers?.id}/`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log(response.data);
      setEditUsersModal(false);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Modal
        open={editUsersModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
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
          }}
        >
          <Typography variant="h6" component="h2">
          Редактировать сотрудника
          </Typography>
          <Box sx={{ marginTop: '20px' }} direction="row" spacing={2}>
            <TextField
              sx={{ width: '100%', marginBottom: '20px' }}
              id="full_name"
              size="small"
              name="full_name"
              label="Full Name"
              variant="outlined"
              onChange={handleChange}
              value={editUsers.full_name || ''}
            />
            <TextField
              sx={{ width: '100%', marginBottom: '20px' }}
              id="phone_number"
              size="small"
              name="phone_number"
              label="Phone Number"
              variant="outlined"
              onChange={handleChange}
              value={editUsers.phone_number || ''}
            />
            <TextField
              sx={{ width: '100%', marginBottom: '20px' }}
              id="email"
              size="small"
              name="email"
              label="Gmail"
              variant="outlined"
              onChange={handleChange}
              value={editUsers.email || ''}
            />
            <TextField
              sx={{ width: '100%', marginBottom: '20px' }}
              id="status"
              size="small"
              name="status"
              label="Position"
              variant="outlined"
              onChange={handleChange}
              value={editUsers.status || ''}
            />
            <FormControl>
  <RadioGroup
    aria-labelledby="demo-controlled-radio-buttons-group"
    name="gender"
    value={editUsers.gender || ''}
    onChange={handleChange}
    sx={{ flexDirection: 'row' }}
  >
    <FormControlLabel value="false" control={<Radio />} label="Female" />
    <FormControlLabel value="true" control={<Radio />} label="Male" />
  </RadioGroup>
</FormControl>
            <Button
            sx={{width: '100%', margin: '10px 0'}}
              variant="contained"
              component="label"
            >
              Вставить изображение
              <input
                type="file"
                hidden
                onChange={handleImageChange}
              />
            </Button>
            <Button
              sx={{width: '100%'}}
              onClick={addPupil}
              variant="contained"
              color="success"
            >
              Добавлять
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default EditUsersModal;
