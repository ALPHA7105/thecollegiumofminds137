import React, { useState } from "react";
import { BookOpen } from "lucide-react";
import { useTheme } from "../lib/ThemeContext";

interface BookItem {
  id: number;
  top: string;
  left: string;
  size: number;
  rotation: number;
  title: string;
  author: string;
  darkColor: string;
  lightColor: string;
  delay: string;
}

const booksData = [
  {
    title: "Cosmos",
    author: "Carl Sagan",
  },
  {
    title: "A Brief History of Time",
    author: "Stephen Hawking",
  },
  {
    title: "The Feynman Lectures",
    author: "Richard Feynman",
  },
  {
    title: "Sapiens",
    author: "Yuval Noah Harari",
  },
  {
    title: "The Republic",
    author: "Plato",
  },
  {
    title: "1984",
    author: "George Orwell",
  },
  {
    title: "The Martian",
    author: "Andy Weir",
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
  },
  {
    title: "The Art of War",
    author: "Sun Tzu",
  },
  {
    title: "The Origin of Species",
    author: "Charles Darwin",
  },
];

const colors = [
  {
    darkColor: "from-cyan-950/60 to-slate-950/80 border-cyan-800/40 text-cyan-300",
    lightColor: "from-cyan-200/60 to-sky-100/50 border-cyan-400/40 text-cyan-700",
  },
  {
    darkColor: "from-amber-950/60 to-stone-950/80 border-amber-800/40 text-amber-300",
    lightColor: "from-amber-200/60 to-orange-100/50 border-amber-400/40 text-amber-700",
  },
  {
    darkColor: "from-emerald-950/60 to-slate-950/80 border-emerald-800/40 text-emerald-300",
    lightColor: "from-emerald-200/60 to-teal-100/50 border-emerald-400/40 text-emerald-700",
  },
  {
    darkColor: "from-violet-950/60 to-purple-950/80 border-violet-800/40 text-violet-300",
    lightColor: "from-violet-200/60 to-purple-100/50 border-violet-400/40 text-violet-700",
  },
  {
    darkColor: "from-rose-950/60 to-stone-950/80 border-rose-800/40 text-rose-300",
    lightColor: "from-rose-200/60 to-pink-100/50 border-rose-400/40 text-rose-700",
  },
];

export const FloatingBooksBackground: React.FC = () => {
  const books: BookItem[] = [
    { id: 1, top: "18%", left: "5%", size: 36, rotation: -12, title: booksData[0].title, author: booksData[0].author, darkColor: colors[0].darkColor, lightColor: colors[0].lightColor, delay: "0s" },
    { id: 2, top: "15%", left: "88%", size: 42, rotation: 18, title: booksData[1].title, author: booksData[1].author, darkColor: colors[1].darkColor, lightColor: colors[1].lightColor, delay: "-2.5s" },
    { id: 3, top: "28%", left: "20%", size: 32, rotation: 15, title: booksData[2].title, author: booksData[2].author, darkColor: colors[3].darkColor, lightColor: colors[3].lightColor, delay: "-1.2s" },
    { id: 4, top: "40%", left: "82%", size: 38, rotation: -22, title: booksData[3].title, author: booksData[3].author, darkColor: colors[3].darkColor, lightColor: colors[3].lightColor, delay: "-4.1s" },
    { id: 5, top: "41%", left: "11%", size: 40, rotation: 8, title: booksData[4].title, author: booksData[4].author, darkColor: colors[4].darkColor, lightColor: colors[4].lightColor, delay: "-3s" },
    { id: 6, top: "58%", left: "92%", size: 34, rotation: -10, title: booksData[5].title, author: booksData[5].author, darkColor: colors[0].darkColor, lightColor: colors[0].lightColor, delay: "-1.8s" },
    { id: 7, top: "58%", left: "3%", size: 38, rotation: -18, title: booksData[6].title, author: booksData[6].author, darkColor: colors[2].darkColor, lightColor: colors[2].lightColor, delay: "-5s" },
    { id: 8, top: "80%", left: "85%", size: 36, rotation: 25, title: booksData[7].title, author: booksData[7].author, darkColor: colors[4].darkColor, lightColor: colors[4].lightColor, delay: "-2s" },
    { id: 9, top: "20%", left: "73%", size: 30, rotation: -8, title: booksData[8].title, author: booksData[8].author, darkColor: colors[2].darkColor, lightColor: colors[2].lightColor, delay: "-3.5s" },
    { id: 10, top: "80%", left: "7%", size: 35, rotation: 12, title: booksData[9].title, author: booksData[9].author, darkColor: colors[1].darkColor, lightColor: colors[1].lightColor, delay: "-0.8s" },
  ];

  return (
    <div className="hidden md:block absolute left-0 right-0 z-10 top-0 h-[700px] overflow-hidden pointer-events-none">
      {books.map((b) => (
        <FloatingBook key={b.id} book={b} />
      ))}
    </div>
  );
};

const FloatingBook: React.FC<{ book: BookItem }> = ({ book }) => {
  const { theme } = useTheme();
  const [tilt, setTilt] = useState({
    rx: 0,
    ry: 0,
    scale: 1,
  });

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    setTilt({
      rx: -(y / rect.height) * 20,
      ry: (x / rect.width) * 20,
      scale: 1.08,
    });
  };

  return (
    <div
      style={{
        top: book.top,
        left: book.left,
        animationDelay: book.delay,
      }}
      className="absolute pointer-events-auto animate-float"
    >
      <div
        className="relative"
        style={{
          perspective: "1200px",
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setTilt({
            rx: 0,
            ry: 0,
            scale: 1,
          });
        }}
      >
        <div
          style={{
            transform: `
              rotate(${book.rotation}deg)
              rotateX(${tilt.rx}deg)
              rotateY(${tilt.ry}deg)
              scale(${tilt.scale})
            `,
            transformStyle: "preserve-3d",
            transition: "transform .35s ease",
          }}
          className="relative w-[80px] h-[110px]"
        >
          {/* INSIDE PAGES */}

          <div
            className="
              absolute inset-0
              rounded-lg
              bg-white
              shadow-xl
              border
              border-stone-300
              p-3
              flex
              flex-col
              justify-center
              items-center
            "
          >
            <h4 className="text-[11px] font-bold text-slate-900 text-center leading-tight">
              {book.title}
            </h4>

            <p className="mt-2 text-[9px] uppercase tracking-wider text-slate-500">
              {book.author}
            </p>
          </div>

          {/* FRONT COVER */}

          <div
            style={{
              transformOrigin: "left center",
              transform: isHovered
                ? "rotateY(-135deg)"
                : "rotateY(0deg)",
              transition:
                "transform .55s cubic-bezier(.2,.9,.2,1)",
              transformStyle: "preserve-3d",
            }}
            className={`
                absolute inset-0
                flex items-center justify-center
                rounded-lg border
                bg-gradient-to-br
                ${
                theme === "dark"
                    ? book.darkColor
                    : book.lightColor
                }
                backdrop-blur-md shadow-lg cursor-pointer
            `}
          >
            <BookOpen
              size={book.size}
              className="drop-shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
