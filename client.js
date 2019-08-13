var fakeConnection, fakeChannel
var connection, channel

var showLocalIce = function() {
  fakeConnection = new RTCPeerConnection({ iceServers: [] })
  // create a bogus data channel
  fakeChannel = fakeConnection.createDataChannel()
  // create offer and set local description
  fakeConnection.createOffer(fakeConnection.setLocalDescription.bind(fakeConnection), function(){})
  // listen for candidate events
  fakeConnection.onicecandidate = function(ice) {
    if(ice.candidate) console.log('CANDIDATE!!!!\n', ice.candidate)
  }
}

var handleChannel = function(evt) {
  
}

var setConnection = function() {
  connection = new RTCPeerConnection({ iceServers: [] })
  // create data channel
  channel = connection.createDataChannel({ optional: [{ RtpDataChannels: true}] })
  // handle chennel connections
  connection.ondatachannel = handleChannel
  // no need to listen for candidates because we will manually use the input value
  // fakeConnection.onicecandidate = function(ice) {...
}

var init = function() {
  showLocalIce()
}

window.onload = init


// ws.onmessage = msg => {
//   const data = JSON.parse(msg.data)
//   console.log('Got Message', data)
//   switch (data.type) {
//     case 'login':
//       handleLogin(data.success)
//       break
//     case 'offer':
//       handleOffer(data.offer, data.username)
//       break
//     case 'answer':
//       handleAnswer(data.answer)
//       break
//     case 'candidate':
//       handleCandidate(data.candidate)
//       break
//     case 'close':
//       handleClose()
//       break
//     case 'sendJson':
//       sendJson(data.filejson)
//     default:
//       break
//   }
// }

// let connection = null
// let name = null
// let otherUsername = null
// let channel = null
// let usernameLocal

// const sendMessage = message => {
//   if (otherUsername) {
//     message.otherUsername = otherUsername
//   }

//   ws.send(JSON.stringify(message))
// }

// const sendJson = async fileJson => {
//   let cantMjes = fileJson.test.length
//   channel.send(cantMjes)
//   fileJson.test.forEach(e => channel.send(e)) 
// }

// document.querySelector('div#call').style.display = 'none'

// document.querySelector('button#login').addEventListener('click', event => {
//   usernameLocal = document.querySelector('input#username').value

//   if (usernameLocal.length < 0) {
//     alert('Please enter a username')
//     return
//   }

//   sendMessage({
//     type: 'login',
//     username: usernameLocal
//   })
// })

// const handleLogin = async success => {
//   if (success === false) {
//     alert('Username already taken')
//   } else {
//     document.querySelector('div#login').style.display = 'none'
//     document.querySelector('div#call').style.display = 'block'

//     const configuration = {
//       iceServers: [{ url: 'stun:stun2.1.google.com:19302' }],
//     }

//     connection = new RTCPeerConnection(configuration)

//     console.log('new RTCPeerConnection connection', connection)

//     channel = connection.createDataChannel({ optional: [{ RtpDataChannels: true}] })

//     connection.ondatachannel = event => {
//       event.channel.onmessage = event => {
//         console.log('event.channel.onmessage', event.data);

//     };

//     event.channel.onopen = event => {
//       console.log('event.channel.onopen', event)
//         channel.send('RTCDataChannel opened.', event);
//     };
    
//     event.channel.onclose = event => {
//         console.log('RTCDataChannel closed.', event);
//     };
    
//     event.channel.onerror = event => {
//         console.error(event);
//     };
//     }

//     connection.onicecandidate = event => {
//       console.log('event.candidate', event.candidate)
//       if (event.candidate) {
//         sendMessage({
//           type: 'candidate',
//           candidate: event.candidate
//         })
//       }
//     }
//   }
// }
// document.querySelector('button#send-message').addEventListener('click', () => {
//   const jsonName = document.querySelector('input#jsonname').value
//   ws.send(JSON.stringify({ username: usernameLocal, type: 'getJson', name: jsonName }))

//   // channel.send('test mensaje')
// })

// document.querySelector('button#call').addEventListener('click', () => {
//   const callToUsername = document.querySelector('input#username-to-call').value

//   if (callToUsername.length === 0) {
//     alert('Enter a username 😉')
//     return
//   }

//   otherUsername = callToUsername

//   connection.createOffer(
//     offer => {
//       sendMessage({
//         type: 'offer',
//         offer: offer
//       })

//       connection.setLocalDescription(offer)
//     },
//     error => {
//       alert('Error when creating an offer')
//       console.error(error)
//     }
//   )
// })

// const handleOffer = (offer, username) => {
//   otherUsername = username
//   connection.setRemoteDescription(new RTCSessionDescription(offer))
//   connection.createAnswer(
//     answer => {
//       connection.setLocalDescription(answer)
//       sendMessage({
//         type: 'answer',
//         answer: answer
//       })
//     },
//     error => {
//       alert('Error when creating an answer')
//       console.error(error)
//     }
//   )
// }

// const handleAnswer = answer => {
//   connection.setRemoteDescription(new RTCSessionDescription(answer))
// }

// const handleCandidate = candidate => {
//   connection.addIceCandidate(new RTCIceCandidate(candidate))
// }

// document.querySelector('button#close-call').addEventListener('click', () => {
//   sendMessage({
//     type: 'close'
//   })
//   handleClose()
// })

// const handleClose = () => {
//   otherUsername = null
//   document.querySelector('video#remote').src = null
//   connection.close()
//   connection.onicecandidate = null
//   connection.onaddstream = null
// }