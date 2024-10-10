"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

function isInvalidText(text: string) {
  return !text || text.trim() === "";
}

type shareProp = {
  prevState: any;
  formData: FormData;
};

export async function ShareMeal({
  prevState,
  formData,
}: shareProp): Promise<any> {
  const meal = {
    title: formData.get("title") as string,
    summary: formData.get("summary") as string,
    instructions: formData.get("instructions") as string,
    image: formData.get("image") as any,
    creator: formData.get("name") as string,
    creator_email: formData.get("email") as string,
  };

  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes("@") ||
    !meal.image ||
    meal.image.size === 0
  ) {
    return {
      message: "Invalid Input",
    };
  }

  await saveMeal(meal);
  revalidatePath("/meals"); //('/meals', 'layout')
  redirect("/meals");
}
