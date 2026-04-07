"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { INGREDIENT_THUMB_URL } from "@/constants/api";
import { Ingredient } from "@/types/meal";

type IngredientCardProps = {
  ingredient: Ingredient;
};

export function IngredientCard({ ingredient }: IngredientCardProps) {
  const thumbUrl = INGREDIENT_THUMB_URL(ingredient.strIngredient);

  return (
    <Link 
      href={`/ingredient/${ingredient.strIngredient}`}
      className="ingredient-card"
      id={`ingredient-${ingredient.idIngredient}`}
    >
      <div className="ingredient-card-image">
        <Image
          src={thumbUrl}
          alt={ingredient.strIngredient}
          width={150}
          height={150}
          className="object-contain transition-transform duration-300 hover:scale-110"
        />
      </div>
      <div className="ingredient-card-content">
        <h3 className="ingredient-card-title">{ingredient.strIngredient}</h3>
        {ingredient.strType && (
          <span className="ingredient-card-type">{ingredient.strType}</span>
        )}
      </div>
    </Link>
  );
}
