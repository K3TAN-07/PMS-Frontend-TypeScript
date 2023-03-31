/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react'
import LinearProgress from '@mui/material/LinearProgress'
import Box from '@mui/material/Box'
import { Card } from '@mui/material'
import { getDashboardData } from 'src/@core/utils/ajax/faculty/facultyDashboard/dashboard'

function home() {
  const [totalAcceptedProjects, setTotalAcceptedProjects] = useState('')
  const [totalRequests, setTotalRequests] = useState('')
  const [totalStudents, setTotalStudents] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchDetails = async () => {
    try {
      setLoading(true)
      const data = await getDashboardData()
      setTotalAcceptedProjects(data.totalAcceptedProjects)
      setTotalRequests(data.totalRequests)
      setTotalStudents(data.totalStudents)
      console.log(totalAcceptedProjects, totalRequests, totalStudents)
      console.log(data)
      setLoading(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchDetails()
  }, [])

  return (
    <Card sx={{ padding: 8 }}>
      {loading ? (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      ) : (
        <div className='flex justify-center'>
          <div className='flex items-center   p-4 rounded-lg shadow-md mr-4' style={{ backgroundColor: '#e6e2ef' }}>
            <div>
              <div className=' font-bold mb-2 text-black'>Total Accepted Projects</div>
              <div className='text-3xl font-extrabold text-indigo-600'>{totalAcceptedProjects}</div>
            </div>
          </div>
          <div className='flex items-center  p-4 rounded-lg shadow-md mr-4' style={{ backgroundColor: '#e6e2ef' }}>
            <div>
              <div className=' font-bold mb-2 text-black'>Total Requests</div>
              <div className='text-3xl font-extrabold text-indigo-600'>{totalRequests}</div>
            </div>
          </div>
          <div className='flex items-center p-4 rounded-lg shadow-md' style={{ backgroundColor: '#e6e2ef' }}>
            <div>
              <div className=' font-bold mb-2 text-black '>Total Students</div>
              <div className='text-3xl font-extrabold text-indigo-600'>{totalStudents}</div>
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}

export default home
