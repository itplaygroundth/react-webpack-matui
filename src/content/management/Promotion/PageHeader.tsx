import { Typography, Button, Grid } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import React from 'react';
import PromotionModal from './PromotionModal';
import { Promotion } from '@src/models/crypto_order';
function PageHeader() {
  const user = {
    name: 'Catherine Pike',
    avatar: '/static/images/avatars/1.jpg'
  };

  const [open, setOpen] = React.useState(false);
  
  const [promotion,setPromotion] = React.useState<Promotion>({id:'',ProName:'',Formular:'',StartDate:new Date(),StopDate:new Date(),Active:0,IsCancel:0});

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  
  
  return (
    <React.Fragment >
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Promotion
        </Typography>
        <Typography variant="subtitle2">
          {user.name}, these are your recent promotion
        </Typography>
      </Grid>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          onClick={onOpen}
        >
          Create Promotion
        </Button>
      </Grid>
    </Grid>
    <PromotionModal open={open} promotion={promotion} onClose={onClose} />
    </React.Fragment>
  );
}

export default PageHeader;
