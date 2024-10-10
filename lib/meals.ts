import fs from "node:fs";
import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
const db = sql("meals.db");

type MealType = {
  title: string;
  slug?: string;
  image: any;
  summary: string;
  creator: string;
  creator_email?: string;
  instructions?: string;
};

export function getMeals(): MealType[] {
  return db.prepare("SELECT * FROM meals").all();
}

export function getMeal(slug: string): MealType {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}

export async function saveMeal(meal: MealType): Promise<void> {
  meal.slug = slugify(meal.title, { lower: true });
  if (meal.instructions) {
    meal.instructions = xss(meal.instructions);
  }
  const extension = meal.image.name.split(".").pop();
  const filename = `${meal.slug}.${extension}`;

  const stream = fs.createWriteStream(`public/images/${filename}`);
  const bufferedImage = await meal.image.arrayBuffer();
  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Saving Image Failed!");
    }
  });
  meal.image = `/images/${filename}`;
  db.prepare(
    `
    INSERT INTO meals
      (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (
      @title,
      @summary,
      @instructions,
      @creator,
      @creator_email,
      @image,
      @slug
    )
    `
  ).run(meal);
}
