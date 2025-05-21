import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, Calendar, Filter, Search as SearchIcon, MapPin, Star, X } from "lucide-react";
import HotelCard from "@/components/ui/hotel-card";
import DestinationCard from "@/components/ui/destination-card";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { searchFormSchema, type SearchFormData, type Hotel, type Destination } from "@shared/schema";

const Search = () => {
  const [location] = useLocation();
  const [activeTab, setActiveTab] = useState<"hotels" | "destinations">("hotels");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDestination, setSelectedDestination] = useState<string>("");
  
  const searchParams = new URLSearchParams(location.search);
  const destinationParam = searchParams.get("destination") || "";
  const checkInParam = searchParams.get("checkIn") ? new Date(searchParams.get("checkIn")!) : undefined;
  const checkOutParam = searchParams.get("checkOut") ? new Date(searchParams.get("checkOut")!) : undefined;
  
  const form = useForm<SearchFormData>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      destination: destinationParam,
      checkIn: checkInParam,
      checkOut: checkOutParam
    }
  });
  
  useEffect(() => {
    setSearchQuery(destinationParam);
    setSelectedDestination(destinationParam);
  }, [destinationParam]);
  
  // Fetch all destinations
  const { data: destinations, isLoading: isLoadingDestinations } = useQuery<Destination[]>({
    queryKey: ['/api/destinations'],
  });
  
  // Fetch hotels with filters if applicable
  const { data: hotels, isLoading: isLoadingHotels } = useQuery<Hotel[]>({
    queryKey: ['/api/search', searchQuery, selectedDestination],
    queryFn: async () => {
      const params = new URLSearchParams();
      
      if (searchQuery) {
        params.append("query", searchQuery);
      }
      
      if (selectedDestination) {
        params.append("destination", selectedDestination);
      }
      
      const response = await fetch(`/api/search?${params.toString()}`);
      if (!response.ok) {
        throw new Error("Failed to fetch hotels");
      }
      return response.json();
    },
  });
  
  // Filter hotels based on price and selected facilities
  const filteredHotels = hotels?.filter(hotel => {
    const matchesPrice = hotel.pricePerNight >= priceRange[0] && hotel.pricePerNight <= priceRange[1];
    
    const matchesFacilities = selectedFacilities.length === 0 || 
      selectedFacilities.every(facility => hotel.facilities.includes(facility));
    
    return matchesPrice && matchesFacilities;
  });
  
  // Get all unique facilities from hotels
  const allFacilities = hotels?.reduce((acc: string[], hotel) => {
    hotel.facilities.forEach(facility => {
      if (!acc.includes(facility)) {
        acc.push(facility);
      }
    });
    return acc;
  }, []) || [];
  
  const onSubmit = (data: SearchFormData) => {
    if (data.destination) {
      setSearchQuery(data.destination);
      setSelectedDestination(data.destination);
    }
  };
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  const handleFacilityChange = (facility: string) => {
    setSelectedFacilities(prev => {
      if (prev.includes(facility)) {
        return prev.filter(f => f !== facility);
      } else {
        return [...prev, facility];
      }
    });
  };
  
  const clearFilters = () => {
    setPriceRange([0, 1000]);
    setSelectedFacilities([]);
  };
  
  return (
    <>
      <Helmet>
        <title>Search - TravelEase</title>
        <meta name="description" content="Search for the best destinations and hotels for your next vacation. Filter by price, amenities, and location." />
        <meta property="og:title" content="Search - TravelEase" />
        <meta property="og:description" content="Search for the best destinations and hotels for your next vacation. Filter by price, amenities, and location." />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="font-poppins font-bold text-3xl md:text-4xl mb-6">Find Your Perfect Trip</h1>
          
          <div className="bg-white p-6 rounded-xl shadow-md mb-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col md:flex-row gap-4">
                <FormField
                  control={form.control}
                  name="destination"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="text-sm font-medium text-gray-700">Where to?</FormLabel>
                      <div className="relative">
                        <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <FormControl>
                          <Input
                            placeholder="Search destinations or hotels"
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                            {...field}
                          />
                        </FormControl>
                      </div>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="checkIn"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="text-sm font-medium text-gray-700">Check in</FormLabel>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <FormControl>
                          <Input
                            type="date"
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                            onChange={(e) => {
                              const date = e.target.value ? new Date(e.target.value) : undefined;
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
                    <FormItem className="flex-1">
                      <FormLabel className="text-sm font-medium text-gray-700">Check out</FormLabel>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <FormControl>
                          <Input
                            type="date"
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                            onChange={(e) => {
                              const date = e.target.value ? new Date(e.target.value) : undefined;
                              field.onChange(date);
                            }}
                            value={field.value ? field.value.toISOString().split('T')[0] : ""}
                          />
                        </FormControl>
                      </div>
                    </FormItem>
                  )}
                />
                
                <div className="md:self-end">
                  <Button 
                    type="submit"
                    className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                  >
                    Search
                  </Button>
                </div>
              </form>
            </Form>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            <div className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              <div className="bg-white p-6 rounded-xl shadow-md sticky top-24">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="font-poppins font-semibold text-xl">Filters</h2>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={clearFilters}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Clear All
                  </Button>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">Price Range</h3>
                  <div className="px-2">
                    <Slider
                      value={priceRange}
                      min={0}
                      max={1000}
                      step={50}
                      onValueChange={setPriceRange}
                      className="mb-4"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}+</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3">Facilities</h3>
                  <div className="space-y-2">
                    {allFacilities.map((facility) => (
                      <div key={facility} className="flex items-center">
                        <Checkbox
                          id={`facility-${facility}`}
                          checked={selectedFacilities.includes(facility)}
                          onCheckedChange={() => handleFacilityChange(facility)}
                        />
                        <Label
                          htmlFor={`facility-${facility}`}
                          className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {facility}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-3/4">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <Button
                    variant="outline"
                    className="lg:hidden flex items-center"
                    onClick={toggleFilters}
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    {showFilters ? 'Hide Filters' : 'Show Filters'}
                  </Button>
                </div>
                
                <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "hotels" | "destinations")}>
                  <TabsList>
                    <TabsTrigger value="hotels">Hotels</TabsTrigger>
                    <TabsTrigger value="destinations">Destinations</TabsTrigger>
                  </TabsList>
                </Tabs>
                
                <div className="hidden md:block">
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by: Recommended" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recommended">Recommended</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Rating</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <TabsContent value="hotels" className="mt-0">
                {isLoadingHotels ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[...Array(4)].map((_, index) => (
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
                ) : filteredHotels && filteredHotels.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredHotels.map((hotel) => (
                      <HotelCard key={hotel.id} hotel={hotel} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <SearchIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No hotels found</h3>
                    <p className="text-gray-600 mb-4">Try adjusting your filters or search for a different destination.</p>
                    <Button variant="outline" onClick={clearFilters}>Clear Filters</Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="destinations" className="mt-0">
                {isLoadingDestinations ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, index) => (
                      <div key={index} className="rounded-xl overflow-hidden h-80">
                        <Skeleton className="h-full w-full" />
                      </div>
                    ))}
                  </div>
                ) : destinations && destinations.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {destinations.map((destination) => (
                      <DestinationCard key={destination.id} destination={destination} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No destinations found</h3>
                    <p className="text-gray-600">Try searching with different keywords.</p>
                  </div>
                )}
              </TabsContent>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Search;
