import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Calendar } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { searchFormSchema, type SearchFormData } from "@shared/schema";

const Hero = () => {
  const [_, navigate] = useLocation();

  const form = useForm<SearchFormData>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      destination: "",
      checkIn: undefined,
      checkOut: undefined
    }
  });

  const onSubmit = (data: SearchFormData) => {
    const params = new URLSearchParams();
    
    if (data.destination) {
      params.append("destination", data.destination);
    }
    
    if (data.checkIn) {
      params.append("checkIn", data.checkIn.toISOString());
    }
    
    if (data.checkOut) {
      params.append("checkOut", data.checkOut.toISOString());
    }
    
    navigate(`/search?${params.toString()}`);
  };

  return (
    <section 
      className="relative h-[500px] md:h-[600px] bg-gray-900 bg-cover bg-center flex items-center"
      style={{ 
        backgroundImage: "url('https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&h=900')"
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <h1 className="font-poppins font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4 [text-shadow:_0_2px_4px_rgba(0,0,0,0.3)]">
            Book Your Dream Vacation <span className="text-[#FF9500]">Without Hassle</span>
          </h1>
          <p className="text-white text-lg md:text-xl mb-8 [text-shadow:_0_2px_4px_rgba(0,0,0,0.3)]">
            No phone calls. No emails. Just a few clicks to secure your perfect getaway.
          </p>
          
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col md:flex-row gap-4">
                <FormField
                  control={form.control}
                  name="destination"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="text-sm font-medium text-gray-700">Where to?</FormLabel>
                      <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <FormControl>
                          <Input
                            placeholder="Search destinations"
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
        </div>
      </div>
    </section>
  );
};

export default Hero;
