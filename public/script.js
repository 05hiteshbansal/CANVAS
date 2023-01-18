const socket=io()

let p1=$('#p1')
let p2=$('#p2')

p1.show()
p2.hide()

$('#button').click(()=>{
  socket.emit('id',{
  username: $('#userid').val()
})
p2.show()
p1.hide()

})

socket.on('data_send',(data)=>{
  $('#username').text(data.username)
})

$('#btn').click(()=>{
  
    socket.emit('draw',{
        input: $('#textarea').val(), 
        username: $('#username').text()
    })
})

socket.on('msg_send',(data)=>{
//console.log(data.input)

$('#textarea').val(data.input)
})

