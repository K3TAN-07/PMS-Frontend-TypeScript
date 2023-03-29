// ** React Imports
import { useEffect, useState } from 'react'
import { profile } from '../../@core/utils/ajax/profile'

// ** MUI Imports
import Box from '@mui/material/Box'

import { styled } from '@mui/material/styles'
import CardContent from '@mui/material/CardContent'
import { Card, CircularProgress, Typography } from '@mui/material'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const TabAccount = () => {
  // ** State
  const imgSrc = '/images/avatars/1.png'
  const [userData, setUserData] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true)
      const result = await profile()
      setLoading(false)
      console.log(result)
      setUserData(result)
    }
    fetchUserData()
  }, [])

  return (
    <CardContent>
      {loading ? (
        <CircularProgress sx={{ display: 'block', mx: 'auto', my: 4 }} />
      ) : (
        <Card sx={{ padding: 16, backgroundColor: '#e6e2ef' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <ImgStyled sx={{ borderRadius: '50%' }} src={imgSrc} alt='Profile Pic' />
            </Box>
            <br />
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant='h4' sx={{ fontWeight: 'bold', color: '#6c63ff', mb: 2 }}>
                {userData.name}
              </Typography>
            </Box>
            <Card
              sx={{
                padding: 4,
                fontSize: '18px',
                marginBottom: 2,
                border: '2px solid #6c63ff',
                borderRadius: '10px',
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'
              }}
            >
              <Box sx={{ borderBottom: '1px solid #6c6s3ff', pb: 2, mb: 2 }}>
                <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
                  Profile Information
                </Typography>
              </Box>
              <div sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant='subtitle1' sx={{ fontWeight: 'bold', mb: 1 }}>
                  Email
                </Typography>
                <Typography variant='body1' sx={{ mb: 2 }}>
                  {userData.email}
                </Typography>
                <Typography variant='subtitle1' sx={{ fontWeight: 'bold', mb: 1 }}>
                  Department
                </Typography>
                <Typography variant='body1' sx={{ mb: 2 }}>
                  {userData.department}
                </Typography>
                <Typography variant='subtitle1' sx={{ fontWeight: 'bold', mb: 1 }}>
                  Enrollment Number
                </Typography>
                <Typography variant='body1' sx={{ mb: 2 }}>
                  {userData.enrollment_number}
                </Typography>
              </div>
            </Card>
          </Box>
        </Card>
      )}
    </CardContent>
  )
}

export default TabAccount
