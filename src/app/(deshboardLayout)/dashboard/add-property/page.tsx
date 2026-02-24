"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { TProperty } from "@/types/property";

export default function CreatePropertyPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TProperty>();

  const router = useRouter();

  const onSubmit = async (data: TProperty) => {
    // amenities string → array convert
    if (typeof data.amenities === "string") {
      data.amenities = (data.amenities as unknown as string)
        .split(",")
        .map((item) => item.trim());
    }

    const res = await fetch("/api/properties", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (res.ok) {
      alert("Property created successfully!");
      router.push("/properties");
    } else {
      alert(result.error || "Failed to create property");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Add Property</CardTitle>
          <CardDescription>
            Fill in the details to add a new property
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>

              {/* Title */}
              <Field>
                <FieldLabel>Title</FieldLabel>
                <Input
                  placeholder="Luxury Villa in Dhaka"
                  {...register("title", { required: true })}
                />
              </Field>

              <span className="flex justify-between gap-1">
                {/* Price */}
                <Field>
                  <FieldLabel>Price</FieldLabel>
                  <Input
                    type="number"
                    placeholder="250000"
                    {...register("price", { required: true, valueAsNumber: true })}
                  />
                </Field>

                {/* City */}
                <Field>
                  <FieldLabel>City</FieldLabel>
                  <Input
                    placeholder="Dhaka"
                    {...register("city", { required: true })}
                  />
                </Field>
              </span>

              {/* Country */}
              <Field>
                <FieldLabel>Country</FieldLabel>
                <Input
                  placeholder="Bangladesh"
                  {...register("country")}
                />
              </Field>

              <span className="flex justify-between gap-1">
                {/* Bedrooms */}
                <Field>
                  <FieldLabel>Bedrooms</FieldLabel>
                  <Input
                    type="number"
                    {...register("bedrooms", { valueAsNumber: true })}
                  />
                </Field>

                {/* Bathrooms */}
                <Field>
                  <FieldLabel>Bathrooms</FieldLabel>
                  <Input
                    type="number"
                    {...register("bathrooms", { valueAsNumber: true })}
                  />
                </Field>
              </span>

              <span className="flex justify-between gap-1">
                {/* Area */}
                <Field>
                  <FieldLabel>Area (sqft)</FieldLabel>
                  <Input
                    type="number"
                    {...register("area", { valueAsNumber: true })}
                  />
                </Field>
                {/* Property Type */}
                <Field>
                  <FieldLabel>Property Type</FieldLabel>
                  <select
                    className="w-full border rounded-md p-2"
                    {...register("propertyType")}
                  >
                    <option value="villa">Villa</option>
                    <option value="apartment">Apartment</option>
                    <option value="house">House</option>
                    <option value="condo">Condo</option>
                    <option value="townhouse">Townhouse</option>
                    <option value="office">Office</option>
                  </select>
                </Field>
              </span>
              <span className="flex justify-between gap-1">
                {/* Listing Type */}
                <Field>
                  <FieldLabel>Listing Type</FieldLabel>
                  <select
                    className="w-full border rounded-md p-2"
                    {...register("type")}
                  >
                    <option value="sale">Sale</option>
                    <option value="rent">Rent</option>
                  </select>
                </Field>

                {/* Status */}
                <Field>
                  <FieldLabel>Status</FieldLabel>
                  <select
                    className="w-full border rounded-md p-2"
                    {...register("status")}
                  >
                    <option value="available">Available</option>
                    <option value="sold">Sold</option>
                    <option value="rented">Rented</option>
                    <option value="pending">Pending</option>
                  </select>
                </Field>
              </span>

              {/* Image URL */}
              <Field>
                <FieldLabel>Image URL</FieldLabel>
                <Input
                  placeholder="https://example.com/image.jpg"
                  {...register("image")}
                />
              </Field>

              {/* Amenities */}
              <Field>
                <FieldLabel>Amenities</FieldLabel>
                <Input
                  placeholder="Pool, Garage, Garden"
                  {...register("amenities")}
                />
                <FieldDescription>
                  Separate amenities with commas
                </FieldDescription>
              </Field>

              {/* Featured */}
              <Field>
                <label className="flex items-center gap-2">
                  <input type="checkbox" {...register("featured")} />
                  Featured Property
                </label>
              </Field>

              {/* Description */}
              <Field>
                <FieldLabel>Description</FieldLabel>
                <Textarea
                  rows={4}
                  {...register("description")}
                />
              </Field>

              {/* Submit */}
              <Field>
                <Button type="submit" className="w-full">
                  Create Property
                </Button>
              </Field>

            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}