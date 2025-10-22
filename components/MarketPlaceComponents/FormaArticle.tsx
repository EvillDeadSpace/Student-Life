"use client";
import React from "react";
import { addMarketplaceItem } from "@/lib/MarketplaceAPI/marketplaceApi";
import {
  PhotoIcon,
  BuildingLibraryIcon,
  AcademicCapIcon,
  ClipboardDocumentListIcon,
  BookOpenIcon,
  CurrencyDollarIcon,
  TagIcon,
  UserIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ItemType } from "@prisma/client";

interface MarketplaceFormData {
  type: ItemType;
  title: string;
  author?: string;
  subject?: string;
  brand?: string;
  model?: string;
  faculty?: string;
  category?: string;
  condition: string;
  price: string;
  description?: string;
}

export default function FormaArticle() {
  const {
    register: formRegister,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<MarketplaceFormData>({
    defaultValues: {
      type: ItemType.BOOK,
    },
  });

  const typeValue = watch("type") || ItemType.BOOK;

  const onSubmit = async (data: MarketplaceFormData) => {
    const idStorage = JSON.parse(localStorage.getItem("currentUser") || "{}");
    
    const payload = {
      type: data.type,
      title: data.title,
      author: data.author || undefined,
      subject: data.subject || undefined,
      brand: data.brand || undefined,
      model: data.model || undefined,
      faculty: data.faculty || undefined,
      category: data.category || undefined,
      condition: data.condition,
      price: Number(data.price),
      description: data.description || undefined,
      sellerId: idStorage?.id,
    };

    try {
      await toast.promise(addMarketplaceItem(payload), {
        loading: "Dodavanje...",
        success: "Artikal je uspješno dodan!",
        error: "Neuspjelo dodavanje. Pokušajte ponovo.",
      });

      reset();
    } catch (err) {
      console.error(err);
      toast.error("Neuspjelo dodavanje. Pokušajte ponovo.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-8">
      <div className="space-y-2">
        <label className="flex items-center text-sm font-semibold text-gray-900 dark:text-white mb-3">
          Tip artikla *
        </label>
        <div className="grid grid-cols-3 gap-4">
          {[
            { value: "BOOK", label: "Knjiga", icon: BookOpenIcon },
            { value: "EQUIPMENT", label: "Oprema", icon: ComputerDesktopIcon },
            { value: "COURSE", label: "Kurs", icon: AcademicCapIcon },
          ].map((type) => (
            <label
              key={type.value}
              className={`flex flex-col items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                typeValue === type.value
                  ? "border-teal-500 bg-teal-50 dark:bg-teal-900/20"
                  : "border-gray-200 dark:border-gray-700 hover:border-teal-300"
              }`}
            >
              <input
                type="radio"
                value={type.value}
                {...formRegister("type", { required: true })}
                className="sr-only"
              />
              <type.icon className="w-8 h-8 mb-2 text-teal-500" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {type.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="flex items-center text-sm font-semibold text-gray-900 dark:text-white mb-3">
          <BookOpenIcon className="w-5 h-5 mr-2 text-teal-500" />
          Naslov *
        </label>
        <input
          type="text"
          {...formRegister("title", { required: "Ovo polje je obavezno" })}
          className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          placeholder={
            typeValue === "BOOK"
              ? "Unesite naslov knjige..."
              : typeValue === "EQUIPMENT"
              ? "Naziv opreme..."
              : "Naziv kursa..."
          }
        />
        {errors.title && (
          <p className="text-sm text-red-500 mt-1">{String(errors.title.message)}</p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {typeValue === "BOOK" && (
          <div className="space-y-2">
            <label className="flex items-center text-sm font-semibold text-gray-900 dark:text-white mb-3">
              <UserIcon className="w-5 h-5 mr-2 text-teal-500" />
              Autor
            </label>
            <input
              type="text"
              {...formRegister("author")}
              className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              placeholder="Ime autora..."
            />
          </div>
        )}

        {typeValue === "EQUIPMENT" && (
          <div className="space-y-2">
            <label className="flex items-center text-sm font-semibold text-gray-900 dark:text-white mb-3">
              <TagIcon className="w-5 h-5 mr-2 text-teal-500" />
              Brend
            </label>
            <input
              type="text"
              {...formRegister("brand")}
              className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              placeholder="Apple, Dell, HP..."
            />
          </div>
        )}

        <div className="space-y-2">
          <label className="flex items-center text-sm font-semibold text-gray-900 dark:text-white mb-3">
            <BuildingLibraryIcon className="w-5 h-5 mr-2 text-teal-500" />
            Fakultet
          </label>
          <input
            type="text"
            {...formRegister("faculty")}
            className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            placeholder="Naziv fakulteta..."
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {typeValue === "BOOK" && (
          <div className="space-y-2">
            <label className="flex items-center text-sm font-semibold text-gray-900 dark:text-white mb-3">
              <AcademicCapIcon className="w-5 h-5 mr-2 text-teal-500" />
              Predmet
            </label>
            <input
              type="text"
              {...formRegister("subject")}
              className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              placeholder="Naziv predmeta..."
            />
          </div>
        )}

        {typeValue === "EQUIPMENT" && (
          <div className="space-y-2">
            <label className="flex items-center text-sm font-semibold text-gray-900 dark:text-white mb-3">
              <ComputerDesktopIcon className="w-5 h-5 mr-2 text-teal-500" />
              Model
            </label>
            <input
              type="text"
              {...formRegister("model")}
              className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              placeholder="MacBook Pro 16..."
            />
          </div>
        )}
      </div>

      {typeValue === "EQUIPMENT" && (
        <div className="space-y-2">
          <label className="flex items-center text-sm font-semibold text-gray-900 dark:text-white mb-3">
            <TagIcon className="w-5 h-5 mr-2 text-teal-500" />
            Kategorija
          </label>
          <select
            {...formRegister("category")}
            className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white"
          >
            <option value="">Odaberi kategoriju</option>
            <option value="LAPTOP">Laptop</option>
            <option value="TABLET">Tablet</option>
            <option value="KALKULATOR">Kalkulator</option>
            <option value="LAB_OPREMA">Lab oprema</option>
            <option value="SKOLSKI_PRIBOR">Školski pribor</option>
            <option value="TEHNICKA_OPREMA">Tehnička oprema</option>
            <option value="OSTALO">Ostalo</option>
          </select>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="flex items-center text-sm font-semibold text-gray-900 dark:text-white mb-3">
            <TagIcon className="w-5 h-5 mr-2 text-teal-500" />
            Stanje *
          </label>
          <select
            {...formRegister("condition", { required: "Ovo polje je obavezno" })}
            className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white"
          >
            <option value="">Odaberi stanje</option>
            <option value="kao-nova">Kao nova</option>
            <option value="dobro">Dobro stanje</option>
            <option value="zadovoljavajuće">Zadovoljavajuće</option>
            <option value="lošije">Lošije stanje</option>
          </select>
          {errors.condition && (
            <p className="text-sm text-red-500 mt-1">{String(errors.condition.message)}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="flex items-center text-sm font-semibold text-gray-900 dark:text-white mb-3">
            <CurrencyDollarIcon className="w-5 h-5 mr-2 text-teal-500" />
            Cijena (KM) *
          </label>
          <input
            type="number"
            {...formRegister("price", { required: "Ovo polje je obavezno" })}
            min="0"
            step="0.01"
            className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            placeholder="0.00"
          />
          {errors.price && (
            <p className="text-sm text-red-500 mt-1">{String(errors.price.message)}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label className="flex items-center text-sm font-semibold text-gray-900 dark:text-white mb-3">
          <ClipboardDocumentListIcon className="w-5 h-5 mr-2 text-teal-500" />
          Opis (opciono)
        </label>
        <textarea
          {...formRegister("description")}
          rows={4}
          className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none"
          placeholder="Dodatne informacije..."
        />
      </div>

      <div className="space-y-2">
        <label className="flex items-center text-sm font-semibold text-gray-900 dark:text-white mb-3">
          <PhotoIcon className="w-5 h-5 mr-2 text-teal-500" />
          Slika (opciono)
        </label>
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center hover:border-teal-500 dark:hover:border-teal-400 transition-all duration-300 cursor-pointer group">
          <PhotoIcon className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-500 group-hover:text-teal-500 transition-colors duration-300 mb-4" />
          <p className="text-gray-600 dark:text-gray-400 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-300">
            Kliknite da dodate sliku ili je povucite ovde
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            PNG, JPG do 5MB
          </p>
        </div>
      </div>

      <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none flex items-center justify-center space-x-3 ${isSubmitting ? "opacity-80" : ""}`}
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              <span>Dodavanje...</span>
            </>
          ) : (
            <span>Dodaj artikal</span>
          )}
        </button>
      </div>
    </form>
  );
}
