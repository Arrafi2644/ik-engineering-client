import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  trend?: string;
  icon?: string | React.ReactNode;
}

const StatCard = ({ title, value, description, trend, icon }: StatCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold text-foreground mt-2">{value}</h3>
            {description && (
              <p className="text-xs text-muted-foreground mt-1">{description}</p>
            )}
            {trend && (
              <div className="flex items-center gap-1 mt-2 text-xs font-medium text-green-600">
                <TrendingUp size={14} />
                {trend}
              </div>
            )}
          </div>
          {icon && (
            <div className="text-3xl">
              {typeof icon === 'string' ? icon : icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
