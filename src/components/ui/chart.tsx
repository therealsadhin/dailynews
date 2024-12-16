import * as React from 'react';
import { ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';

interface ChartConfig {
  colors?: string[];
  height?: number;
  showLegend?: boolean;
  showXAxis?: boolean;
  showYAxis?: boolean;
  showGrid?: boolean;
  yAxisWidth?: number;
  className?: string;
}

const ChartContext = React.createContext<{
  config: ChartConfig;
  id: string;
}>({
  config: {},
  id: '',
});

const Chart = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'> & {
    config: ChartConfig;
    children: React.ComponentProps<typeof ResponsiveContainer>['children'];
  }
>(({ id, className, children, config, ...props }, ref) => {
  const chartId = React.useId();

  return (
    <ChartContext.Provider value={{ config, id: chartId }}>
      <div
        ref={ref}
        className={cn('w-full', className)}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <ResponsiveContainer width="100%" height={config.height ?? 350}>
          {children}
        </ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
});
Chart.displayName = 'Chart';

const ChartStyle = ({
  id,
  config,
}: {
  id: string;
  config: ChartConfig;
}) => {
  const colors = config.colors ?? ['#2563eb', '#e11d48'];

  return (
    <style>
      {`
      #${id} {
        --chart-primary: ${colors[0]};
        --chart-secondary: ${colors[1]};
      }

      #${id} .recharts-cartesian-grid line {
        stroke: var(--chart-grid);
      }

      #${id} .recharts-cartesian-axis-line {
        stroke: var(--chart-grid);
      }

      #${id} .recharts-cartesian-axis-tick-line {
        stroke: var(--chart-grid);
      }

      #${id} .recharts-cartesian-axis-tick-value {
        fill: var(--chart-text);
        font-size: 12px;
      }

      #${id} .recharts-label {
        fill: var(--chart-text);
        font-size: 12px;
      }

      #${id} .recharts-legend-item-text {
        color: var(--chart-text) !important;
        font-size: 12px;
      }

      #${id} .recharts-tooltip-label {
        color: var(--chart-text);
      }

      #${id} .recharts-tooltip-item {
        color: var(--chart-text) !important;
      }

      #${id} .recharts-tooltip-cursor {
        stroke: var(--chart-grid);
      }

      #${id} .recharts-tooltip-wrapper {
        outline: none !important;
      }
    `}
    </style>
  );
};

const ChartTooltip = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'> & {
    hideLabel?: boolean;
    hideIndicator?: boolean;
  }
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('rounded-lg border bg-background p-2 shadow-sm', className)}
    >
      {!props.hideLabel && (
        <div className="grid gap-2">
          <div className="text-xs text-muted-foreground">{children}</div>
        </div>
      )}
    </div>
  );
});
ChartTooltip.displayName = 'ChartTooltip';

export { Chart, ChartTooltip };
