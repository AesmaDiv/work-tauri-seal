import { Stack } from "@mui/system";
import { IconButton } from "@mui/material";
import { default as Bwrd } from '@mui/icons-material/ArrowBackIos';
import { default as Fwrd } from '@mui/icons-material/ArrowForwardIos';

import RLSearch from "./RLSearch";

export default function RLOptions ({handleSearch, handlePage, fullWidth}) {
  return (
    <Stack direction='row' sx={{ maxWidth: {fullWidth}, justifyContent: 'space-between', pt: 1 }}>
      <RLSearch onSubmit={handleSearch}/>
      <Stack direction='row'>
        <IconButton sx={{width: 20}} onClick={e => handlePage('bkwrd')}><Bwrd/></IconButton>
        <IconButton sx={{width: 20}} onClick={e => handlePage('frwrd')}><Fwrd/></IconButton>
      </Stack>
    </Stack>
  );
}