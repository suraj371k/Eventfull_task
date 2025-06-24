"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { ChevronsUpDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage } from "../../../components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

const categories = ["Singer", "Dancer", "Comedian", "DJ", "Speaker"];
const languages = ["Hindi", "English", "Punjabi", "Tamil", "Bengali"];

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  bio: z.string().min(10, "Bio should be at least 10 characters"),
  categories: z.array(z.string()).min(1, "Select at least one category"),
  languages: z.array(z.string()).min(1, "Select at least one language"),
  feeRange: z.string().min(1, "Select fee range"),
  location: z.string().min(2, "Location is required"),
  profileImage: z.any().optional(),
});

export default function ArtistForm() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      bio: "",
      categories: [],
      languages: [],
      feeRange: "",
      location: "",
      profileImage: undefined,
    },
  });

  const onSubmit = (data: any) => {
    console.log("Artist Submitted:", data);
    toast.success("Form submitted check console for output")
  };

  const [categoryOpen, setCategoryOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <div className="max-w-3xl mx-auto p-6 mb-5">
      <h1 className="text-3xl font-bold mb-6 text-center">
        🎤 Artist Onboarding Form
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Label>Name</Label>
          <Input {...register("name")} placeholder="Enter artist name" />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Label>Bio</Label>
          <Textarea
            {...register("bio")}
            placeholder="Short artist biography"
            rows={4}
          />
          {errors.bio && (
            <p className="text-red-500 text-sm">{errors.bio.message}</p>
          )}
        </div>

        <div>
          <Label>Categories</Label>
          <Popover open={categoryOpen} onOpenChange={setCategoryOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className="w-full justify-between"
              >
                Select Categories
                <ChevronsUpDown className="ml-2 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full max-h-40 overflow-y-auto">
              {categories.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 p-2 cursor-pointer hover:bg-muted"
                  onClick={() => {
                    const prev = watch("categories") || [];
                    const exists = prev.includes(item);
                    const newVals = exists
                      ? prev.filter((val) => val !== item)
                      : [...prev, item];
                    setValue("categories", newVals);
                  }}
                >
                  <input
                    type="checkbox"
                    checked={watch("categories")?.includes(item)}
                    readOnly
                  />
                  {item}
                </div>
              ))}
            </PopoverContent>
          </Popover>
          {errors.categories && (
            <p className="text-red-500 text-sm">{errors.categories.message}</p>
          )}
        </div>

        <div>
          <Label>Languages Spoken</Label>
          <Popover open={languageOpen} onOpenChange={setLanguageOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className="w-full justify-between"
              >
                Select Languages
                <ChevronsUpDown className="ml-2 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full max-h-40 overflow-y-auto">
              {languages.map((lang) => (
                <div
                  key={lang}
                  className="flex items-center gap-2 p-2 cursor-pointer hover:bg-muted"
                  onClick={() => {
                    const prev = watch("languages") || [];
                    const exists = prev.includes(lang);
                    const newVals = exists
                      ? prev.filter((val) => val !== lang)
                      : [...prev, lang];
                    setValue("languages", newVals);
                  }}
                >
                  <input
                    type="checkbox"
                    checked={watch("languages")?.includes(lang)}
                    readOnly
                  />
                  {lang}
                </div>
              ))}
            </PopoverContent>
          </Popover>
          {errors.languages && (
            <p className="text-red-500 text-sm">{errors.languages.message}</p>
          )}
        </div>
        <Controller
          name="feeRange"
          control={control}
          render={({ field }) => (
            <div>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select fee range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Fee Range</SelectLabel>
                    <SelectItem value="₹30,000 - ₹60,000">
                      ₹30,000 - ₹60,000
                    </SelectItem>
                    <SelectItem value="₹60,000 - ₹1,00,000">
                      ₹60,000 - ₹1,00,000
                    </SelectItem>
                    <SelectItem value="₹1,00,000+">₹1,00,000+</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.feeRange && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.feeRange.message}
                </p>
              )}
            </div>
          )}
        />

        <div>
          <Label>Location</Label>
          <Input {...register("location")} placeholder="City, Country" />
          {errors.location && (
            <p className="text-red-500 text-sm">{errors.location.message}</p>
          )}
        </div>

        <div>
          <Label>Profile Image (Optional)</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setValue("profileImage", file);
                const reader = new FileReader();
                reader.onload = () => setPreview(reader.result as string);
                reader.readAsDataURL(file);
              }
            }}
          />
          {preview && (
            <div className="mt-2">
              <Avatar className="w-20 h-20">
                <AvatarImage src={preview} alt="Preview" />
              </Avatar>
            </div>
          )}
        </div>

        <Button type="submit" className="w-full text-lg py-6">
          Submit Artist Profile
        </Button>
      </form>
    </div>
  );
}
