import { MapPin } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn, formatCurrency, getStarsDisplay } from "@/lib/utils";
import type { Hotel } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import type { Destination } from "@shared/schema";

interface HotelCardProps {
  hotel: Hotel;
  className?: string;
}

const HotelCard = ({ hotel, className }: HotelCardProps) => {
  const { data: destination } = useQuery<Destination>({
    queryKey: [`/api/destinations/${hotel.destinationId}`],
  });

  return (
    <div className={cn("rounded-xl overflow-hidden [box-shadow:_0_4px_12px_rgba(0,0,0,0.08)] bg-white", className)}>
      <img 
        src={hotel.imagePath} 
        alt={hotel.name} 
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-poppins font-semibold text-xl">{hotel.name}</h3>
            <div className="flex items-center text-gray-600 text-sm">
              <MapPin className="mr-1 h-3 w-3" />
              <span>{destination?.name}, {destination?.country}</span>
            </div>
          </div>
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < hotel.rating ? "text-yellow-400" : "text-gray-300"}>
                {i < hotel.rating ? "★" : "☆"}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {hotel.facilities.map((facility, index) => (
            <Badge key={index} variant="outline" className="bg-gray-100 text-gray-800 text-xs font-medium">
              {facility}
            </Badge>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-2xl font-bold text-primary">{formatCurrency(hotel.pricePerNight)}</span>
            <span className="text-gray-600">/night</span>
          </div>
          <Link href={`/hotels/${hotel.id}`}>
            <Button className="bg-primary hover:bg-primary/90 text-white font-semibold px-4 py-2 rounded-lg transition-colors">
              Book Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
