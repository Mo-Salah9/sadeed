import { z } from "zod";

export const serviceOptions = ["vr", "xr", "games", "simulations", "demo", "other"] as const;
export type ServiceOption = (typeof serviceOptions)[number];

/**
 * Shared by the client form and the API route.
 * Error messages are translation keys under `contact.validation.*`.
 */
export const contactSchema = z.object({
  name: z.string().trim().min(1, "nameRequired").max(100, "nameTooLong"),
  email: z.string().trim().pipe(z.email("emailInvalid")),
  organization: z.string().trim().max(150, "organizationTooLong").optional().or(z.literal("")),
  service: z.enum(serviceOptions, "serviceRequired"),
  message: z.string().trim().min(10, "messageTooShort").max(3000, "messageTooLong"),
  /** Honeypot: humans never see or fill this field. */
  website: z.string().max(500).optional(),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactData = z.output<typeof contactSchema>;
export type ValidationKey =
  | "nameRequired"
  | "nameTooLong"
  | "emailInvalid"
  | "organizationTooLong"
  | "serviceRequired"
  | "messageTooShort"
  | "messageTooLong";
