export default function RoomPage({ params }: { params: { roomId: string } }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Room ID: {params.roomId}</h1>
      <p>Room details and video call interface will go here.</p>
    </div>
  );
}
