"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { uploadImage } from "./cloudinary";
import { db } from "./db";
import slugify from "slugify";

function isInvalidText(text: string) {
  return !text || text.trim() === "";
}

export async function ShareMeal(prevState: any, formData: FormData) {
  console.log("FormData", formData);

  const meal = {
    title: formData.get("title") as string,
    summary: formData.get("summary") as string,
    instructions: formData.get("instructions") as string,
    image: formData.get("image") as File,
    creator: formData.get("name") as string,
    creatorEmail: formData.get("email") as string,
  };

  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creatorEmail) ||
    !meal.creatorEmail.includes("@") ||
    !meal.image ||
    meal.image.size === 0
  ) {
    return {
      message: "Invalid Input",
    };
  }

  const mealslug = slugify(meal.title, { lower: true });

  if (!mealslug) {
    return { message: "couldn't form the slug" };
  }

  const uploadedURL = await uploadImage(meal.image);

  if (!uploadedURL) {
    return { message: "couldn't upload to cloudinary" };
  }

  const newMeal = await db.recipe.create({
    data: {
      slug: mealslug,
      title: meal.title,
      image: uploadedURL,
      summary: meal.summary,
      instructions: meal.instructions,
      creator: meal.creator,
      creatorEmail: meal.creatorEmail,
    },
  });

  if (!newMeal) {
    return { message: "Couldn't make the new meal" };
  }

  revalidatePath("/meals");
  redirect("/meals");
}
