"use client";

import { useState } from "react";

const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA",
  "HI","ID","IL","IN","IA","KS","KY","LA","ME","MD",
  "MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC",
  "SD","TN","TX","UT","VT","VA","WA","WV","WI","WY",
];

interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  apt: string;
  city: string;
  state: string;
  zip: string;
}

interface FormErrors {
  [key: string]: string;
}

interface CheckoutFormProps {
  onSubmit: () => void;
}

function validateForm(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.email.trim()) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "Invalid email";
  if (!data.firstName.trim()) errors.firstName = "First name is required";
  if (!data.lastName.trim()) errors.lastName = "Last name is required";
  if (!data.address.trim()) errors.address = "Address is required";
  if (!data.city.trim()) errors.city = "City is required";
  if (!data.state) errors.state = "State is required";
  if (!data.zip.trim()) errors.zip = "ZIP code is required";
  else if (!/^\d{5}(-\d{4})?$/.test(data.zip)) errors.zip = "Invalid ZIP code";
  return errors;
}

const inputClass =
  "w-full px-4 py-3 bg-dark-3/50 border border-gold/10 focus:border-gold/30 text-foreground/80 font-inter text-sm placeholder:text-foreground/20 outline-none transition-colors duration-300";
const errorInputClass =
  "w-full px-4 py-3 bg-dark-3/50 border border-burgundy/50 focus:border-burgundy text-foreground/80 font-inter text-sm placeholder:text-foreground/20 outline-none transition-colors duration-300";
const labelClass = "block font-inter text-[10px] tracking-[0.2em] uppercase text-foreground/30 mb-2";

export default function CheckoutForm({ onSubmit }: CheckoutFormProps) {
  const [form, setForm] = useState<FormData>({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apt: "",
    city: "",
    state: "",
    zip: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const update = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formErrors = validateForm(form);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Contact */}
      <div>
        <h2 className="font-cinzel text-lg text-foreground/80 mb-4">Contact</h2>
        <div>
          <label className={labelClass}>Email</label>
          <input
            type="email"
            placeholder="your@email.com"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className={errors.email ? errorInputClass : inputClass}
          />
          {errors.email && <p className="font-inter text-xs text-burgundy-light mt-1">{errors.email}</p>}
        </div>
      </div>

      {/* Shipping */}
      <div>
        <h2 className="font-cinzel text-lg text-foreground/80 mb-4">Shipping Address</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>First Name</label>
              <input
                type="text"
                placeholder="First name"
                value={form.firstName}
                onChange={(e) => update("firstName", e.target.value)}
                className={errors.firstName ? errorInputClass : inputClass}
              />
              {errors.firstName && <p className="font-inter text-xs text-burgundy-light mt-1">{errors.firstName}</p>}
            </div>
            <div>
              <label className={labelClass}>Last Name</label>
              <input
                type="text"
                placeholder="Last name"
                value={form.lastName}
                onChange={(e) => update("lastName", e.target.value)}
                className={errors.lastName ? errorInputClass : inputClass}
              />
              {errors.lastName && <p className="font-inter text-xs text-burgundy-light mt-1">{errors.lastName}</p>}
            </div>
          </div>

          <div>
            <label className={labelClass}>Address</label>
            <input
              type="text"
              placeholder="Street address"
              value={form.address}
              onChange={(e) => update("address", e.target.value)}
              className={errors.address ? errorInputClass : inputClass}
            />
            {errors.address && <p className="font-inter text-xs text-burgundy-light mt-1">{errors.address}</p>}
          </div>

          <div>
            <label className={labelClass}>Apartment, Suite, etc. (optional)</label>
            <input
              type="text"
              placeholder="Apt, Suite, Unit"
              value={form.apt}
              onChange={(e) => update("apt", e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="col-span-2 sm:col-span-1">
              <label className={labelClass}>City</label>
              <input
                type="text"
                placeholder="City"
                value={form.city}
                onChange={(e) => update("city", e.target.value)}
                className={errors.city ? errorInputClass : inputClass}
              />
              {errors.city && <p className="font-inter text-xs text-burgundy-light mt-1">{errors.city}</p>}
            </div>
            <div>
              <label className={labelClass}>State</label>
              <select
                value={form.state}
                onChange={(e) => update("state", e.target.value)}
                className={`${errors.state ? errorInputClass : inputClass} cursor-pointer appearance-none`}
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23C9A84C' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 12px center",
                }}
              >
                <option value="">State</option>
                {US_STATES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              {errors.state && <p className="font-inter text-xs text-burgundy-light mt-1">{errors.state}</p>}
            </div>
            <div>
              <label className={labelClass}>ZIP Code</label>
              <input
                type="text"
                placeholder="12345"
                value={form.zip}
                onChange={(e) => update("zip", e.target.value)}
                className={errors.zip ? errorInputClass : inputClass}
              />
              {errors.zip && <p className="font-inter text-xs text-burgundy-light mt-1">{errors.zip}</p>}
            </div>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-4 bg-burgundy hover:bg-burgundy-light text-white font-inter text-sm tracking-[0.15em] uppercase transition-colors duration-300"
      >
        Place Order
      </button>

      <p className="text-center font-inter text-[10px] text-foreground/20 tracking-wider">
        This is a demo — no payment will be processed
      </p>
    </form>
  );
}
