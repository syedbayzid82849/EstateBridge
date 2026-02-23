"use client";

import Image from "next/image";
import Link from "next/link";
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
    Flame,
    Trees,
    Car,
    Archive,
} from "lucide-react";
import { useParams } from "next/navigation";

// ── Static property data (swap for dynamic fetch later) ──────────────────────
const property = {
    _id: "699a882420c4b4969cafd78e",
    title: "Well-Located Condo for Rent in Ho Chi Minh City",
    price_usd: 1150,
    price_local: 28175000,
    currency: "VND",
    location: "Ho Chi Minh City, Vietnam",
    city: "Ho Chi Minh City",
    country: "Vietnam",
    bedrooms: 2,
    bathrooms: 1,
    area: 2000,
    image:
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    type: "rent",
    propertyType: "condo",
    featured: false,
    description:
        "Contemporary condo in a sought-after neighborhood in Ho Chi Minh City. This stunning unit offers modern finishes, an open-plan living space, and abundant natural light throughout. Perfectly positioned for easy access to the city's best restaurants, cafés, and cultural landmarks. Ideal for professionals or small families seeking comfort and convenience in the heart of Vietnam's most vibrant metropolis.",
    amenities: ["Fireplace", "Garden", "Basement", "Parking"],
    yearBuilt: 2023,
    status: "available",
    ownerId: "6999e159e85668b21ec09bbf",
    createdAt: "2024-07-20T10:00:00.000+00:00",
    updatedAt: "2024-07-20T10:00:00.000+00:00",
};

// ── Amenity icon map ─────────────────────────────────────────────────────────
const amenityIcons: Record<string, React.ReactNode> = {
    Fireplace: <Flame size={16} />,
    Garden: <Trees size={16} />,
    Basement: <Archive size={16} />,
    Parking: <Car size={16} />,
};



