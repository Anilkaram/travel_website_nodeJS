import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { Helmet } from "react-helmet";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, ArrowLeft, MapPin, Info, Calendar as CalendarIcon, Utensils, Wifi, Coffee } from "lucide-react";
import { formatCurrency, getStarsDisplay, calculateNumberOfNights, calculateTotalPrice } from "@/lib/utils";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Hotel as HotelType, Destination } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

const bookingSchema = z.object({
  checkIn: z.date(),
  checkOut: z.date(),
  guests: z.number().min(1).max(10),
});

type BookingFormData = z.infer<typeof bookingSchema>;

const Hotel = () => {
  const { id } = useParams<{ id: string }>();
  const hotelId = parseInt(id);
  const { toast } = useToast();
  
  const { data: hotel, isLoading: isLoadingHotel, isError: isErrorHotel } = useQuery<HotelType>({
    queryKey: [`/api/hotels/${hotelId}`],
  });
  
  const { data: destination, isLoading: isLoadingDestination } = useQuery<Destination>({
    queryKey: [`/api/destinations/${hotel?.destinationId}`],
    enabled: !!hotel?.destinationId,
  });
  
  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      checkIn: new Date(Date.now() + 24*60*60*1000), // Tomorrow
      checkOut: new Date(Date.now() + 5*24*60*60*1000), // 5 days from now
      guests: 2,
    },
  });
  
  const watchCheckIn = form.watch("checkIn");
  const watchCheckOut = form.watch("checkOut");
  
  const numberOfNights = calculateNumberOfNights(watchCheckIn, watchCheckOut);
  const totalPrice = hotel ? calculateTotalPrice(hotel.pricePerNight, numberOfNights) : 0;
  
  const handleBookNow = (data: BookingFormData) => {
    toast({
      title: "Booking Successful!",
      description: `Your stay at ${hotel?.name} has been booked for ${numberOfNights} nights.`,
      variant: "default",
    });
  };
  
  if (isLoadingHotel || (hotel && isLoadingDestination)) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-8 w-64 mb-4" />
        <Skeleton className="h-[400px] w-full mb-8" />
        <Skeleton className="h-6 w-full max-w-2xl mb-2" />
        <Skeleton className="h-6 w-full max-w-xl mb-8" />
      </div>
    );
  }
  
  if (isErrorHotel || !hotel) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Hotel Not Found</h1>
        <p className="mb-8">The hotel you're looking for doesn't exist or there was an error.</p>
        <Link href="/">
          <Button>Return to Home</Button>
        </Link>
      </div>
    );
  }
  
  return (
    <>
      <Helmet>
        <title>{`${hotel.name} - ${destination?.name || 'TravelEase'}`}</title>
        <meta name="description" content={`Book your stay at ${hotel.name} in ${destination?.name}, ${destination?.country}. ${hotel.description.substring(0, 120)}...`} />
        <meta property="og:title" content={`${hotel.name} - ${destination?.name || 'TravelEase'}`} />
        <meta property="og:description" content={`Book your stay at ${hotel.name} in ${destination?.name}, ${destination?.country}. ${hotel.description.substring(0, 120)}...`} />
        <meta property="og:image" content={hotel.imagePath} />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <div 
        className="relative h-[400px] bg-cover bg-center"
        style={{ backgroundImage: `url(${hotel.imagePath})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-12 relative z-10">
          <Breadcrumb className="mb-4 text-white">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              {destination && (
                <>
                  <BreadcrumbItem>
                    <BreadcrumbLink href={`/destinations/${destination.id}`}>{destination.name}</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                </>
              )}
              <BreadcrumbItem>
                <BreadcrumbLink>{hotel.name}</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <h1 className="font-poppins font-bold text-4xl md:text-5xl text-white mb-2 [text-shadow:_0_2px_4px_rgba(0,0,0,0.3)]">
            {hotel.name}
          </h1>
          
          <div className="flex items-center text-white mb-4">
            <div className="flex mr-4">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < hotel.rating ? "text-yellow-400" : "text-gray-300"}>
                  {i < hotel.rating ? "★" : "☆"}
                </span>
              ))}
            </div>
            {destination && (
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{destination.name}, {destination.country}</span>
              </div>
            )}
          </div>
          
          <Link href={destination ? `/destinations/${destination.id}` : "/search"}>
            <Button variant="outline" className="bg-white text-primary hover:bg-gray-100">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to {destination ? destination.name : "Search"}
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="facilities">Facilities</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                <div>
                  <h2 className="font-poppins font-semibold text-2xl mb-4">About {hotel.name}</h2>
                  <p className="text-gray-700 leading-relaxed">{hotel.description}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-xl mb-3">Highlights</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {hotel.facilities.map((facility, index) => (
                      <Badge key={index} variant="outline" className="bg-gray-100 text-gray-800 text-sm font-medium">
                        {facility}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-xl mb-3">Price Information</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center text-lg">
                      <span className="font-bold text-primary">{formatCurrency(hotel.pricePerNight)}</span>
                      <span className="text-gray-600"> / night</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Taxes and fees included</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="facilities" className="space-y-6">
                <div>
                  <h2 className="font-poppins font-semibold text-2xl mb-4">Facilities & Amenities</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {hotel.facilities.map((facility, index) => (
                      <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                        {facility.includes("Wifi") ? (
                          <Wifi className="h-5 w-5 text-primary mr-3" />
                        ) : facility.includes("Pool") ? (
                          <div className="text-primary mr-3">🏊</div>
                        ) : facility.includes("Restaurant") || facility.includes("Dining") ? (
                          <Utensils className="h-5 w-5 text-primary mr-3" />
                        ) : facility.includes("Coffee") || facility.includes("Breakfast") ? (
                          <Coffee className="h-5 w-5 text-primary mr-3" />
                        ) : (
                          <Info className="h-5 w-5 text-primary mr-3" />
                        )}
                        <span>{facility}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="location" className="space-y-6">
                <div>
                  <h2 className="font-poppins font-semibold text-2xl mb-4">Location</h2>
                  <div className="bg-gray-100 rounded-lg p-4">
                    <p className="mb-2"><strong>Address:</strong> {hotel.address}</p>
                    {destination && (
                      <p><strong>Area:</strong> {destination.name}, {destination.country}</p>
                    )}
                  </div>
                  <div className="mt-4 bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                    <p className="text-gray-600">Map view is not available in this demo</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div>
            <div className="bg-white p-6 rounded-xl shadow-md sticky top-24">
              <h3 className="font-poppins font-semibold text-xl mb-6">Book Your Stay</h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleBookNow)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="checkIn"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Check-in Date</FormLabel>
                        <div className="relative">
                          <CalendarIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <FormControl>
                            <Input
                              type="date"
                              className="w-full pl-10"
                              onChange={(e) => {
                                const date = e.target.value ? new Date(e.target.value) : new Date();
                                field.onChange(date);
                              }}
                              value={field.value ? field.value.toISOString().split('T')[0] : ""}
                            />
                          </FormControl>
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="checkOut"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Check-out Date</FormLabel>
                        <div className="relative">
                          <CalendarIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <FormControl>
                            <Input
                              type="date"
                              className="w-full pl-10"
                              onChange={(e) => {
                                const date = e.target.value ? new Date(e.target.value) : new Date();
                                field.onChange(date);
                              }}
                              value={field.value ? field.value.toISOString().split('T')[0] : ""}
                            />
                          </FormControl>
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="guests"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Guests</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="1"
                            max="10"
                            className="w-full"
                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                            value={field.value}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <div className="pt-4 border-t mt-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">{formatCurrency(hotel.pricePerNight)} x {numberOfNights} nights</span>
                      <span>{formatCurrency(hotel.pricePerNight * numberOfNights)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg mb-6">
                      <span>Total</span>
                      <span className="text-primary">{formatCurrency(totalPrice)}</span>
                    </div>
                    
                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-lg transition-colors">
                      Book Now
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hotel;
