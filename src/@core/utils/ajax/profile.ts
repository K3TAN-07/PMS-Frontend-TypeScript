export async function profile() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/student/profile`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    const json = await response.json()
    if (json.token) {
      return json
    } else {
      console.log(json)

      return json
    }
  } catch (e) {
    return { success: false, message: e }
  }
}

type Props = {
  email: string
  oldPassword: string
  newPassword: string
}

export async function changePassword({ email, oldPassword, newPassword }: Props) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/change-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: oldPassword,
        newPassword: newPassword
      })
    })
    const json = await response.json()
    if (json.token) {
      return json
    } else {
      console.log(json)

      return json
    }
  } catch (e) {
    return { success: false, message: e }
  }
}
