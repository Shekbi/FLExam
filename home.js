var express = require("express")
var router = express.Router()
var mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: String,
    uname: String,
    password: String
})
User = mongoose.model('users', userSchema)

const taskSchema = new mongoose.Schema({
    task: String,
    duedate: String
})
Task = mongoose.model('tasks', taskSchema)

router.get('/', function(req,res){
    res.render('register')
})

router.post('/', function(req,res){
    console.log(req.body)
    //Convert Body to userSchema
    const newUser = new User({
        name:req.body.name,
        uname:req.body.uname,
        password:req.body.password
    })
    newUser.save()
    res.redirect('/login')
})

router.get('/login', function(req,res){
    res.render('login')
})

router.post('/login',async function(req,res){
    console.log(req.body)
    const findUser = await User.findOne({uname:req.body.uname})
    if(findUser){
        if(findUser.password == req.body.password){
            res.redirect('/homePage')
        } else{
            res.send("Invalid User Details")
        }
    } else{
        res.send("Invalid User Details")
    }
})

router.get('/homePage', async function(req,res){
    const allTask = await Task.find({})
    res.render('homePage',{
        responses: allTask
    })
})

router.get('/add', function(req,res){
    res.render('add')
})

router.post('/add', function(req,res){
    console.log(req.body)
    const newTask = new Task({
        task:req.body.task,
        duedate:req.body.due
    })
    newTask.save()
    res.redirect('/homePage')
})

router.post('/delete/:task',async function(req,res){
    await Task.findOneAndDelete({task:req.params.task})
    res.redirect("/homePage")
})


module.exports = router