// ── Component ────────────────────────────────────────────────────────────────
export default function PropertyDetailPage() {
    const params = useParams();
    const PropertyId = params.id;
    console.log(PropertyId);
    const {
        title,
        price_usd,
        price_local,
        currency,
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
        status,
    } = property;

    const fetchPropertyById = async (id: string) => {
        try {
            const response = await fetch(`/api/properties/${id}`);
            if (!response.ok) throw new Error("Failed to fetch property");
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching property:", error);
            return null;
        }
    };
    console.log(fetchPropertyById);


    return (
        <main className="max-w-6xl mx-auto min-h-screen bg-[#F7F6F2] font-sans">
            {/* ── Top nav ── */}
            <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-stone-200 px-6 py-4 flex items-center gap-3">
                <Link
                    href="/properties"
                    className="flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-900 transition-colors"
                >
                    <ChevronLeft size={16} />
                    Back to Properties
                </Link>
            </nav>

            {/* ── Hero image ── */}
            <section className="relative w-full h-[55vh] overflow-hidden">
                {/* Badges */}
                <div className="absolute top-5 left-5 z-10 flex gap-2">
                    <span className="bg-emerald-700 text-white text-xs font-semibold px-3 py-1.5 rounded-full tracking-wide uppercase">
                        For {type}
                    </span>
                    {featured && (
                        <span className="bg-amber-400 text-stone-900 text-xs font-semibold px-3 py-1.5 rounded-full tracking-wide uppercase">
                            Featured
                        </span>
                    )}
                    <span
                        className={`text-xs font-semibold px-3 py-1.5 rounded-full tracking-wide uppercase ${status === "available"
                            ? "bg-sky-100 text-sky-700"
                            : "bg-red-100 text-red-700"
                            }`}
                    >
                        {status}
                    </span>
                </div>

                {/* Action buttons */}
                <div className="absolute top-5 right-5 z-10 flex gap-2">
                    <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow hover:scale-105 transition-transform">
                        <Heart size={18} className="text-stone-600" />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow hover:scale-105 transition-transform">
                        <Share2 size={18} className="text-stone-600" />
                    </button>
                </div>

                <Image
                    src={image}
                    alt={title}
                    fill
                    priority
                    className="w-full h-full object-cover object-center rounded-2xl shadow-sm"
                />
                {/* Gradient overlay */}
            </section>

            {/* ── Content grid ── */}
            <div className=" px-6 pb-20 mt-10 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
                {/* Left column */}
                <div className="space-y-8">
                    {/* Title & price */}
                    <div className="bg-white rounded-2xl shadow-sm p-8 border border-stone-100">
                        <div className="flex items-start justify-between gap-4 flex-wrap">
                            <div>
                                <h1 className="text-2xl font-bold text-stone-900 leading-tight mb-2">
                                    {title}
                                </h1>
                                <p className="flex items-center gap-1.5 text-stone-500 text-sm">
                                    <MapPin size={14} className="text-emerald-600 shrink-0" />
                                    {location}
                                </p>
                            </div>
                            <div className="text-right shrink-0">
                                <p className="text-3xl font-extrabold text-emerald-700">
                                    ${price_usd.toLocaleString()}
                                    <span className="text-base font-medium text-stone-400">
                                        /mo
                                    </span>
                                </p>
                                <p className="text-xs text-stone-400 mt-0.5">
                                    ≈ {price_local.toLocaleString()} {currency}
                                </p>
                            </div>
                        </div>

                        {/* Stats row */}
                        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {[
                                { icon: <Bed size={20} />, label: "Bedrooms", value: bedrooms },
                                {
                                    icon: <Bath size={20} />,
                                    label: "Bathrooms",
                                    value: bathrooms,
                                },
                                {
                                    icon: <Maximize2 size={20} />,
                                    label: "Area",
                                    value: `${area} sqft`,
                                },
                                {
                                    icon: <CalendarDays size={20} />,
                                    label: "Year Built",
                                    value: yearBuilt,
                                },
                            ].map(({ icon, label, value }) => (
                                <div
                                    key={label}
                                    className="flex flex-col items-center justify-center bg-stone-50 rounded-xl py-4 px-2 border border-stone-100 gap-1"
                                >
                                    <span className="text-emerald-600">{icon}</span>
                                    <span className="text-lg font-bold text-stone-800">
                                        {value}
                                    </span>
                                    <span className="text-xs text-stone-400">{label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Description */}
                    <div className="bg-white rounded-2xl shadow-sm p-8 border border-stone-100">
                        <h2 className="text-lg font-bold text-stone-800 mb-4">
                            About This Property
                        </h2>
                        <p className="text-stone-600 leading-relaxed text-sm">
                            {description}
                        </p>
                    </div>

                    {/* Amenities */}
                    <div className="bg-white rounded-2xl shadow-sm p-8 border border-stone-100">
                        <h2 className="text-lg font-bold text-stone-800 mb-5">
                            Amenities
                        </h2>
                        <div className="flex flex-wrap gap-3">
                            {amenities.map((amenity) => (
                                <span
                                    key={amenity}
                                    className="flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-200 text-sm font-medium px-4 py-2 rounded-full"
                                >
                                    {amenityIcons[amenity] ?? null}
                                    {amenity}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right column — Contact card */}
                <div className="lg:sticky lg:top-24 h-fit">
                    <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6 space-y-5">
                        <h3 className="text-base font-bold text-stone-800">
                            Contact Agent
                        </h3>

                        {/* Agent info */}
                        <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-full bg-emerald-700 flex items-center justify-center text-white font-bold text-lg shrink-0">
                                J
                            </div>
                            <div>
                                <p className="font-semibold text-stone-900 text-sm">
                                    James Rodriguez
                                </p>
                                <p className="text-xs text-stone-400">Listing Agent</p>
                            </div>
                        </div>

                        <div className="space-y-2.5 text-sm">
                            <a
                                href="tel:+12125550198"
                                className="flex items-center gap-2.5 text-stone-600 hover:text-emerald-700 transition-colors"
                            >
                                <Phone size={15} className="text-emerald-600 shrink-0" />
                                +1 212-555-0198
                            </a>
                            <a
                                href="mailto:agent@estatebridge.com"
                                className="flex items-center gap-2.5 text-stone-600 hover:text-emerald-700 transition-colors"
                            >
                                <Mail size={15} className="text-emerald-600 shrink-0" />
                                agent@estatebridge.com
                            </a>
                        </div>

                        <button className="w-full bg-emerald-700 hover:bg-emerald-800 active:scale-[.98] text-white font-semibold py-3 rounded-xl transition-all duration-150 text-sm tracking-wide">
                            Schedule Tour
                        </button>
                        <button className="w-full border border-stone-200 hover:border-emerald-600 hover:text-emerald-700 text-stone-700 font-semibold py-3 rounded-xl transition-all duration-150 text-sm tracking-wide">
                            Send Message
                        </button>

                        {/* Property meta */}
                        <div className="border-t border-stone-100 pt-4 space-y-2 text-xs text-stone-400">
                            <div className="flex justify-between">
                                <span>Property Type</span>
                                <span className="capitalize font-medium text-stone-600">
                                    {property.propertyType}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span>Listing Type</span>
                                <span className="capitalize font-medium text-stone-600">
                                    For {property.type}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span>Listed</span>
                                <span className="font-medium text-stone-600">
                                    {new Date(property.createdAt).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                    })}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}