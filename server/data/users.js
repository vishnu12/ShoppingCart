
import bcrypt from 'bcryptjs'

const users=[
    {
        name:'Admin',
        email:'admin@example.com',
        password:bcrypt.hashSync('123456',10),
        isAdmin:true
    },
    {
        name:'Vishnuj',
        email:'vishnu@example.com',
        password:bcrypt.hashSync('123456',10)
        
    },
    {
        name:'Binu',
        email:'binu@example.com',
        password:bcrypt.hashSync('123456',10)
       
    }
]

export default users