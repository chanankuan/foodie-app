import { put } from '@vercel/blob';
import fs from 'node:fs';
import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';

import type { FormDataMeal, Meal } from './definitions';

const db = sql('meals.db');

export async function getMeals(): Promise<Meal[]> {
  await new Promise(resolve => setTimeout(resolve, 2000));

  // throw new Error('Loading meals failed');
  const stmt = db.prepare('SELECT * FROM meals');
  const meals = stmt.all() as Meal[]; // Type assertion here
  return meals;
}

export function getMeal(slug: string): Meal {
  const stmt = db.prepare(`SELECT * FROM meals WHERE slug = ?`);
  const meal = stmt.get(slug) as Meal;
  return meal;
}

export async function saveMeal(meal: FormDataMeal) {
  const slug = slugify(meal.title, { lower: true });
  const instructions = xss(meal.instructions);

  const extension = meal.image.name.split('.').pop();
  const fileName = `${slug}.${extension}`;

  // const stream = fs.createWriteStream(`public/images/${fileName}`);
  // const bufferedImage = await meal.image.arrayBuffer();
  // stream.write(Buffer.from(bufferedImage), error => {
  //   if (error) {
  //     throw new Error('Saving image failed!');
  //   }
  // });

  const blob = await put(fileName, meal.image, {
    access: 'public',
  });

  const newMeal: Omit<Meal, 'id'> = {
    ...meal,
    slug: slug,
    instructions: instructions,
    image: blob.url,
  };

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
  ).run(newMeal);
}
