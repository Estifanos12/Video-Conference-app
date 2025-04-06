import Room from "@/components/jitsi/room";

export default async function RoomPage({
  params,
}: {
  params: { roomId: string };
}) {
  const { roomId } = await params;
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Room />
    </div>
  );
}
