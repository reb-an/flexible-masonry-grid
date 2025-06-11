import {
  generateMasonryGrid4 as generateMasonryGrid,
  type CollectionProps,
} from "./masonry.ts";
import "./style.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = /* html */ `
  <div>    
    <div id="parent" class="w-full"></div>
  </div>
`;

const parent = document.querySelector<HTMLDivElement>("#parent")!;

const generateContent = (aspect: string) => {
  const content = document.createElement("div");
  content.className =
    `h-auto w-full rounded-lg bg-purple-300 overflow-hidden ` + aspect;
  const text = document.createElement("h1");
  text.innerHTML = "Hello, How are You?";
  content.appendChild(text);
  return content;
};

const contentColl: CollectionProps[] = [
  { htmlElm: generateContent("aspect-square"), aspectRatio: 1 },
  { htmlElm: generateContent("aspect-video"), aspectRatio: 16 / 9 },
  { htmlElm: generateContent("aspect-square"), aspectRatio: 1 },
  { htmlElm: generateContent("aspect-video"), aspectRatio: 16 / 9 },
  { htmlElm: generateContent("aspect-square"), aspectRatio: 1 },
  { htmlElm: generateContent("aspect-video"), aspectRatio: 16 / 9 },
  { htmlElm: generateContent("aspect-square"), aspectRatio: 1 },
  { htmlElm: generateContent("aspect-video"), aspectRatio: 16 / 9 },
  { htmlElm: generateContent("aspect-square"), aspectRatio: 1 },
  { htmlElm: generateContent("aspect-video"), aspectRatio: 16 / 9 },
  { htmlElm: generateContent("aspect-square"), aspectRatio: 1 },
  { htmlElm: generateContent("aspect-video"), aspectRatio: 16 / 9 },
];

const generateImage = (src: string) => {
  const img = document.createElement("img");
  img.className = "h-auto max-w-full rounded-lg";
  img.src = src;
  return img;
};

const images: CollectionProps[] = [
  {
    htmlElm: generateImage(
      "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg"
    ),
    aspectRatio: 1.22,
  },
  {
    htmlElm: generateImage(
      "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg"
    ),
    aspectRatio: 1.02,
  },
  {
    htmlElm: generateImage(
      "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg"
    ),
    aspectRatio: 0.79,
  },
  {
    htmlElm: generateImage(
      "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg"
    ),
    aspectRatio: 1.6,
  },
  {
    htmlElm: generateImage(
      "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg"
    ),
    aspectRatio: 1.31,
  }, //
  {
    htmlElm: generateImage(
      "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg"
    ),
    aspectRatio: 1.22,
  },
  {
    htmlElm: generateImage(
      "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg"
    ),
    aspectRatio: 1.02,
  },
  {
    htmlElm: generateImage(
      "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg"
    ),
    aspectRatio: 0.79,
  },
  {
    htmlElm: generateImage(
      "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg"
    ),
    aspectRatio: 1.6,
  },
  {
    htmlElm: generateImage(
      "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg"
    ),
    aspectRatio: 1.31,
  },
  {
    htmlElm: generateImage(
      "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg"
    ),
    aspectRatio: 1.22,
  },
  {
    htmlElm: generateImage(
      "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg"
    ),
    aspectRatio: 1.02,
  },
  {
    htmlElm: generateImage(
      "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg"
    ),
    aspectRatio: 0.79,
  },
  {
    htmlElm: generateImage(
      "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg"
    ),
    aspectRatio: 1.6,
  },
  {
    htmlElm: generateImage(
      "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg"
    ),
    aspectRatio: 1.31,
  },
  {
    htmlElm: generateImage(
      "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg"
    ),
    aspectRatio: 1.22,
  },
  {
    htmlElm: generateImage(
      "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg"
    ),
    aspectRatio: 1.02,
  },
  {
    htmlElm: generateImage(
      "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg"
    ),
    aspectRatio: 0.79,
  },
  {
    htmlElm: generateImage(
      "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg"
    ),
    aspectRatio: 1.6,
  },
  {
    htmlElm: generateImage(
      "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg"
    ),
    aspectRatio: 1.31,
  },
];

generateMasonryGrid(images, parent, [
  { breakpoint: "default", colCount: 1, gap: 8 },
  { breakpoint: "md", colCount: 3, gap: 8 },
  { breakpoint: "lg", colCount: 4, gap: 8 },
]);
