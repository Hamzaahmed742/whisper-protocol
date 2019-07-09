const express = require('express')
const app = express()
const port = 3000
const Web3  = require('web3');
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const web3 = new Web3("http://159.89.40.251:8545")

app.get('/', async (request, response) => {
    generatedSymKey= await web3.shh.generateSymKeyFromPassword("defaultKey") 
    symKey=await web3.shh.getSymKey(generatedSymKey)   
    symKeyID=await web3.shh.addSymKey(symKey)
    response.send(symKeyID)
})

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})


app.post("/send-message", async (req, res) => {
    post = await web3.shh.post({
        symKeyID: req.body.symKeyID,
        ttl: 20,
        topic: '0xffddaa11',  //defualt topic
        powTarget: 0.8,
        powTime: 1,
        payload: web3.utils.toHex(req.body.message)
    })
    res.json(post)
})

// // const web3 = new Web3("http://165.227.182.122:8545")
// async function temp(){
//     generatedSymKey= await web3.shh.generateSymKeyFromPassword("hello")    
//     console.log("generatedSymKey", generatedSymKey)
//     symKey=await web3.shh.getSymKey(generatedSymKey)
//     console.log(symKey)
//     symKeyID=await web3.shh.addSymKey(symKey)
//     console.log("symKeyID", symKeyID)

//     this.msgFilter = await web3.shh.newMessageFilter({
//             symKeyID: symKeyID,
//             ttl: 20,
//             topics: ['0xffddaa11'],
//             minPow: 0.8,
//         })
    
//     setInterval(() => {
//         console.log("Checking")
//         web3.shh.getFilterMessages(this.msgFilter).then(messages => {
//             for(let msg of messages) {
//                 console.log(web3.utils.hexToAscii(msg.payload))
//             }
//         })
//     }, 1000)

//     // setInterval(async () => {
//     //     console.log("Sending post")
//     //     post = await web3.shh.post({
//     //         symKeyID: symKeyID,
//     //         ttl: 20,
//     //         topic: '0xffddaa11',
//     //         powTarget: 0.8,
//     //         powTime: 1,
//     //         payload: web3.utils.toHex("Hello there!" + new Date())
//     //     })
//     //     console.log("post", post.hash)
//     // }, 5000)
// }

// temp()



