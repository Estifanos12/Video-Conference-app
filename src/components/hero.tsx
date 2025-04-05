"use client";

import { useState } from "react";
import { Video } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";

interface HeroProps {
  icon?: React.ReactNode;
  heading?: string;
  description?: string;
  button?: {
    text: string;
    icon?: React.ReactNode;
    url: string;
  };
  trustText?: string;
  imageSrc?: string;
  imageAlt?: string;
}

const Hero = ({
  icon = <Video className="size-6" />,
  heading,
  description,
  trustText = "Trusted by 25.000+ Businesses Worldwide",
  imageSrc = "/bg-hero.jpg",
  imageAlt = "Video Conference",
}: HeroProps) => {
  const onCreate = () => {
    console.log(inputValue);
  };

  const [inputValue, setInputValue] = useState("");
  return (
    <section className="overflow-hidden py-32 ">
      <div className="container">
        <div className="flex flex-col gap-5">
          <div className="relative flex flex-col gap-5">
            <div
              style={{
                transform: "translate(-50%, -50%)",
              }}
              className="absolute top-1/2 left-1/2 -z-10 mx-auto size-[800px] rounded-full border p-16 [mask-image:linear-gradient(to_top,transparent,transparent,white,white,white,transparent,transparent)] md:size-[1300px] md:p-32"
            >
              <div className="size-full rounded-full border p-16 md:p-32">
                <div className="size-full rounded-full border"></div>
              </div>
            </div>
            <span className="mx-auto flex size-16 items-center justify-center rounded-full border md:size-20">
              {icon}
            </span>
            <h2 className="mx-auto max-w-screen-lg text-center text-3xl font-medium text-balance md:text-6xl">
              {heading}
            </h2>
            <p className="mx-auto max-w-screen-md text-center text-muted-foreground md:text-lg">
              {description}
            </p>
            <div className="flex w-full items-center mx-auto gap-2">
              <Input
                className=""
                placeholder="Enter room name"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <Button size="lg" onClick={onCreate}>
                Create Room
              </Button>
            </div>
            {trustText && (
              <p className="text-xs text-center text-muted-foreground">
                {trustText}
              </p>
            )}
          </div>
          <img
            src={imageSrc}
            alt={imageAlt}
            className="mx-auto h-full max-h-[524px] w-full max-w-screen-lg rounded-2xl object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
