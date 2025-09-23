import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface LifelineButtonProps {
  icon: React.ReactNode;
  label: string;
  description: string;
  onClick: () => void;
  disabled?: boolean;
  used?: boolean;
  className?: string;
}

export default function LifelineButton({
  icon,
  label,
  description,
  onClick,
  disabled = false,
  used = false,
  className
}: LifelineButtonProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="lg"
            className={cn(
              "h-16 w-16 flex-col gap-1 p-2 transition-all duration-300",
              used && "opacity-50",
              className
            )}
            onClick={onClick}
            disabled={disabled || used}
          >
            <div className="text-xl">{icon}</div>
            <span className="text-xs font-medium">{label}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p className={used ? "line-through" : ""}>{description}</p>
          {used && <p className="text-xs text-muted-foreground mt-1">Used</p>}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}