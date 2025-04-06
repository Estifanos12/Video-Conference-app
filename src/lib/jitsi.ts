export const APP_ID = process.env.JITSI_APP_ID;
export const JWT_TOKEN = process.env.JITSI_JWT_TOKEN;
export const JISTI_SCRIPT_URL = "https://8x8.vc/libs/lib-jitsi-meet.min.js";

enum TrackOperations {
  ADD = "ADD",
  REMOVE = "REMOVE",
}

export function buildOptions(room: string) {
  return {
    hosts: {
      domain: "8x8.vc",
      muc: `conference.${APP_ID}.8x8.vc`,
    },
    serviceUrl: `wss://8x8.vc/${APP_ID}/xmpp-websocket?room=${room}`,
    websocketKeepAliveUrl: `https://8x8.vc/${APP_ID}/_unlock?room=${room}`,
  };
}

export function handleTrackAdded(track: any) {
  console.log("Track added!", track.getType(), track.getId());
  console.log("Is local track:", track.isLocal());

  if (track.getType() === "video") {
    const videoNode = document.createElement("video");
    const meetingGrid = document.getElementById(
      "meeting-grid"
    ) as HTMLDivElement;
    videoNode.id = track.getId();
    videoNode.className = "jitsiTrack";
    videoNode.autoplay = true;
    videoNode.playsInline = true; // Ensures video plays inline on mobile devices
    meetingGrid.appendChild(videoNode);
    track.attach(videoNode);
  } else if (!track.isLocal() && track.getType() === "audio") {
    const audioNode = document.createElement("audio");

    audioNode.id = track.getId();
    audioNode.className = "jitsiTrack";
    audioNode.autoplay = true;
    audioNode.controls = false; // Hides audio controls for a cleaner UI
    document.body.appendChild(audioNode);
    track.attach(audioNode);
  }
}

export function handleTrackRemoved(track: any) {
  track.dispose();
  document.getElementById(track.getId())?.remove();
}

export function onConferenceJoined() {
  console.log("conference joined!");
}

export function onConferenceLeft() {
  console.log("conference left!");
}

export function onUserJoined(id: string) {
  console.log("user joined!", id);
}

export function onUserLeft(id: string) {
  console.log("user left!", id);
}

declare global {
  interface Window {
    JitsiMeetJS: any;
  }
}

export async function onConnectionSuccess(
  conference: any,
  room: string,
  connection: any
) {
  // Initialize conference
  conference = connection.initJitsiConference(room, {});

  // Setup event listeners
  conference.on(
    window.JitsiMeetJS.events.conference.TRACK_ADDED,
    handleTrackAdded
  );
  conference.on(
    window.JitsiMeetJS.events.conference.TRACK_REMOVED,
    handleTrackRemoved
  );
  conference.on(
    window.JitsiMeetJS.events.conference.CONFERENCE_JOINED,
    onConferenceJoined
  );
  conference.on(
    window.JitsiMeetJS.events.conference.CONFERENCE_LEFT,
    onConferenceLeft
  );
  conference.on(window.JitsiMeetJS.events.conference.USER_JOINED, onUserJoined);
  conference.on(window.JitsiMeetJS.events.conference.USER_LEFT, onUserLeft);

  // Create local tracks
  const localTracks = await window.JitsiMeetJS.createLocalTracks({
    devices: ["audio", "video"],
  });

  // Add local tracks before joining
  for (const track of localTracks) {
    await conference.addTrack(track);
  }

  // Join
  conference.join();
}

export function onConnectionFailed() {
  console.error("connection failed!");
}

export function onConnectionDisconnected() {
  console.log("connection disconnected!");
}

export async function connect(room: string, connection: any, conference: any) {
  const options = buildOptions(room);

  // Create connection.
  const conn = (connection = new window.JitsiMeetJS.JitsiConnection(
    null,
    JWT_TOKEN,
    options
  ));

  conn.addEventListener(
    window.JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED,
    () => onConnectionSuccess(conference, room, connection)
  );
  conn.addEventListener(
    window.JitsiMeetJS.events.connection.CONNECTION_FAILED,
    onConnectionFailed
  );
  conn.addEventListener(
    window.JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED,
    onConnectionDisconnected
  );

  conn.connect();
}

// Leave the room and proceed to cleanup.
export async function leave(conference: any, connection: any) {
  if (conference) {
    await conference.leave();
  }

  if (connection) {
    await connection.disconnect();
  }

  connection = undefined;
  conference = undefined;
}
