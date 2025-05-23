import React from 'react';
import { 
  CheckCircle, 
  ShieldCheck, 
  Truck, 
  BadgeCheck, 
  BookOpen 
} from 'lucide-react';

export default function FeaturesBar() {
  const features = [
    {
      icon: CheckCircle,
      text: "100% AUTHENTIC"
    },
    {
      icon: ShieldCheck,
      text: "SECURE SHOPPING"
    },
    {
      icon: Truck,
      text: "EXPRESS SHIPPING"
    },
    {
      icon: BadgeCheck,
      text: "CUSTOMIZED SERVICES"
    },
    {
      icon: BookOpen,
      text: "BUYERS GUIDE"
    }
  ];

  return (
    <div className="w-full bg-zinc-800 py-4">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-2">
          {features.map((feature, index) => (
            <React.Fragment key={feature.text}>
              <div className="flex items-center justify-center gap-2 px-4">
                <feature.icon className="w-8 h-8 text-[#c4ff00]" />
                <span className="text-white text-sm font-bold whitespace-nowrap">
                  {feature.text}
                </span>
              </div>
              {index < features.length - 1 && (
                <div className="hidden md:block w-px h-8 bg-zinc-600" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}