"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
    MapPin,
    Bed,
    Bath,
    Maximize2,
    CalendarDays,
    Phone,
    Mail,
    Heart,
    Share2,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { TProperty } from "@/types/property";
import defaultImage from "@/assets/def-placeholder.png";  

export default function PropertyDetailPage() {
    const { id } = useParams();
    console.log(id);
    const router = useRouter();
    console.log(router);

    const [property, setProperty] = useState<TProperty | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [saved, setSaved] = useState<boolean>(false);
    console.log(property);

    // Fetch property details
    useEffect(() => {
        if (!id) return;
        const fetchProperty = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/properties/${id}`);
                if (!res.ok) throw new Error("Property not found");
                const data = await res.json();
                setProperty(data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchProperty();
    }, [id]);

//Loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-white flex flex-col">
                {/* Skeleton nav */}
                <div className="px-6 py-4 border-b border-gray-100">
                    <div className="h-5 w-36 bg-gray-100 rounded-full animate-pulse" />
                </div>
                {/* Skeleton hero */}
                <div className="w-full h-[420px] bg-gray-100 animate-pulse" />
                {/* Skeleton content */}
                <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 w-full">
                    <div className="space-y-4">
                        <div className="h-8 w-3/4 bg-gray-100 rounded-lg animate-pulse" />
                        <div className="h-4 w-1/3 bg-gray-100 rounded-lg animate-pulse" />
                        <div className="h-6 w-1/4 bg-gray-100 rounded-lg animate-pulse" />
                        <div className="grid grid-cols-4 gap-3 mt-6">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="h-24 bg-gray-100 rounded-2xl animate-pulse" />
                            ))}
                        </div>
                    </div>
                    <div className="h-72 bg-gray-100 rounded-2xl animate-pulse" />
                </div>
            </div>
        );
    }

// Error state
    if (error) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4">
                <p className="text-gray-500 text-sm">{error}</p>
                <button
                    onClick={() => router.back()}
                    className="text-sm font-semibold text-green-700 hover:underline"
                >
                    ← Back to Return
                </button>
            </div>
        );
    }

    if (!property) return null;

    const {
        title,
        price,
        location,
        bedrooms,
        bathrooms,
        area,
        image,
        type,
        featured,
        description,
        amenities,
        yearBuilt,
    } = property;

    return (
        <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>

            {/* ── Top Nav ── */}
            <div className="px-6 py-4 flex items-center gap-2 border-b border-gray-100">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors"
                >
                    <ChevronLeft size={16} />
                    Back to Return
                </button>
            </div>

            {/* ── Hero Image ── */}
            <div className="relative w-full h-[420px] overflow-hidden group">
                <Image
                    src={image || defaultImage}
                    alt={title || "Property Image"}
                    fill
                    priority
                    className="object-cover"
                />

                {/* Left arrow */}
                <button className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow">
                    <ChevronLeft size={18} className="text-gray-700" />
                </button>
                {/* Right arrow */}
                <button className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow">
                    <ChevronRight size={18} className="text-gray-700" />
                </button>

                {/* Badges - top left */}
                <div className="absolute top-4 left-4 flex gap-2">
                    {type && (
                        <span className="bg-green-800 text-white text-xs font-semibold px-3 py-1.5 rounded-full capitalize">
                            For {type}
                        </span>
                    )}
                    {featured && (
                        <span className="bg-amber-400 text-gray-900 text-xs font-semibold px-3 py-1.5 rounded-full">
                            Featured
                        </span>
                    )}
                </div>

                {/* Action buttons - top right */}
                <div className="absolute top-4 right-4 flex gap-2">
                    <button
                        onClick={() => setSaved(!saved)}
                        className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm hover:scale-105 transition-transform"
                    >
                        <Heart
                            size={18}
                            className={saved ? "fill-red-500 text-red-500" : "text-gray-600"}
                        />
                    </button>
                    <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm hover:scale-105 transition-transform">
                        <Share2 size={18} className="text-gray-600" />
                    </button>
                </div>
            </div>

            {/* ── Main Content ── */}
            <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">

                {/* ── Left ── */}
                <div className="border border-gray-200 rounded-2xl p-6">
                    {/* Title */}
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>

                    {/* Location */}
                    <p className="flex items-center gap-1.5 text-gray-500 text-sm mb-4">
                        <MapPin size={14} className="text-gray-400 shrink-0" />
                        {location}
                    </p>

                    {/* Price */}
                    <p className="text-3xl font-bold text-gray-900 mb-6">
                        {"$" + price}
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                        {[
                            { icon: <Bed size={22} className="text-gray-500" />, label: "Bedrooms", value: bedrooms },
                            { icon: <Bath size={22} className="text-gray-500" />, label: "Bathrooms", value: bathrooms },
                            { icon: <Maximize2 size={22} className="text-gray-500" />, label: "Area", value: `${area?.toLocaleString()} sqft` },
                            { icon: <CalendarDays size={22} className="text-gray-500" />, label: "Year Built", value: yearBuilt },
                        ].map(({ icon, label, value }) => (
                            <div
                                key={label}
                                className="flex flex-col items-center justify-center border border-gray-200 rounded-2xl py-5 px-3 gap-1.5 hover:border-gray-300 transition-colors"
                            >
                                {icon}
                                <span className="text-xl font-bold text-gray-900">{value}</span>
                                <span className="text-xs text-gray-400">{label}</span>
                            </div>
                        ))}
                    </div>

                    {/* About */}
                    <div className="mb-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-2">
                            About This Property
                        </h2>
                        <p className="text-gray-500 leading-relaxed text-sm">{description}</p>
                    </div>

                    {/* Amenities */}
                    {(amenities?.length ?? 0) > 0 && (
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">Amenities</h2>
                            <div className="flex flex-wrap gap-2">
                                {amenities?.map((amenity) => (
                                    <span
                                        key={amenity}
                                        className="border border-gray-200 text-gray-700 text-sm px-4 py-1.5 rounded-full hover:border-gray-400 transition-colors"
                                    >
                                        {amenity}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* ── Right — Contact Agent ── */}
                <div className="lg:sticky lg:top-6 h-fit">
                    <div className="border border-gray-200 rounded-2xl p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-5">Contact Agent</h3>

                        {/* Agent row */}
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-11 h-11 rounded-full bg-green-800 flex items-center justify-center text-white font-bold text-base shrink-0">
                                J
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900 text-sm">James Rodriguez</p>
                                <p className="text-xs text-gray-400">Listing Agent</p>
                            </div>
                        </div>

                        {/* Contact info */}
                        <div className="space-y-3 mb-6">
                            <a
                                href="tel:+12125550198"
                                className="flex items-center gap-2.5 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                <Phone size={15} className="text-gray-400 shrink-0" />
                                +1 212-555-0198
                            </a>
                            <a
                                href="mailto:agent@estatebridge.com"
                                className="flex items-center gap-2.5 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                <Mail size={15} className="text-gray-400 shrink-0" />
                                agent@estatebridge.com
                            </a>
                        </div>

                        {/* Buttons */}
                        <div className="space-y-3">
                            <button className="w-full bg-green-800 hover:bg-green-900 active:scale-[.98] text-white font-semibold py-3 rounded-xl transition-all text-sm">
                                Schedule Tour
                            </button>
                            <button className="w-full border border-gray-200 hover:border-gray-400 text-gray-700 font-semibold py-3 rounded-xl transition-all text-sm">
                                Send Message
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}