"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Activity, MessageSquare, Settings, AlertTriangle, CheckCircle, Zap, Database, Brain } from "lucide-react";

interface ActivityItem {
  id: string;
  time: string;
  action: string;
  type: "query" | "training" | "update" | "error" | "achievement" | "system";
  agent?: string;
  user?: string;
  details?: string;
}

interface ActivityFeedProps {
  activities: ActivityItem[];
  title?: string;
  maxHeight?: string;
}

const activityIcons = {
  query: MessageSquare,
  training: Zap,
  update: Database,
  error: AlertTriangle,
  achievement: CheckCircle,
  system: Settings
};

const activityColors = {
  query: "text-blue-600",
  training: "text-purple-600",
  update: "text-green-600",
  error: "text-red-600",
  achievement: "text-yellow-600",
  system: "text-gray-600"
};

const activityBadgeVariants = {
  query: "default" as const,
  training: "secondary" as const,
  update: "default" as const,
  error: "destructive" as const,
  achievement: "default" as const,
  system: "outline" as const
};

export function ActivityFeed({
  activities,
  title = "Recent Activity",
  maxHeight = "400px"
}: ActivityFeedProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className={`h-[${maxHeight}]`}>
          <div className="p-6 space-y-4">
            {activities.map((activity, index) => {
              const Icon = activityIcons[activity.type];
              return (
                <div key={activity.id} className="flex items-start gap-3 pb-4 border-b border-border last:border-b-0 last:pb-0">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                    activity.type === 'error' ? 'bg-red-100 dark:bg-red-900' :
                    activity.type === 'achievement' ? 'bg-green-100 dark:bg-green-900' :
                    activity.type === 'training' ? 'bg-blue-100 dark:bg-blue-900' :
                    'bg-primary/10'
                  }`}>
                    <Icon className={`h-4 w-4 ${activityColors[activity.type]}`} />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <Badge variant={activityBadgeVariants[activity.type]} className="text-xs">
                        {activity.type}
                      </Badge>
                    </div>
                    {activity.agent && (
                      <div className="flex items-center gap-2">
                        <Avatar className="h-5 w-5">
                          <AvatarFallback className="text-xs">
                            <Brain className="h-3 w-3" />
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-muted-foreground">{activity.agent}</span>
                      </div>
                    )}
                    {activity.details && (
                      <p className="text-xs text-muted-foreground">{activity.details}</p>
                    )}
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}



