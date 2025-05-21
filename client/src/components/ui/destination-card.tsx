import { ArrowRight, MapPin } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import type { Destination } from "@shared/schema";

interface DestinationCardProps {
  destination: Destination;
}

const DestinationCard = ({ destination }: DestinationCardProps) => {
  return (
    <div className="group rounded-xl overflow-hidden [box-shadow:_0_4px_12px_rgba(0,0,0,0.08)] relative h-80">
      <img 
        src={destination.imagePath} 
        alt={`${destination.name}, ${destination.country}`} 
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
      <div className="absolute bottom-0 left-0 p-6">
        <h3 className="font-poppins font-bold text-2xl text-white mb-1">
          {destination.name}, {destination.country}
        </h3>
        <div className="flex items-center text-white mb-3">
          <MapPin className="mr-2 h-4 w-4" />
          <span>{destination.propertyCount} properties</span>
        </div>
        <Link href={`/destinations/${destination.id}`}>
          <Button className="inline-flex items-center bg-white text-primary px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Explore <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default DestinationCard;
