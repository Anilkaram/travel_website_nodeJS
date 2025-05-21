import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import DestinationCard from "@/components/ui/destination-card";
import type { Destination } from "@shared/schema";

const PopularDestinations = () => {
  const { data: destinations, isLoading, isError } = useQuery<Destination[]>({
    queryKey: ['/api/destinations/popular'],
  });

  return (
    <section id="destinations" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="font-poppins font-bold text-3xl md:text-4xl mb-2">Popular Destinations</h2>
            <p className="text-gray-600">Explore our most booked destinations around the world</p>
          </div>
          <Link href="/search" className="hidden md:flex items-center font-semibold text-primary hover:underline">
            View all destinations <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="rounded-xl overflow-hidden h-80">
                <Skeleton className="h-full w-full" />
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="text-center py-8">
            <p className="text-red-500">Failed to load destinations. Please try again later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations?.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        )}
        
        <div className="mt-8 text-center md:hidden">
          <Link href="/search" className="inline-flex items-center font-semibold text-primary hover:underline">
            View all destinations <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;
