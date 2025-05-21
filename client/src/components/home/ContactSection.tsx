import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronDown, ChevronUp } from "lucide-react";
import { insertContactFormSchema, InsertContactForm } from "@shared/schema";

const ContactSection = () => {
  const { toast } = useToast();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const form = useForm<InsertContactForm>({
    resolver: zodResolver(insertContactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      destination: "",
      message: "",
      consentMarketing: false
    }
  });

  const mutation = useMutation({
    mutationFn: (data: InsertContactForm) => 
      apiRequest("POST", "/api/contact", data),
    onSuccess: () => {
      toast({
        title: "Message Sent Successfully",
        description: "We'll get back to you shortly.",
        variant: "default",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Failed to Send Message",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      });
    }
  });

  const onSubmit = (data: InsertContactForm) => {
    mutation.mutate(data);
  };

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "How does the booking process work?",
      answer: "Our booking process is simple. Search for your desired destination, select the dates, choose a hotel, and complete the booking form. You'll receive an instant confirmation without any phone calls or emails required."
    },
    {
      question: "Can I modify or cancel my booking?",
      answer: "Yes, you can modify or cancel your booking through your account dashboard. Cancellation policies vary by property, so please check the specific terms before booking."
    },
    {
      question: "Are there any booking fees?",
      answer: "We don't charge any additional booking fees. The price you see is the price you pay. Some properties may have their own service fees, which will be clearly indicated before you confirm your booking."
    },
    {
      question: "How do I contact the property?",
      answer: "Once your booking is confirmed, you'll receive the property's contact information in your confirmation email. However, most of our partner properties prefer to communicate through our messaging system."
    },
    {
      question: "Is my payment secure?",
      answer: "Absolutely. We use industry-standard encryption and secure payment processors to ensure your financial information is protected at all times."
    }
  ];

  return (
    <section id="contact" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="font-poppins font-bold text-3xl md:text-4xl mb-4">Contact Us</h2>
            <p className="text-gray-600 mb-8">Have questions about booking? Fill out the form and our team will get back to you shortly.</p>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">First Name</FormLabel>
                        <FormControl>
                          <Input 
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                            {...field} 
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">Last Name</FormLabel>
                        <FormControl>
                          <Input 
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                            {...field} 
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">Email Address</FormLabel>
                      <FormControl>
                        <Input 
                          type="email"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                          {...field} 
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="destination"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">Interested Destination</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all">
                            <SelectValue placeholder="Select a destination" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="none">Select a destination</SelectItem>
                          <SelectItem value="bali">Bali, Indonesia</SelectItem>
                          <SelectItem value="paris">Paris, France</SelectItem>
                          <SelectItem value="tokyo">Tokyo, Japan</SelectItem>
                          <SelectItem value="new-york">New York, USA</SelectItem>
                          <SelectItem value="santorini">Santorini, Greece</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          rows={4}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none"
                          {...field} 
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="consentMarketing"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox 
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                        />
                      </FormControl>
                      <FormLabel className="text-sm text-gray-700">I agree to receive updates about travel deals and offers.</FormLabel>
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit"
                  className="bg-primary text-white font-semibold px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </div>
          
          <div className="lg:pl-8">
            <h2 className="font-poppins font-bold text-3xl md:text-4xl mb-4">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-4">
                  <button 
                    className="flex justify-between items-center w-full text-left font-semibold text-lg mb-2"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={expandedFaq === index}
                    aria-controls={`faq-content-${index}`}
                  >
                    {faq.question} 
                    {expandedFaq === index ? 
                      <ChevronUp className="text-primary" /> : 
                      <ChevronDown className="text-primary" />
                    }
                  </button>
                  <div 
                    id={`faq-content-${index}`}
                    className="text-gray-600"
                    aria-hidden={expandedFaq !== index}
                    style={{ display: expandedFaq === index ? 'block' : 'none' }}
                  >
                    {faq.answer}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
