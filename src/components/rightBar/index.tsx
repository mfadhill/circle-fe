import React from 'react'
import Profile from './components/Profile'
import { Box } from '@mui/material'
import { useAppDispatch,useAppSelector } from '../../store/store'
import { myProfileAsync } from '../../store/Asyncthunks/profileAsync'
import Suggested from './components/suggested'
import Widget from './components/widget'

const Index = () => {
  const profile = useAppSelector((state) => state.profile);
  const dispath = useAppDispatch();

  React.useEffect(() => {
    dispath(myProfileAsync());
  }, []);
  return (
    <Box sx={{display:"flex",flexDirection:"column",gap:"20px"}}>
        <Profile profile={profile.profile}/>
        <Suggested profile={profile.profile}/>
        <Widget/>
    </Box>
  )
}

export default Index