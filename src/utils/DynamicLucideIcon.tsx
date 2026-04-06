/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as Icons from "lucide-react";

type Props = {
  iconName?: string;
  size?: number;
  className?: string;
  strokeWidth?: number
};

export function DynamicLucideIcon({ iconName, size = 24, className }: Props) {
  const IconName = iconName ? (Icons as any)[iconName] || Icons.HelpCircle : Icons.HelpCircle;

  return <IconName size={size} className={className} />;
}
