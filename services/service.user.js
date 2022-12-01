import axios from 'axios'

export function updateProfile(valuesToUpdate) {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axios.post(
                'http://localhost:3000/api/user/updateprofile',
                valuesToUpdate,
                {
                    headers: {
                        'x-access-token': localStorage.getItem('token')
                    }
                }
            )
            return resolve(response)
        } catch (error) {
            console.log(error)
            return reject(error)
        }
    })
}