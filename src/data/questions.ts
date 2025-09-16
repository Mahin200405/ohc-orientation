import type { Question } from '../types';

export const questions: Question[] = [
  {
    id: "1",
    q: "Which fast-food chain’s logo only uses red and yellow because they stimulate hunger?",
    a: [
      { text: "In-n-out", image: "/assets/questions/1a.png" },
      { text: "McDonalds", image: "/assets/questions/1b.png" },
      { text: "Hardee's", image: "/assets/questions/1c.png" }
    ],
    c: 1,
    points: 10
  },
  {
    id: "2",
    q: "Which company uses the slogan “Just Do It”?",
    a: [
      { text: "Nike", image: "/assets/questions/2a.png" },
      { text: "Under Armour", image: "/assets/questions/2b.png" },
      { text: "Adidas", image: "/assets/questions/2c.png" }
    ],
    c: 0,
    points: 10
  },
  {
    id: "3",
    q: "Which of the following are complementary colors?",
    a: [
      { text: "Blue and Yellow", image: "/assets/questions/3a1.png" },
      { text: "", image: "/assets/questions/3b.png" },
      { text: "", image: "/assets/questions/3c.png" }
    ],
    c: 2,
    points: 10
  },
  {
    id: "4",
    q: "Which Company creates Illustrator and Photoshop?",
    a: ["Oracle", "Nvidia", "Adobe"],
    c: 2,
    points: 10
  },
  {
    id: "5",
    q: "What does DPI stand for?",
    a: ["Dots per Inch", "Design per inch", "D0t pixels"],
    c: 0,
    points: 10
  },

{
    id: "6",
    q: "Father of Modern Graphic Design?",
    a: ["Saul Bass", "Paul Rand", "Milton Glaser"],
    c: 1,
    points: 10
  },

{
    id: "7",
    q: "Which year was photoshop released",
    a: ["1988", "1990", "1994"],
    c: 1,
    points: 10
  },
{
    id: "8",
    q: "Which software is primarily used for vector graphics?",
    a: ["Adobe Photoshop", "Adobe Illustrator", "CorelDraw", "Canva"],
    c: 1,
    points: 10
  },

  {
    id: "9",
    q: "What does CMYK stand for in printing?",
    a: ["Cyan, Magenta, Yellow, Key (Black)", "Cyan, Metallic, Yellow, Key", "Cyan, Magenta, Yellow, Key (Gold)", "Cyan, Magenta, Yellow, Kaleidoscope"],
    c: 0,
    points: 10
  },

  {
    id: "10",
    q: "Which logo was designed for just $35?",
    a: ["Apple", "Twitter", "Nike", "Pepsi"],
    c: 2,
    points: 10
  },

  {
    id: "11",
    q: "Which of these is not a font style",
    a: ["Serif", "Sans Serif", "Italic", "Neon"],
    c: 3,
    points: 10
  },

  {
    id: "12",
    q: "Riddle: I’m made of colors you can’t mix with paint. I shine only on screens, never on paper. What am I?",
    a: ["RGB", "CMYK", "Pantone", "Hex"],
    c: 0,
    points: 10
  },
  {
    id: "13",
    q: "Which one is usually lighter in file size?",
    a: ["PNG", "GIF", "PSD", "JPEG"],
    c: 3,
    points: 10
  },
  {
    id: "14",
    q: "What does “Lorem Ipsum” text represent in design mockups?",
    a: ["Random quotes from Latin authors", "Placeholder text", "Secret design", "Hidden Copyright notice"],
    c: 1,
    points: 10
  },

  {
    id: "15",
    q: "True or False: The Instagram logo has always been a camera.",
    a: ["True", "False"],
    c: 1,
    points: 10
  },

  {
    id: "16",
    q: "Which logo has a hidden bear inside a mountain?",
    a: ["Puma", "Starbucks", "Lacoste", "Toblerone"],
    c: 3,
    points: 10
  }
];