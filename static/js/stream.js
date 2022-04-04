const APP_ID = "3997cd22f585432a81551ba58982537e";
const CHANNEL = sessionStorage.getItem('room')
const TOKEN = sessionStorage.getItem('token')
let UID = Number(sessionStorage.getItem('UID'));

let NAME = sessionStorage.getItem('name')

const client = AgoraRTC.createClient({
    mode: "rtc",
    codec: "vp8",
});

let localTracks = [];
let remoteUsers = {};

let joinAndDisplayLocalStream = async() => {
    document.querySelector('#room-name').innerHTML = CHANNEL

    client.on('user-published', handleUserJoined)
    client.on('user-left', handleUserLeft)

    try {
        await client.join(APP_ID, CHANNEL, TOKEN, UID);
    } catch (error) {
        console.error(error);
        window.open('/', '_self')
    }

    let member = createMember()

    localTracks = await AgoraRTC.createMicrophoneAndCameraTracks();

    let player = `<div class="video-container" id="user-container-${UID}">
                    <div class="username-wrapper">
                        <span class="user-name">${member.name}</span>
                    </div>
                    <div class="video-player" id="user-${UID}"></div>
                  </div>`;
    document.querySelector("#video-streams").insertAdjacentHTML("beforeend", player)

    localTracks[1].play(`user-${UID}`)

    await client.publish([localTracks[0], localTracks[1]])
};

let handleUserJoined = async (user, mediaType) => {
    remoteUsers[user.uid] = user
    await client.subscribe(user, mediaType)

    if(mediaType === "video"){
        let player = document.querySelector(`#user-container-${user.uid}`)
        if(player != null){
            player.remove()
        }

        player = `<div class="video-container" id="user-container-${user.uid}">
                <div class="username-wrapper">
                    <span class="user-name">Dylan</span>
                </div>
                <div class="video-player" id="user-${user.uid}"></div>
            </div>`;
        document.querySelector("#video-streams").insertAdjacentHTML("beforeend", player)
        user.videoTrack.play(`user-${user.uid}`)
    }

    if(mediaType === "audio") user.audioTrack.play()
}

let handleUserLeft = async (user) => {
    delete remoteUsers[user.uid]
    document.querySelector(`#user-container-${user.uid}`).remove()
}

let leaveAndRemoveLocalStream = async () => {
    for (let i = 0; i < localTracks.length; i++) {
        localTracks[i].stop()
        localTracks[i].close()
    }
    await client.leave()
    window.open('/', '_self')
}

let toggleCamera = async (e) => {
    if(localTracks[1].muted){
        await localTracks[1].setMuted(false)
        e.target.style.backgroundColor = "#fff"
    }else{
        await localTracks[1].setMuted(true)
        e.target.style.backgroundColor = "rgb(255, 80, 80, 1)"
    }
}

let toggleMic = async (e) => {
    if(localTracks[0].muted){
        await localTracks[0].setMuted(false)
        e.target.style.backgroundColor = "#fff"
    }else{
        await localTracks[0].setMuted(true)
        e.target.style.backgroundColor = "rgb(255, 80, 80, 1)"
    }
}

let createMember = () => {
    let response =  await fetch('/create_member/', {
        method: POST,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'name': NAME, 'room_name': CHANNEL, 'UID': UID })
    })
    let member = await response.json()
    return member
}

joinAndDisplayLocalStream()

document.querySelector('#leave-btn').addEventListener('click', leaveAndRemoveLocalStream)
document.querySelector('#camera-btn').addEventListener('click', toggleCamera)
document.querySelector('#mic-btn').addEventListener('click', toggleMic)