import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";

import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
//   const currentUser = await getCurrentUser();

  // if(!currentUser){
  //     return NextResponse.error()
  // }

  const body = await request.json();
  const {
    title,
    description,
    imageSrc,
    category,
    roomCount,
    bathroomCount,
    guestCount,
    location,
    price,
  } = body;

  // const listing = Object.keys(body).forEach(( value : any) =>{
  //     if(!body[value]){
  //         NextResponse.error()
  //     }

  //     prisma.listing.create({
  //         data:{
  //             title,
  //             description,
  //             imageSrc,
  //             locationValue: location.value,
  //             cateogry: category,
  //             roomCount,
  //             bathroomCount,
  //             guestCount,
  //             price: parseInt(price,10),
  //             userId: "6579d91e633eb90ccd6b2b9a"
  //         }
  //     })
  // })


  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      imageSrc,
      locationValue: location.value,
      cateogry: category,
      roomCount,
      bathroomCount,
      guestCount,
      price: parseInt(price, 10),
      userId: "6579d91e633eb90ccd6b2b9a",
      createdAt: new Date(),
    },
  });
  console.log(listing);
  return NextResponse.json(listing);
}
