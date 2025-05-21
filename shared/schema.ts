import { pgTable, text, serial, integer, boolean, timestamp, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull(),
  fullName: text("full_name").notNull(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
});

// Destination schema
export const destinations = pgTable("destinations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  country: text("country").notNull(),
  description: text("description").notNull(),
  imagePath: text("image_path").notNull(),
  propertyCount: integer("property_count").notNull().default(0),
  rating: integer("rating").notNull().default(0),
  isPopular: boolean("is_popular").notNull().default(false),
});

export const insertDestinationSchema = createInsertSchema(destinations).omit({
  id: true,
});

// Hotel schema
export const hotels = pgTable("hotels", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  destinationId: integer("destination_id")
    .notNull()
    .references(() => destinations.id),
  description: text("description").notNull(),
  address: text("address").notNull(),
  imagePath: text("image_path").notNull(),
  rating: integer("rating").notNull().default(0),
  pricePerNight: integer("price_per_night").notNull(),
  facilities: text("facilities").array().notNull(),
  isFeatured: boolean("is_featured").notNull().default(false),
});

export const insertHotelSchema = createInsertSchema(hotels).omit({
  id: true,
});

// Contact Form schema
export const contactForms = pgTable("contact_forms", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  destination: text("destination"),
  message: text("message").notNull(),
  consentMarketing: boolean("consent_marketing").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertContactFormSchema = createInsertSchema(contactForms).omit({
  id: true,
  createdAt: true,
});

// Booking schema
export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  hotelId: integer("hotel_id")
    .notNull()
    .references(() => hotels.id),
  checkInDate: date("check_in_date").notNull(),
  checkOutDate: date("check_out_date").notNull(),
  totalPrice: integer("total_price").notNull(),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertBookingSchema = createInsertSchema(bookings).omit({
  id: true,
  createdAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Destination = typeof destinations.$inferSelect;
export type InsertDestination = z.infer<typeof insertDestinationSchema>;

export type Hotel = typeof hotels.$inferSelect;
export type InsertHotel = z.infer<typeof insertHotelSchema>;

export type ContactForm = typeof contactForms.$inferSelect;
export type InsertContactForm = z.infer<typeof insertContactFormSchema>;

export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = z.infer<typeof insertBookingSchema>;

// Client search form schema (not database schema)
export const searchFormSchema = z.object({
  destination: z.string().optional(),
  checkIn: z.date().optional(),
  checkOut: z.date().optional(),
});

export type SearchFormData = z.infer<typeof searchFormSchema>;
