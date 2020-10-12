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


app.use('/api',prodRoutes)
app.use('/api',userRoutes)
app.use('/api',orderRoutes)
app.use('/api',uploadRoutes)

app.get('/api/config/paypal',(req,res)=>{
    res.send(process.env.PAYPAL_CLIENT_ID)
})

const __dirname=path.resolve() //__dirname is not available for ES module
app.use('/api/uploads',express.static(path.join(__dirname,'/uploads')))


app.use(notFound)
app.use(errorHandler)

const port =process.env.PORT || 3001

app.listen(port,()=>console.log(`server running on port ${port}`))