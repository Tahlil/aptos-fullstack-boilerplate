"use client";

import React, { useState } from "react";
import { useTypingEffect } from "@/utils/useTypingEffect";
import { Pet } from "./Pet";
import { PetImage, bodies, ears, faces } from "./Pet/Image";
import { ShuffleButton } from "@/components/ShuffleButton";
import {
  NEXT_PUBLIC_BODY_OPTIONS,
  NEXT_PUBLIC_EAR_OPTIONS,
  NEXT_PUBLIC_FACE_OPTIONS,
} from "@/utils/env";

const defaultPet: Pet = {
  name: "Unknown",
  energy_points: 0,
  parts: [],
};

export function NotConnected() {
  // const [activePet, setActivePet] = useState<number[]>([0, 0, 0]);
  // const [selectedAction, setSelectedAction] = useState<"feed" | "play">("feed");

  const text = useTypingEffect(
    `Welcome to Aptos Boilerplate COde! Make sure you have a wallet extension installed. Once you connect your wallet, you'll be able to interact with your custom contract.`
  );

  // const handleShuffle = () => {
  //   const randomPet = [
  //     Math.floor(Math.random() * Number(NEXT_PUBLIC_BODY_OPTIONS)),
  //     Math.floor(Math.random() * Number(NEXT_PUBLIC_EAR_OPTIONS)),
  //     Math.floor(Math.random() * Number(NEXT_PUBLIC_FACE_OPTIONS)),
  //   ];
  //   setActivePet(randomPet);

  //   const actions = ["feed", "play"];
  //   const randomAction = actions[Math.floor(Math.random() * actions.length)] as
  //     | "feed"
  //     | "play";
  //   setSelectedAction(randomAction);
  // };

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* <div className="flex flex-col gap-6 self-center">
        <PetImage
          pet={defaultPet}
          selectedAction={selectedAction}
          petParts={{
            body: bodies[activePet[0]],
            ears: ears[activePet[1]],
            face: faces[activePet[2]],
          }}
        />
        <ShuffleButton handleShuffle={handleShuffle} />
      </div> */}
      <div className="nes-container is-dark with-title">
        <p className="title">Welcome</p>
        <p>{text}</p>
      </div>
    </div>
  );
}
