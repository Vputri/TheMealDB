"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MealPreview } from "@/types/meal";

type MealCardProps = {
  meal: MealPreview;
};

export function MealCard({ meal }: MealCardProps) {
  return (
    <Link 
      href={`/meal/${meal.idMeal}`}
      className="meal-card group"
      id={`meal-${meal.idMeal}`}
    >
      <div className="meal-card-image-wrapper">
        <Image
          src={meal.strMealThumb}
          alt={meal.strMeal}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="meal-card-overlay">
        <h3 className="meal-card-title">{meal.strMeal}</h3>
      </div>
    </Link>
  );
}
