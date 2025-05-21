import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { Helmet } from "react-helmet";
import { ArrowLeft, MapPin, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import HotelCard from "@/components/ui/hotel-card";
import { Skeleton } from "@/components/ui/skeleton";
import { getStarsDisplay } from "@/lib/utils";
import type { Destination as DestinationType, Hotel } from "@shared/schema";

const Destination = () => {
  const { id } = useParams<{ id: string }>();
  const destinationId = parseInt(id);
  
  const { data: destination, isLoading: isLoadingDestination, isError: isErrorDestination } = useQuery<DestinationType>({
    queryKey: [`/api/destinations/${destinationId}`],
  });
  
  const { data: hotels, isLoading: isLoadingHotels, isError: isErrorHotels } = useQuery<Hotel[]>({
    queryKey: [`/api/destinations/${destinationId}/hotels`],
    enabled: !!destinationId,
  });

  if (isLoadingDestination) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-8 w-64 mb-4" />
        <Skeleton className="h-[400px] w-full mb-8" />
        <Skeleton className="h-6 w-full max-w-2xl mb-2" />
        <Skeleton className="h-6 w-full max-w-xl mb-8" />
      </div>
    );
  }

  if (isErrorDestination || !destination) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Destination Not Found</h1>
        <p className="mb-8">The destination you're looking for doesn't exist or there was an error.</p>
        <Link href="/">
          <Button>Return to Home</Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${destination.name}, ${destination.country} - TravelEase`}</title>
        <meta name="description" content={`Explore ${destination.name}, ${destination.country}. Find the best hotels and accommodations for your trip to ${destination.name}.`} />
        <meta property="og:title" content={`${destination.name}, ${destination.country} - TravelEase`} />
        <meta property="og:description" content={`Explore ${destination.name}, ${destination.country}. Find the best hotels and accommodations for your trip to ${destination.name}.`} />
        <meta property="og:image" content={destination.imagePath} />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <div 
        className="relative h-[400px] bg-cover bg-center"
        style={{ backgroundImage: `url(${destination.imagePath})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-12 relative z-10">
          <Breadcrumb className="mb-4 text-white">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/search">Destinations</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink>{destination.name}</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <h1 className="font-poppins font-bold text-4xl md:text-5xl text-white mb-2 [text-shadow:_0_2px_4px_rgba(0,0,0,0.3)]">
            {destination.name}, {destination.country}
          </h1>
          
          <div className="flex items-center text-white mb-4">
            <div className="flex mr-4">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < destination.rating ? "text-yellow-400" : "text-gray-300"}>
                  {i < destination.rating ? "★" : "☆"}
                </span>
              ))}
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{destination.propertyCount} properties</span>
            </div>
          </div>
          
          <Link href="/search">
            <Button variant="outline" className="bg-white text-primary hover:bg-gray-100">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Search
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mb-12">
          <h2 className="font-poppins font-semibold text-3xl mb-4">About {destination.name}</h2>
          <p className="text-gray-700 text-lg leading-relaxed">{destination.description}</p>
        </div>
        
        <h2 className="font-poppins font-semibold text-3xl mb-6">Available Hotels in {destination.name}</h2>
        
        {isLoadingHotels ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="rounded-xl overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <div className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2 mb-4" />
                  <div className="flex gap-2 mb-4">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-5 w-16" />
                  </div>
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-10 w-24" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : isErrorHotels ? (
          <div className="text-center py-8">
            <p className="text-red-500">Failed to load hotels. Please try again later.</p>
          </div>
        ) : hotels && hotels.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-600">No hotels available in this destination at the moment.</p>
            <Link href="/search" className="text-primary hover:underline mt-2 inline-block">
              Browse other destinations
            </Link>
          </div>
        )}
        
        <div className="mt-12 text-center">
          <Link href="/search" className="inline-flex items-center font-semibold text-primary hover:underline">
            Explore more destinations <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Destination;
