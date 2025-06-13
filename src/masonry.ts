const minWidthForBreakpoints: Record<BreakpointType, number> = {
  default: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

export type BreakpointType = "default" | "sm" | "md" | "lg" | "xl" | "2xl";

type ColSpanProps = {
  [P in BreakpointType]?: number;
};

export interface CollectionProps {
  htmlElm: HTMLDivElement;
  aspectRatio: number;
  customColSpan?: ColSpanProps;
}

export interface BreakpointGridProps {
  breakpoint: BreakpointType;
  colCount: number;
  gap?: number;
}

const ROW_UNIT = 4; //px

export const generateMasonryGrid = (
  collection: CollectionProps[],
  parent: HTMLDivElement,
  layout: BreakpointGridProps[],
  itemContainerHeight?: CSSStyleDeclaration["height"]
) => {
  const styleElm = document.createElement("style");
  const gridContainer = document.createElement("div");

  const itemContainers = collection.map((item) => {
    const itemContainer = document.createElement("div");
    itemContainer.style.height = itemContainerHeight ?? "fit-content";
    itemContainer.appendChild(item.htmlElm);
    gridContainer.appendChild(itemContainer);
    return itemContainer;
  });

  layout.forEach(({ breakpoint, colCount, gap = 0 }) => {
    const classPrefix = `masonry-grid-${breakpoint}`;
    const containerClass = classPrefix;
    gridContainer.classList.add(containerClass);

    // Get actual column width
    const parentWidth = parent.clientWidth;
    const totalGap = (colCount - 1) * gap;
    const colWidth = (parentWidth - totalGap) / colCount;

    collection.forEach(({ aspectRatio, customColSpan }, idx) => {
      const itemClass = classPrefix + "-item-" + idx;
      itemContainers[idx].classList.add(itemClass);

      const colSpanValue = customColSpan?.[breakpoint] ?? 1;

      const itemHeightPx = (colWidth * colSpanValue) / aspectRatio;
      
      const rowSpanValue = Math.ceil(itemHeightPx / (ROW_UNIT + gap));

      styleElm.innerHTML += `
      @media (min-width: ${minWidthForBreakpoints[breakpoint]}px) {
        .${itemClass} {
          grid-column-end: ${colCount == 1 ? "unset" : "span " + colSpanValue};
          grid-row-end: ${colCount == 1 ? "unset" : "span " + rowSpanValue};
        }
      }
    `;
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
