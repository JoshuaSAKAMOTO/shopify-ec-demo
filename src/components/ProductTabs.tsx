"use client";

import { useState } from "react";

interface Tab {
  id: string;
  label: string;
  content: {
    title: string;
    description: string;
  }[];
}

interface ProductTabsProps {
  tabs: Tab[];
}

export default function ProductTabs({ tabs }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || "");

  const activeContent = tabs.find((tab) => tab.id === activeTab)?.content || [];

  return (
    <section className="py-12">
      {/* Tab Navigation */}
      <div className="bg-accent">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 text-sm tracking-wide whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? "bg-accent-light text-white"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="space-y-8">
          {activeContent.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-foreground mb-3">
                {section.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                {section.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
