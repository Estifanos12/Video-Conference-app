import Hero from "@/components/hero";

export default async function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Hero
        heading="Video calls and meetings for everyone"
        description="Connect, collaborate, and communicate with your team and clients in real-time from anywhere in the world."
      />
    </div>
  );
}
