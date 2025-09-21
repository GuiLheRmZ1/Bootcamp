"use client";

import { Button } from "@/components/ui/button";

import { WalrusUploader } from "../../walrus/walrusUploader";
import { useGalleryData } from "@/hooks/useGalleryData";
import { useCurrentAccount, ConnectButton } from "@mysten/dapp-kit";
import { useMemo, useState } from "react";

export default function Owner() {
  const { collectFee } = useGalleryData();
  const [estado, setEstado] = useState(0);
  return (
    <div className="flex flex-col items-center">
      
      <div className="flex gap-2">
        <Button onClick={collectFee}>Coletar dinheiro</Button>
        <Button onClick={() => setEstado(2)}>Publicar imagem</Button>
      </div>

      {estado === 2 && <WalrusUploader />}
    </div>
  );
}