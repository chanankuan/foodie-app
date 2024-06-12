'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import type { FormDataMeal } from './definitions';
import { saveMeal } from './meals';

function isInvalidText(text: string): boolean {
  return !text || text.trim() === '';
}

export async function shareMeal(prevState: any, formData: FormData) {
  const title = formData.get('title');
  const summary = formData.get('summary');
  const instructions = formData.get('instructions');
  const image = formData.get('image');
  const creator = formData.get('name');
  const creator_email = formData.get('email');

  if (
    typeof title === 'string' &&
    typeof summary === 'string' &&
    typeof instructions === 'string' &&
    image instanceof File &&
    typeof creator === 'string' &&
    typeof creator_email === 'string'
  ) {
    if (
      isInvalidText(title) ||
      isInvalidText(summary) ||
      isInvalidText(instructions) ||
      isInvalidText(creator) ||
      isInvalidText(creator_email) ||
      !creator_email.includes('@') ||
      !image ||
      image.size === 0
    ) {
      return {
        message: 'Invalid input.',
      };
    }

    const meal: FormDataMeal = {
      title,
      summary,
      instructions,
      image,
      creator,
      creator_email,
    };

    await saveMeal(meal);
    revalidatePath('/meals');
    redirect('/meals');
  } else {
    throw new Error('Invalid form data');
  }
}
