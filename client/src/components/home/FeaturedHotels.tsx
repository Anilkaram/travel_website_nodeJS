import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import HotelCard from "@/components/ui/hotel-card";
import useMobile from "@/hooks/use-mobile";
import type { Hotel } from "@shared/schema";

const FeaturedHotels = () => {
  const { data: hotels, isLoading, isError } = useQuery<Hotel[]>({
    queryKey: ['/api/hotels/featured'],
  });
  
  const [position, setPosition] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobile();

  const getSlideWidth = () => {
    if (!trackRef.current) return 0;
    
    const firstSlide = trackRef.current.querySelector('div.flex-shrink-0') as HTMLElement;
    if (!firstSlide) return 0;
    
    const slideWidth = firstSlide.offsetWidth;
    const style = window.getComputedStyle(firstSlide);
    const marginRight = parseInt(style.marginRight) || 24;
    
    return slideWidth + marginRight;
  };

  const getVisibleSlides = () => {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  };

  const handleNext = () => {
    if (!hotels) return;
    
    const slideWidth = getSlideWidth();
    const visibleSlides = getVisibleSlides();
    const totalSlides = hotels.length;
    const maxPosition = -(slideWidth * (totalSlides - visibleSlides));
    
    setPosition(Math.max(position - slideWidth, maxPosition));
  };

  const handlePrev = () => {
    const slideWidth = getSlideWidth();
    setPosition(Math.min(position + slideWidth, 0));
  };

  return (
    <section id="hotels" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="font-poppins font-bold text-3xl md:text-4xl mb-2">Featured Hotels</h2>
            <p className="text-gray-600">Handpicked accommodations for an unforgettable stay</p>
          </div>
          <div className="hidden md:flex space-x-3">
            <button 
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
              aria-label="Previous hotels"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button 
              onClick={handleNext}
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
              aria-label="Next hotels"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex gap-6 overflow-hidden">
            {[...Array(isMobile ? 1 : 3)].map((_, index) => (
              <div key={index} className="flex-shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
                <Skeleton className="h-48 w-full mb-4" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-4" />
                <div className="flex gap-2 mb-4">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <div className="flex justify-between items-center">
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-10 w-24" />
                </div>
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="text-center py-8">
            <p className="text-red-500">Failed to load hotels. Please try again later.</p>
          </div>
        ) : (
          <div className="hotels-slider overflow-hidden">
            <div 
              ref={trackRef}
              className="hotels-slider-track flex transition-transform duration-300 space-x-6"
              style={{ transform: `translateX(${position}px)` }}
            >
              {hotels?.map((hotel) => (
                <HotelCard 
                  key={hotel.id} 
                  hotel={hotel} 
                  className="flex-shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]" 
                />
              ))}
            </div>
          </div>
        )}
        
        <div className="mt-8 text-center">
          <Link href="/search" className="font-semibold text-primary hover:underline inline-flex items-center">
            View all hotels <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedHotels;
