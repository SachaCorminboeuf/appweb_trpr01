export interface Item {
    id: number
    name: string
    price: number
    description: string
    stock: number
}

const items: Item[] = [
    {
        id: 1,
        name: "Exalted Orb",
        price: 100,
        description: "An Exalted Orb is a currency item that can be used to add a new random property to a piece of rare equipment.",
        stock: 10
    },
    {
        id: 2,
        name: "Chaos Orb",
        price: 10,
        description: "A Chaos Orb is a currency item that can be used to re-roll the random properties of a piece of rare equipment.",
        stock: 20
    },
    {
        id: 3,
        name: "Divine Orb",
        price: 50,
        description: "A Divine Orb is a currency item that can be used to re-roll the values of the random properties of a piece of rare equipment.",
        stock: 5
    },
    {
        id: 4,
        name: "Eternal Orb",
        price: 200,
        description: "An Eternal Orb is a currency item that can be used to re-roll the random properties and values of a piece of rare equipment.",
        stock: 2
    },
    {
        id: 5,
        name: "Gemcutter's Prism",
        price: 5,
        description: "A Gemcutter's Prism is a currency item that can be used to improve the quality of a piece of equipment or a skill gem.",
        stock: 50
    },
    {
        id: 6,
        name: "Mirror of Kalandra",
        price: 1000,
        description: "A Mirror of Kalandra is a currency item that can be used to create a mirrored copy of an item.",
        stock: 1
    }
]

export default items