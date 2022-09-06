const socket = io()

let textarea = document.querySelector('#textarea')
let msgArea = document.querySelector('.message_area')
let username

do{
    username = prompt('Enter Your Name')
}while(!username)

textarea.addEventListener('keyup', (event)=>{
    if(event.key === 'Enter'){
        sendMsg(event.target.value)
    }
})


function sendMsg(msg){
    let msgInfo = {
        user: username,
        message: msg.trim()
    }
    addMsg(msgInfo, 'outgoing')
    textarea.value = ''
    scrollToBottom()
    socket.emit('message', msgInfo)
}

function addMsg(msg, type){
    let div = document.createElement('div')
    let className = type
    div.classList.add(className, 'message', 'px-3', 'py-2', 'my-2')

    let html = `
    <h6 class="fw-bold">${msg.user}</h6>
    <p>${msg.message}</p>
    `
    div.innerHTML = html
    msgArea.appendChild(div)

}


socket.on('message', (msg) => {
    addMsg(msg, 'incoming')
    scrollToBottom()
})


function scrollToBottom(){
    msgArea.scrollTop = msgArea.scrollHeight
    console.log(msgArea.scrollTop)
    console.log(msgArea.scrollHeight)
}































