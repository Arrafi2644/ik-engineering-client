"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, ImageOff, Layers, ScrollText } from "lucide-react";
import { IService } from "@/types";

interface ServiceDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  service: IService;
}

export default function ServiceDetailsModal({
  open,
  onOpenChange,
  service,
}: ServiceDetailsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 gap-0 rounded-xl border border-border/50">

        {/* Hero Image */}
        <div className="relative w-full h-48 bg-muted/40 overflow-hidden rounded-t-xl">
          {service.image ? (
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-muted-foreground/40">
              <ImageOff className="w-8 h-8" />
              <span className="text-xs">No image</span>
            </div>
          )}
        </div>

        <div className="px-6 py-5 space-y-5">

          {/* Short Description */}
          {service.title && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-1 h-4 rounded-full bg-violet-500" />
                <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Title
                </span>
              </div>
              <div className="flex gap-2 bg-muted/30 rounded-lg p-3.5">
                <ScrollText className="w-4 h-4 text-muted-foreground/60 mt-0.5 shrink-0" />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.title}
                </p>
              </div>
            </div>
          )}
          <Separator />

          {/* Short Description */}
          {service.shortDescription && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-1 h-4 rounded-full bg-violet-500" />
                <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Description
                </span>
              </div>
              <div className="flex gap-2 bg-muted/30 rounded-lg p-3.5">
                <ScrollText className="w-4 h-4 text-muted-foreground/60 mt-0.5 shrink-0" />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.shortDescription}
                </p>
              </div>
            </div>
          )}

          <Separator />

          {/* Features */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-1 h-4 rounded-full bg-violet-500" />
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Features
              </span>
              <Badge
                variant="secondary"
                className="h-5 px-2 text-[10px] font-bold bg-violet-100 dark:bg-violet-950 text-violet-600 dark:text-violet-400 border-0"
              >
                {service.features?.length ?? 0}
              </Badge>
            </div>

            {service.features?.length ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex gap-3 border border-border/50 rounded-lg p-3.5 bg-muted/20 hover:bg-muted/40 transition-colors"
                  >
                    {/* Icon or index badge */}
                    <div className="shrink-0 w-8 h-8 rounded-md bg-violet-100 dark:bg-violet-950 flex items-center justify-center">
                      {feature.icon ? (
                        <span className="text-base leading-none">{feature.icon}</span>
                      ) : (
                        <Layers className="w-3.5 h-3.5 text-violet-500" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{feature.title}</p>
                      {feature.description && (
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2 leading-relaxed">
                          {feature.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-16 rounded-lg border border-dashed border-border/50 text-muted-foreground/50 text-sm">
                No features added
              </div>
            )}
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
}