var connection, channel

var showLocalIce = function() {
  var fakeConnection = new RTCPeerConnection({ iceServers: [] })
  //create a bogus data channel
  fakeConnection.createDataChannel('')
  // create offer and set local description
  fakeConnection.createOffer(fakeConnection.setLocalDescription.bind(fakeConnection), function(){})
  //listen for candidate events
  fakeConnection.onicecandidate = function(ice) {
    if(ice.candidate) console.log('CANDIDATE!!!!\n', ice.candidate, JSON.stringify(ice.candidate))
  }
}

var handleMessage = function(evt) => {
  console.log('event.channel.onmessage', evt.data);
}

var handleOpen = function(evt) => {
  console.log('event.channel.onopen', evt.data);
  channel.send('RTCDataChannel opened.', evt)
}

var handleClose = function(evt) => {
  console.log('event.channel.onclose', evt.data)
}

var handleError = function(evt) => {
  console.log('event.channel.onerror', evt.data)
}

var handleChannel = function(evt) {
  event.channel.onmessage = handleMessage
  event.channel.onopen = handleOpen
  event.channel.onclose = handleClose
  event.channel.onerror = handleError
}

var handleOffer = function(offer) {
  connection.setLocalDescription(offer)
  // we need a way to send the offer
  console.log('offer', offer, JSON.stringify(offer))
}

var handleOfferError = function(error) {
  alert('Error when creating an offer')
  console.error(error)
}

var setConnection = function(iceCandidate) {
  console.log('Connecting to ICE:', iceCandidate)
  connection = new RTCPeerConnection({ iceServers: [] })
  // create data channel
  channel = connection.createDataChannel({ optional: [{ RtpDataChannels: true}] })
  // handle chennel connections
  connection.ondatachannel = handleChannel
  // add ICE Candidate manually
  connection.addIceCandidate(new RTCIceCandidate(iceCandidate))
  // send offer to candidate
  connection.createOffer(handleOffer, handleOfferError)
  // no need to listen for candidates because we will manually use the input value
  //// connection.onicecandidate = function(iceCandidate) {...
}

var connectionHandler = function(evt) {
  var iceString = document.querySelector('#ice').value
  var iceCandidate = JSON.parse(iceString)
  setConnection(iceCandidate)
}

var init = function() {
  showLocalIce()
  document.querySelector('#connect')
    .addEventListener('click', connectionHandler)
}

window.onload = init








// ws.onmessage = msg => {
//   const data = JSON.parse(msg.data)
//   console.log('Got Message', data)
//   switch (data.type) {
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