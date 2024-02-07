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

const AddUsersModal = ({ addUsersModal, setAddUsersModal }) => {

  const [values, setValues] = useState({
    full_name: '',
    phone_number: '',
    email: '',
    status: '',
    gender: 'true',
    image: null, 
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleImageChange = (event) => {
    // Handle file input separately
    setValues({
      ...values,
      image: event.target.files[0],
    });
  };

  const handleClose = () => {
    setAddUsersModal(false);
  };

  const addPupil = async () => {
    try {
      const formData = new FormData();
      for (const key in values) {
        formData.append(key, values[key]);
      }

      const response = await api.post(
        `/Workers/`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log(response.data);
      setAddUsersModal(false);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Modal
        open={addUsersModal}
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
            Добавить сотрудника
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
            />
            <TextField
              sx={{ width: '100%', marginBottom: '20px' }}
              id="phone_number"
              size="small"
              name="phone_number"
              label="Phone Number"
              variant="outlined"
              onChange={handleChange}
            />
            <TextField
              sx={{ width: '100%', marginBottom: '20px' }}
              id="email"
              size="small"
              name="email"
              label="Gmail"
              variant="outlined"
              onChange={handleChange}
            />
            <TextField
              sx={{ width: '100%', marginBottom: '20px' }}
              id="status"
              size="small"
              name="status"
              label="Position"
              variant="outlined"
              onChange={handleChange}
            />
            <FormControl>
  <RadioGroup
    aria-labelledby="demo-controlled-radio-buttons-group"
    name="gender"
    value={values.gender}
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

export default AddUsersModal;
