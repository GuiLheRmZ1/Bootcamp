"use client";

import { useSuiClient, useCurrentAccount } from "@mysten/dapp-kit";
import { useEffect, useMemo, useState} from "react";

export const useGalleryData = () => {
  const currentAccount = useCurrentAccount();
  const[galleryInfo, setGalleryInfo] = useState(null);
  const client = useSuiClient();

  
  const galleryData : any = async () => {
    const gallery: any = await client.getObject({
      id: process.env.NEXT_PUBLIC_GALLERY_OBJECT_ID as string,
      options: {
        showContent: true,
        showOwner: true,
      },
    });

    const adminCap : any = await client.getObject({
      id : process.env.NEXT_PUBLIC_ADMIN_CAP_ID as string,
      options:{
        showOwner: true
      }
    })

    setGalleryInfo({ ...gallery.data.content.fields, owner :adminCap.data?.owner?.AddressOwner || false});
  };

  const isOwner = useMemo(() => {
    if(!galleryData || !currentAccount)
    return galleryData.owner === currentAccount?.address;
  }, [currentAccount, galleryData])

  return {
    galleryData,
    isOwner,
  };
};
