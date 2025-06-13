const minWidthForBreakpoints: Record<BreakpointType, number> = {
  default: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

export type BreakpointType = "default" | "sm" | "md" | "lg" | "xl" | "2xl";

export interface CollectionProps {
  htmlElm: HTMLDivElement;
  aspectRatio: number;
}

export interface BreakpointGridProps {
  breakpoint: BreakpointType;
  colCount: number;
  gap: number;
}

const ROW_UNIT = 4; //px

export const generateMasonryGrid = (
  collection: CollectionProps[],
  parent: HTMLDivElement,
  layout: BreakpointGridProps[]
) => {
  const styleElm = document.createElement("style");
  const gridContainer = document.createElement("div");

  const itemContainers = collection.map((item) => {
    const itemContainer = document.createElement("div");
    itemContainer.style.height = "fit-content";
    itemContainer.appendChild(item.htmlElm);
    gridContainer.appendChild(itemContainer);
    return itemContainer;
  });

  layout.forEach(({ breakpoint, colCount, gap }) => {
    const classPrefix = `masonry-grid-${breakpoint}`;
    const containerClass = classPrefix;
    gridContainer.classList.add(containerClass);

    // Get actual column width
    const parentWidth = parent.clientWidth;
    const totalGap = (colCount - 1) * gap;
    const colWidth = (parentWidth - totalGap) / colCount;

    collection.forEach((item, idx) => {
      const itemHeightPx = colWidth / item.aspectRatio;
      const span = Math.ceil(itemHeightPx / (ROW_UNIT + gap));
      itemContainers[idx].style.gridRowEnd = `span ${span}`;
    });

    styleElm.innerHTML += `
      @media (min-width: ${minWidthForBreakpoints[breakpoint]}px) {
        .${containerClass} {
          display: grid;
          gap: ${gap}px;
          grid-template-columns: repeat(${colCount}, minmax(0, 1fr));
        }
      }
    `;
  });

  document.head.appendChild(styleElm);
  parent.appendChild(gridContainer);
};
