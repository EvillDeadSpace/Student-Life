import {
  AcademicCapIcon,
  BookOpenIcon,
  WrenchIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

export interface Category {
  id: number;
  title: string;
  slug: string;
  description: string;
  icon: typeof AcademicCapIcon;
  color: string;
  hoverColor: string;
}

export const categories: Category[] = [
  {
    id: 1,
    title: "Polovnih udžbenika i materijala",
    slug: "polovnih-udzbenika-i-materijala",
    description:
      "Mogućnost pronalaska i prodaje polovnih udžbenika, skripti i drugih studijskih materijala koji olakšavaju učenje i pripremu ispita.",
    icon: BookOpenIcon,
    color: "from-blue-500 to-blue-600",
    hoverColor: "hover:from-blue-600 hover:to-blue-700",
  },
  {
    id: 2,
    title: "Studentske opreme",
    slug: "studentske-opreme",
    description:
      "Informacije i ponude studentske opreme poput ruksaka, laptopova, kancelarijskog pribora i drugih potrepština potrebnih za svakodnevno studiranje.",
    icon: WrenchIcon,
    color: "from-green-500 to-green-600",
    hoverColor: "hover:from-green-600 hover:to-green-700",
  },
  {
    id: 3,
    title: "Kurseva i privatnih časova",
    slug: "kursevi",
    description:
      "Ponude i potražnje za kursevima i privatnim časovima koji pomažu studentima da unaprijede znanje i savladaju gradivo efikasnije.",
    icon: UserGroupIcon,
    color: "from-purple-500 to-purple-600",
    hoverColor: "hover:from-purple-600 hover:to-purple-700",
  },
];
