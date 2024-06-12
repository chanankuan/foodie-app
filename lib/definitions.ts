export type Meal = {
  id: number;
  title: string;
  slug: string;
  image: string;
  summary: string;
  instructions: string;
  creator: string;
  creator_email: string;
};

export type FormDataMeal = Omit<Meal, 'id' | 'slug' | 'image'> & {
  image: File;
};

export type ImagePickerProps = Readonly<{
  label: string;
  name: string;
}>;

export type NavLinkProps = Readonly<{
  href: string;
  children: React.ReactNode;
}>;
