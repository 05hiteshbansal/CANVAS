const http=require('http')
const express=require('express')
const socketio=require('socket.io')
const app=express()


const server =http.createServer(app)
const io=socketio(server)



var r;
let userid={} // 1 2 3 4
//var roomid={} // A-> 2,3 | B -> 1,4




app.use('/',express.static(__dirname+'/public'))
io.on('connection',(soc)=>{
    //console.log('connection on' ,soc.id)
    soc.on('id',(data)=>{
        r=data.username
        soc.join(r);
        
        if(userid[r]>=1){
            userid[r]++
            //console.log("1")
        }
         else{
             userid[r]=1;
             //console.log('2')
         }
         //console.log(data.username)
        soc.emit('data_send',data)
    })

    soc.on('draw',(data)=>{
        
        console.log(data.username)
        console.log(data.input)
        io.to(data.username).emit('msg_send',data)                     //.in(data.username)
    })
})
sop=process.env.PORT || 4444

server.listen(sop,()=>{
    console.log("server is started")
})