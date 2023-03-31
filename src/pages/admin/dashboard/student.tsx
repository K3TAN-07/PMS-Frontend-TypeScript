/* eslint-disable react-hooks/exhaustive-deps */
import { Card, Input } from '@mui/material'
import { GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import LinearProgress from '@mui/material/LinearProgress'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import ReactiveButton from 'reactive-button'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { borderRadius } from '@mui/system'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: 1
}

function customToolBar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  )
}
const StudentTab = () => {
  //table heading
  const columns = [
    {
      field: 'name',
      headerName: 'name',
      minWidth: 150
    },
    {
      field: 'email',
      headerName: 'email',
      minWidth: 250
    },
    {
      field: 'department',
      headerName: 'department',
      minWidth: 200,
      sortable: false
    },
    {
      field: 'enrollment_number',
      headerName: 'enrollment_number',
      minWidth: 150
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      sortable: false,
      renderCell: (params: { row: any }) => {
        return (
          <>
            <Button
              onClick={() => handleEdit(params.row)}
              variant='contained'
              style={{ height: 35, width: 100, margin: 5 }}
            >
              Edit
            </Button>
            <Button
              onClick={() => handleDelete(params.row)}
              variant='contained'
              color='error'
              style={{ height: 35, width: 100, margin: 5 }}
            >
              Delete
            </Button>
          </>
        )
      }
    }
  ]
  const [selectedStudentId, setSelectedStudentId] = useState(null)
  const [myArray, setMyArray] = useState([])
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [department, setDepartment] = useState('')
  const [enrollmentNumber, setEnrollmentNumber] = useState('')
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const bearerToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null

  //get students
  const handleSubmit = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${bearerToken}`
        }
      })
      const data = await response.json()
      console.log(data)
      if (data && data.students) {
        setMyArray(data.students)
        setLoading(false)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    handleSubmit()
  }, [])

  //update students
  const handleUpdate = async (id: null, email: string, enrollment_number: string, department: string, name: string) => {
    setIsEditOpen(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/update-student/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          department: department,
          email: email,
          enrollment_number: enrollmentNumber,
          name: name
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${bearerToken}`
        }
      })
      console.log(response)
      const data = await response.json()
      console.log(data)
      setIsEditOpen(false)

      // alert(data.message);
      if (data && data.students) {
        setMyArray(data.students)
      }
      if (response.status == 200) {
      } else {
      }
      handleSubmit()
    } catch (error) {
      console.error(error)
    }
  }

  //delete students
  const handleDelete = async (id: any) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/delete-student/${id}`,

        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${bearerToken}`
          }
        }
      )
      const data = await response.json()
      console.log(data)
      if (data && data.students) {
        setMyArray(data.students)
      }
      if (response.status == 200) {
      } else {
      }
      handleSubmit()
    } catch (error) {
      console.error(error)
    }
  }
  const handleEdit = (student: never) => {
    setSelectedStudentId(student._id)
    setName(student.name)
    setEmail(student.email)
    setDepartment(student.department)
    setEnrollmentNumber(student.enrollment_number)
    setIsEditOpen(true)
    handleOpen(true)
  }

  return (
    <Card sx={{ padding: 8 }}>
      {loading ? (
        <Box sx={{ width: '100%' }}>
          <br></br>
          <div className='p-4'>
            <LinearProgress />
          </div>
          <br></br>
        </Box>
      ) : (
        <div className='min-h-1/2 flex-grow mx-2% shadow rounded-lg x  p-8'>
          {isEditOpen && (
            <div className='py-4'>
              <div>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby='modal-modal-title'
                  aria-describedby='modal-modal-description'
                >
                  <Box sx={style}>
                    <label className='block mb-2  font-bold'>Student Name</label>
                    <Input
                      className='w-full mb-2 py-2 px-3 rounded border border-gray-300  focus:outline-none focus:border-indigo-500'
                      value={name}
                      onChange={e => setName(e.target.value)}
                    />
                    <label className='block mb-2  font-bold'>Student Email</label>
                    <Input
                      className='w-full mb-2 py-2 px-3 rounded border border-gray-300  focus:outline-none focus:border-indigo-500'
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                    <label className='block mb-2  font-bold'>Student department</label>
                    <Input
                      className='w-full mb-2 py-2 px-3 rounded border border-gray-300  focus:outline-none focus:border-indigo-500'
                      value={department}
                      onChange={e => setDepartment(e.target.value)}
                    />
                    <label className='block mb-2  font-bold'>Student enrollment_number</label>
                    <Input
                      className='w-full mb-2 py-2 px-3 rounded border border-gray-300  focus:outline-none focus:border-indigo-500'
                      value={enrollmentNumber}
                      onChange={e => setEnrollmentNumber(e.target.value)}
                    />
                    <div className='flex justify-end'>
                      <ReactiveButton
                        onClick={() => setIsEditOpen(false)}
                        color='red'
                        idleText='Close'
                        loadingText='Loading'
                        successText='Done'
                        rounded={true}
                        shadow
                      />

                      <ReactiveButton
                        onClick={() => handleUpdate(selectedStudentId, email, department, enrollmentNumber, name)}
                        color='violet'
                        idleText='Submit'
                        loadingText='Loading'
                        successText='Done'
                        rounded={true}
                        shadow
                      />
                    </div>
                  </Box>
                </Modal>
              </div>
            </div>
          )}
          {myArray.length > 0 && (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Department</TableCell>
                    <TableCell>Enrollment Number</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {myArray.map(student => (
                    <TableRow key={student._id}>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>{student.department}</TableCell>
                      <TableCell>{student.enrollment_number}</TableCell>
                      <TableCell>
                        <div className='flex '>
                          <ReactiveButton
                            onClick={() => handleEdit(student)}
                            color='violet'
                            idleText='Edit'
                            loadingText='Loading'
                            successText='Done'
                            rounded={true}
                            shadow
                          />

                          <ReactiveButton
                            onClick={() => handleDelete(student._id)}
                            color='red'
                            idleText='Delete'
                            loadingText='Loading'
                            successText='Done'
                            rounded={true}
                            shadow
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          <br />
        </div>
      )}
    </Card>
  )
}

export default StudentTab
