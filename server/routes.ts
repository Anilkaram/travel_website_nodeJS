import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactFormSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes - prefix all routes with /api
  
  // Get all destinations
  app.get("/api/destinations", async (req: Request, res: Response) => {
    try {
      const destinations = await storage.getDestinations();
      res.json(destinations);
    } catch (error) {
      console.error("Error fetching destinations:", error);
      res.status(500).json({ message: "Failed to fetch destinations" });
    }
  });
  
  // Get popular destinations
  app.get("/api/destinations/popular", async (req: Request, res: Response) => {
    try {
      const destinations = await storage.getPopularDestinations();
      res.json(destinations);
    } catch (error) {
      console.error("Error fetching popular destinations:", error);
      res.status(500).json({ message: "Failed to fetch popular destinations" });
    }
  });
  
  // Get a specific destination
  app.get("/api/destinations/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid destination ID" });
      }
      
      const destination = await storage.getDestination(id);
      if (!destination) {
        return res.status(404).json({ message: "Destination not found" });
      }
      
      res.json(destination);
    } catch (error) {
      console.error("Error fetching destination:", error);
      res.status(500).json({ message: "Failed to fetch destination" });
    }
  });
  
  // Get all hotels
  app.get("/api/hotels", async (req: Request, res: Response) => {
    try {
      const hotels = await storage.getHotels();
      res.json(hotels);
    } catch (error) {
      console.error("Error fetching hotels:", error);
      res.status(500).json({ message: "Failed to fetch hotels" });
    }
  });
  
  // Get featured hotels
  app.get("/api/hotels/featured", async (req: Request, res: Response) => {
    try {
      const hotels = await storage.getFeaturedHotels();
      res.json(hotels);
    } catch (error) {
      console.error("Error fetching featured hotels:", error);
      res.status(500).json({ message: "Failed to fetch featured hotels" });
    }
  });
  
  // Get a specific hotel
  app.get("/api/hotels/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid hotel ID" });
      }
      
      const hotel = await storage.getHotel(id);
      if (!hotel) {
        return res.status(404).json({ message: "Hotel not found" });
      }
      
      res.json(hotel);
    } catch (error) {
      console.error("Error fetching hotel:", error);
      res.status(500).json({ message: "Failed to fetch hotel" });
    }
  });
  
  // Get hotels by destination
  app.get("/api/destinations/:id/hotels", async (req: Request, res: Response) => {
    try {
      const destinationId = parseInt(req.params.id);
      if (isNaN(destinationId)) {
        return res.status(400).json({ message: "Invalid destination ID" });
      }
      
      const destination = await storage.getDestination(destinationId);
      if (!destination) {
        return res.status(404).json({ message: "Destination not found" });
      }
      
      const hotels = await storage.getHotelsByDestination(destinationId);
      res.json(hotels);
    } catch (error) {
      console.error("Error fetching hotels by destination:", error);
      res.status(500).json({ message: "Failed to fetch hotels" });
    }
  });
  
  // Submit contact form
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      const result = insertContactFormSchema.safeParse(req.body);
      
      if (!result.success) {
        const errorMessage = fromZodError(result.error).message;
        return res.status(400).json({ message: errorMessage });
      }
      
      const contactForm = await storage.createContactForm(result.data);
      res.status(201).json({ message: "Contact form submitted successfully", id: contactForm.id });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      res.status(500).json({ message: "Failed to submit contact form" });
    }
  });
  
  // Search
  app.get("/api/search", async (req: Request, res: Response) => {
    try {
      const { query, destination } = req.query;
      
      if (!query && !destination) {
        const hotels = await storage.getHotels();
        return res.json(hotels);
      }
      
      // Get all hotels
      const allHotels = await storage.getHotels();
      
      // Filter by destination if provided
      let filteredHotels = allHotels;
      if (destination) {
        const destinations = await storage.getDestinations();
        const matchingDestination = destinations.find(d => 
          d.name.toLowerCase().includes(destination.toString().toLowerCase()) || 
          d.country.toLowerCase().includes(destination.toString().toLowerCase())
        );
        
        if (matchingDestination) {
          filteredHotels = await storage.getHotelsByDestination(matchingDestination.id);
        } else {
          filteredHotels = [];
        }
      }
      
      // Filter by search query if provided
      if (query) {
        const searchTerm = query.toString().toLowerCase();
        filteredHotels = filteredHotels.filter(hotel => 
          hotel.name.toLowerCase().includes(searchTerm) ||
          hotel.description.toLowerCase().includes(searchTerm)
        );
      }
      
      res.json(filteredHotels);
    } catch (error) {
      console.error("Error searching:", error);
      res.status(500).json({ message: "Failed to perform search" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
