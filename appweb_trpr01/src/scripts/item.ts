export interface Item {
  id: number;
  name: string;
  price: number;
  description: string;
  stock: number;
}

const items: Item[] = [
  {
    id: 1,
    name: "Exalted Orb",
    price: 100,
    description:
      "Une Exalted Orb est un objet de monnaie qui permet d’ajouter une nouvelle propriété aléatoire à un équipement rare.",
    stock: 10,
  },
  {
    id: 2,
    name: "Chaos Orb",
    price: 10,
    description:
      "Une Chaos Orb est un objet de monnaie qui permet de relancer les propriétés aléatoires d’un équipement rare.",
    stock: 20,
  },
  {
    id: 3,
    name: "Divine Orb",
    price: 50,
    description:
      "Une Divine Orb est un objet de monnaie qui permet de relancer les valeurs des propriétés aléatoires d’un équipement rare.",
    stock: 5,
  },
  {
    id: 4,
    name: "Eternal Orb",
    price: 200,
    description:
      "Une Eternal Orb est un objet de monnaie qui permet de relancer à la fois les propriétés et les valeurs aléatoires d’un équipement rare.",
    stock: 2,
  },
  {
    id: 5,
    name: "Gemcutter's Prism",
    price: 5,
    description:
      "Un Gemcutter's Prism est un objet de monnaie qui permet d’améliorer la qualité d’un équipement ou d’une gemme de compétence.",
    stock: 50,
  },
  {
    id: 6,
    name: "Mirror of Kalandra",
    price: 1000,
    description:
      "Un Mirror of Kalandra est un objet de monnaie qui permet de créer une copie miroir d’un objet.",
    stock: 1,
  },
];

export default items;
