import React, { forwardRef, useImperativeHandle, useLayoutEffect, useRef } from "react";

type MasonryProps = {
  columns: number;
  gap?: number;
  children: React.ReactNode;
};

export type MasonryGridHandle = {
  reflow: () => void;
};

export const MasonryGrid = forwardRef<MasonryGridHandle, MasonryProps>(
  ({ columns, gap = 8, children }, ref) => {
    const gridRef = useRef<HTMLDivElement>(null);

    const reflow = () => {
      const grid = gridRef.current;
      if (!grid) return;

      const rowHeight = 10;

      const items = Array.from(grid.children) as HTMLElement[];

      items.forEach((item) => {
        const content = item.firstElementChild as HTMLElement | null;
        if (!content) return;

        const height = content.getBoundingClientRect().height;
        const span = Math.ceil((height + gap) / (rowHeight + gap));
        item.style.gridRowEnd = `span ${span}`;
      });
    };

    useImperativeHandle(ref, () => ({
      reflow,
    }));

    useLayoutEffect(() => {
			const grid = gridRef.current;  if (!grid) return;
			const observer = new ResizeObserver(() => {
				reflow();
			});
			observer.observe(grid);
			return () => observer.disconnect();
    }, [children, columns, gap]);

    return (
      <div
        ref={gridRef}
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          gridAutoRows: "10px",
          gap: `${gap}px`,
        }}
      >
        {children}
      </div>
    );
  }
);

MasonryGrid.displayName = "MasonryGrid";