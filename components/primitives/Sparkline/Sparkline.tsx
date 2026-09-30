import React from 'react';
import type { SparklineProps } from './Sparkline.types';
import { cn, findClasses, type VR } from '../_shared';
import contract from '../../../contracts/components/Sparkline.contract.json';

const rules = (contract.variantRules || []) as unknown as VR[];

function polyline(values: number[], width: number, height: number): string {
  if (values.length === 1) {
    const y = height / 2;
    return `M 0 ${y} L ${width} ${y}`;
  }
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const step = width / Math.max(values.length - 1, 1);
  const pad = 2;
  return values
    .map((value, index) => {
      const x = index * step;
      const y = pad + (height - pad * 2) * (1 - (value - min) / span);
      return `${index === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(' ');
}

export const Sparkline = React.forwardRef<SVGSVGElement, SparklineProps>((props, ref) => {
  const { values = [], stroke = 'accent', className, ...rest } = props;
  const numeric = values.filter((value): value is number => typeof value === 'number' && Number.isFinite(value));
  const colorClasses = findClasses(rules, { stroke });
  const strokeVar =
    stroke === 'brand' ? 'var(--color-brand-primary)' : 'var(--color-accent-primary)';

  return (
    <svg
      ref={ref}
      viewBox="0 0 120 40"
      preserveAspectRatio="none"
      role="img"
      aria-hidden={numeric.length === 0 || undefined}
      className={cn('w-full h-full', ...colorClasses, className)}
      {...rest}
    >
      {numeric.length > 0 ? (
        <path
          d={polyline(numeric, 120, 40)}
          fill="none"
          stroke={strokeVar}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : null}
    </svg>
  );
});

Sparkline.displayName = 'Sparkline';
