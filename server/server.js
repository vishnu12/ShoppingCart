import path from 'path'
import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import prodRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import {notFound,errorHandler} from './middlewares/errorMiddleware.js'


dotenv.config()

connectDB()
const app=express()

if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'))
}

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use('/',prodRoutes)
app.use('/',userRoutes)
app.use('/',orderRoutes)
app.use('/',uploadRoutes)

app.get('/config/paypal',(req,res)=>{
    res.send(process.env.PAYPAL_CLIENT_ID)
})


const __dirname=path.resolve() //__dirname is not available for ES module
app.use('/uploads',express.static(path.join(__dirname,'/uploads')))


if(process.env.NODE_ENV==='production'){
   app.use(express.static(path.join(__dirname,'/client/build')))
   app.use('*',(req,res)=>{
       res.sendFile(path.resolve(__dirname,'client','build','index.html'))
   })
}else{
    app.get('/',(req,res)=>{
        res.send('API is running')
    })
}


app.use(notFound)
app.use(errorHandler)

const port =process.env.PORT || 3001

app.listen(port,()=>console.log(`server running on port ${port}`))