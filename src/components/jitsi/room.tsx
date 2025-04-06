"use client";

import { useRef, useState, useEffect } from "react";

import { JISTI_SCRIPT_URL, connect, leave } from "@/lib/jitsi";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function Room() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [room, setRoom] = useState<string>("");

  const connectionRef = useRef<any>(null);
  const conferenceRef = useRef<any>(null);

  const joinBtnRef = useRef<HTMLButtonElement>(null);
  const leaveBtnRef = useRef<HTMLButtonElement>(null);

  const handleConnect = async () => {
    await connect(room, connectionRef.current, conferenceRef.current);
  };

  const handleLeave = async () => {
    await leave(connectionRef.current, conferenceRef.current);
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.id = "jitsiScript";
    script.src = JISTI_SCRIPT_URL;
    script.async = true;
    script.defer = true;
    script.crossOrigin = "anonymous";
    script.onload = () => setHasLoaded(true);
    document.body.append(script);
  }, []);

  useEffect(() => {
    if (!hasLoaded) return;
    const JitsiMeetJS = (window as any).JitsiMeetJS;
    JitsiMeetJS.init();
    JitsiMeetJS.setLogLevel(JitsiMeetJS.logLevels.INFO);
    console.log(`using LJM version ${JitsiMeetJS.version}!`);
  }, [hasLoaded]);

  return (
    <div>
      <h1>Room</h1>
      <Input
        type="text"
        placeholder="Room Name"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
      />
      <div className="flex gap-2 mt-2">
        <Button
          ref={joinBtnRef}
          onClick={handleConnect}
          className="btn btn-primary"
        >
          Join
        </Button>
        <Button
          ref={leaveBtnRef}
          onClick={handleLeave}
          className="btn btn-secondary"
        >
          Leave
        </Button>
      </div>

      <div className="flex flex-col gap-5" id="meeting-grid"></div>
    </div>
  );
}
