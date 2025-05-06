import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
  import {
    
    SignUp,
    SignIn,
   
  } from "@clerk/nextjs";


const Authenticating = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-400 rounded-3xl " >
            <Carousel className="w-full max-w-2xl m-2 rounded-lg shadow-lg">
                <CarouselPrevious className="absolute left-0 z-10 p-2 bg-red-500 rounded-full hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300" />
                <CarouselContent className="flex space-x-4">
                    <CarouselItem className="flex items-center justify-center w-full bg-gray-200 rounded-lg p-4">
                        <SignUp></SignUp>
                    </CarouselItem>
                    <CarouselItem className="flex items-center justify-center w-full  bg-gray-200 rounded-lg p-4">
                        <SignIn></SignIn>
                    </CarouselItem>
                </CarouselContent>
                <CarouselNext className="absolute right-0 z-10 p-2 bg-red-500 rounded-full hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300" />
            </Carousel>
        </div>
    )
}


export default Authenticating