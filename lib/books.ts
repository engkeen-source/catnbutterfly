export interface Book {
  id: string;
  title: string;
  cover: string;
  width: number;
  height: number;
  description: string;
}

export const books: Book[] = [
  {
    id: "how-are-you-doing",
    title: "How Are You Doing Today?",
    cover: "/images/474399_5b60c5cb48a94cc1ae245fa3850245d7~mv2.jpg",
    width: 1249,
    height: 1883,
    description:
      "How Are You Doing Today? illuminates the path for the spiritual warrior in you to be connected with who you really are.\n\nYour energy creates your reality. The greatest love is self-love. There are no coincidences in life. Everything is right sometimes.\n\nThrough a series of simple, reflective questions, you are invited to meet the raw, unadorned experience of being alive. Everything you need to know is already implied in your own journey. This book opens that gate of remembrance to your authentic self — and for you to shine as you are meant to be.",
  },
  {
    id: "the-cat-and-butterfly",
    title: "The Cat and Butterfly",
    cover: "/images/474399_962dd4d43bac4ff59a0e60cbca1a3623~mv2.jpg",
    width: 1100,
    height: 1760,
    description:
      "This is where everything began. A cat was told that she has nine lives. With enthusiasm and curiosity, she embarked on a heroic journey to search for the meaning of life, so that she can save everyone from misery and lead a fulfilling life — so she thought. Until she met her match in a butterfly that showed her what true wisdom is.",
  },
  {
    id: "effortless-living",
    title: "Effortless Living",
    cover: "/images/474399_60c155f493b644d9a31af593204b2528~mv2.webp",
    width: 1100,
    height: 1760,
    description:
      "The ancient classic Tao Te Ching (or Dao De Jing) contains hidden nuggets of wisdom for the spiritual adventurers or pilgrims. Based on my love of this ancient text and my attempts to translate the Chinese language, this book is the English translated version of all the 81 verses, supported with my spontaneous reflection of living wisdom based on the text.",
  },
];
