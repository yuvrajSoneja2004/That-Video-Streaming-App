"use client";

import * as React from "react";
import { Filter, ImageIcon, Sliders } from "lucide-react";
import { fabric } from "fabric";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fabricFilters } from "@/utils/fabricFilters";

export default function FilterSidebar({ onSelectFilter }) {
  const [selectedFilter, setSelectedFilter] = React.useState<string | null>(
    null
  );
  const [filterStrength, setFilterStrength] = React.useState(0.5);

  const handleFilterSelect = (filterName: string) => {
    setSelectedFilter(filterName);
    setFilterStrength(0.5); // Reset strength when changing filters
  };

  const handleStrengthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterStrength(parseFloat(event.target.value));
  };

  const applyFilter = () => {
    // This is where you would apply the filter to your Fabric.js canvas
    console.log(
      `Applying ${selectedFilter} filter with strength ${filterStrength}`
    );
  };

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <ImageIcon className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Fabric.js Filters</span>
                  <span className="">Select a filter</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Available Filters</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {fabricFilters.map((filter) => (
                  <SidebarMenuItem key={filter.name}>
                    <SidebarMenuButton
                      asChild
                      isActive={selectedFilter === filter.name}
                      onClick={() => {
                        handleFilterSelect(filter.name);
                        onSelectFilter(filter.name);
                      }}
                    >
                      <button>
                        <Filter className="mr-2 h-4 w-4" />
                        {filter.name}
                      </button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarTrigger />
    </SidebarProvider>
  );
}
