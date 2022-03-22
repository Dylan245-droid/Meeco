const APP_ID = '3997cd22f585432a81551ba58982537e'
const CHANNEL = 'main'
const TOKEN = '0063997cd22f585432a81551ba58982537eIACcBmJmNpERj1sjiJbZmmt9/nlS/pJ5hJJvD6+OvyJqBWTNKL8AAAAAEAB+Qmt6ho47YgEAAQCFjjti'
let UID

const client = AgoraRTC.createClient({
    mode: 'rtc',
    codec: 'vp8'
})

let localTracks = []
let remoteUsers = {}

let joinAndDisplayLocalStream = async() => {
    UID = await client.join(APP_ID, CHANNEL, TOKEN)

    localTracks = await AgoraRTC.createMicrophoneAndCameraTracks()

    let player = ``
}