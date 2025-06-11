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
    const rowCount = Math.ceil(collection.length / colCount);

    const classPrefix = `masonry-grid-${breakpoint}`;

    // Generate dynamic top shifts to create masonry effect
    let cumulativeShiftPerCol = new Array(colCount).fill(0);
    let cumulativeHeightPerCol = new Array(colCount).fill(0);

    const maxInverseRatio = Math.max(
      ...collection.map((item) => 1 / item.aspectRatio)
    );

    collection.forEach((item, idx) => {
      const whichCol = idx % colCount;
      const whichRow = Math.floor(idx / colCount);

      const prevItem = collection[(whichRow - 1) * colCount + whichCol]; // item directly on top of current one
      const prevItemHeightPerc = whichRow > 0 ? 1 / prevItem.aspectRatio : 0;
      const currentItemRelativeHeight = 1 / item.aspectRatio / maxInverseRatio;

      const shift =
        whichRow > 0
          ? Math.round((1 - prevItemHeightPerc / maxInverseRatio) * 100)
          : 0;

      cumulativeShiftPerCol[whichCol] += shift;
      cumulativeHeightPerCol[whichCol] += currentItemRelativeHeight;

      const itemClass = `${classPrefix}-item-${idx}`;

      styleElm.innerHTML += `
        @media (min-width: ${minWidthForBreakpoints[breakpoint]}px) {
            .${itemClass} {
                position: relative;
                ${
                  colCount > 1
                    ? `top: -${cumulativeShiftPerCol[whichCol]}%;`
                    : ""
                }
            }
        }
        `;

      itemContainers[idx].classList.add(itemClass);
    });
    const maxColHeight = Math.max(...cumulativeHeightPerCol);
    const freeSpacePerc = (1 - maxColHeight / rowCount) * 100;

    const containerClass = classPrefix;
    gridContainer.classList.add(classPrefix);

    styleElm.innerHTML += `
        @media (min-width: ${minWidthForBreakpoints[breakpoint]}px) {
            .${containerClass} {
                display: grid;
                gap: ${gap}px;
                grid-template-columns: repeat(${colCount}, minmax(0, 1fr));
                ${
                  colCount > 1
                    ? ` grid-template-rows: repeat(${Math.ceil(
                        collection.length / colCount
                      )}, minmax(0, 1fr)); 
                margin-bottom: -${freeSpacePerc}%;`
                    : ""
                }
                
            }
        }
        `;
  });

  document.head.appendChild(styleElm);
  parent.appendChild(gridContainer);
};
