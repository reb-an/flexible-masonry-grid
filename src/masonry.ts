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

export const generateMasonryGrid4 = (
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
    gridContainer.classList.add(classPrefix);

    styleElm.innerHTML += `
        @media (min-width: ${minWidthForBreakpoints[breakpoint]}px) {
            .${containerClass} {
                display: grid;
                gap: ${gap}px;
                grid-template-columns: repeat(${colCount}, minmax(0, 1fr));
                grid-template-rows: repeat(${Math.ceil(
                  collection.length / colCount
                )}, minmax(0, 1fr));
            }
        }
        `;

    // Generate dynamic top shifts to create masonry effect
    let cumulativeShiftPerCol = new Array(colCount).fill(0);

    const maxInverseRatio = Math.max(
      ...collection.map((item) => 1 / item.aspectRatio)
    );

    collection.forEach((_, idx) => {
      const whichCol = idx % colCount;
      const whichRow = Math.floor(idx / colCount);

      const prevItem = collection[(whichRow - 1) * colCount + whichCol]; // item directly on top of current one
      const prevItemHeightPerc = whichRow > 0 ? 1 / prevItem.aspectRatio : 0;
      const shift =
        whichRow > 0
          ? Math.round((1 - prevItemHeightPerc / maxInverseRatio) * 100)
          : 0;

      cumulativeShiftPerCol[whichCol] += shift;

      const itemClass = `${classPrefix}-item-${idx}`;

      styleElm.innerHTML += `
        @media (min-width: ${minWidthForBreakpoints[breakpoint]}px) {
            .${itemClass} {
                position: relative;
                top: -${cumulativeShiftPerCol[whichCol]}%;
            }
        }
        `;

      itemContainers[idx].classList.add(itemClass);
    });
  });

  document.head.appendChild(styleElm);
  parent.appendChild(gridContainer);
};
