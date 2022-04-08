export interface Journey {
  id: number;
  name: string;
  description: string;
}

export const journeys = [
  {
    id: 1,
    name: "Hello World",
    description: "Hello There. \n Welcome to this Journey"
  },
  {
    id: 2,
    name: "Journey 2",
    description: "Yay you made it so far already..."
  },
   {
    id: 3,
    name: "Endpage",
    description: "Congratulation you finished the course."
  }
]