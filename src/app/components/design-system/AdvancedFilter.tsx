import { useState } from "react";
import { Filter, X, Search, Save } from "lucide-react";
import { Button } from "../ui/button";
import { FormField } from "./FormField";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { ScrollArea } from "../ui/scroll-area";
import { Badge } from "../ui/badge";
import { toast } from "sonner";

interface FilterField {
  name: string;
  label: string;
  type: "text" | "select" | "date" | "number";
  options?: { value: string; label: string }[];
}

interface AdvancedFilterProps {
  fields: FilterField[];
  onApply: (filters: Record<string, string>) => void;
  onClear: () => void;
  activeFilterCount?: number;
}

export function AdvancedFilter({
  fields,
  onApply,
  onClear,
  activeFilterCount = 0,
}: AdvancedFilterProps) {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [savedPresets, setSavedPresets] = useState<
    Array<{ name: string; filters: Record<string, string> }>
  >([
    { name: "Active Employees", filters: { status: "Active", department: "all" } },
    { name: "Recent Hires", filters: { joinDate: "2024-01-01" } },
  ]);

  const handleFilterChange = (name: string, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleApply = () => {
    onApply(filters);
    setOpen(false);
    toast.success("Filters applied", {
      description: `${Object.keys(filters).length} filter(s) active`,
    });
  };

  const handleClear = () => {
    setFilters({});
    onClear();
    toast.info("Filters cleared");
  };

  const handleSavePreset = () => {
    const name = prompt("Enter preset name:");
    if (name) {
      setSavedPresets((prev) => [...prev, { name, filters: { ...filters } }]);
      toast.success("Filter preset saved", {
        description: `Saved as "${name}"`,
      });
    }
  };

  const handleLoadPreset = (preset: { name: string; filters: Record<string, string> }) => {
    setFilters(preset.filters);
    onApply(preset.filters);
    setOpen(false);
    toast.success("Preset loaded", {
      description: preset.name,
    });
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2 relative">
          <Filter className="w-4 h-4" />
          Advanced Filters
          {activeFilterCount > 0 && (
            <Badge
              variant="default"
              className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center p-0 text-xs"
            >
              {activeFilterCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-lg w-full p-0">
        <SheetHeader className="px-6 pt-6 pb-4 border-b border-border">
          <SheetTitle>Advanced Filters</SheetTitle>
          <SheetDescription>
            Apply multiple filters to refine your search
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-200px)] px-6 py-4">
          <div className="space-y-6">
            {/* Saved Presets */}
            {savedPresets.length > 0 && (
              <div>
                <h4 className="font-medium mb-3">Saved Presets</h4>
                <div className="flex flex-wrap gap-2">
                  {savedPresets.map((preset, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleLoadPreset(preset)}
                    >
                      {preset.name}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Filter Fields */}
            <div className="space-y-4">
              <h4 className="font-medium">Filter Criteria</h4>
              {fields.map((field) => (
                <FormField
                  key={field.name}
                  label={field.label}
                  name={field.name}
                  type={field.type}
                  value={filters[field.name] || ""}
                  onChange={(value) => handleFilterChange(field.name, value)}
                  options={field.options}
                  placeholder={`Select ${field.label.toLowerCase()}`}
                />
              ))}
            </div>

            {/* Active Filters Summary */}
            {Object.keys(filters).length > 0 && (
              <div className="p-4 bg-accent rounded-lg">
                <h4 className="font-medium mb-2">Active Filters</h4>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(filters).map(([key, value]) => {
                    if (!value) return null;
                    const field = fields.find((f) => f.name === key);
                    return (
                      <Badge key={key} variant="secondary">
                        {field?.label}: {value}
                        <button
                          className="ml-2 hover:text-destructive"
                          onClick={() => handleFilterChange(key, "")}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="absolute bottom-0 left-0 right-0 px-6 py-4 border-t border-border bg-background flex justify-between gap-2">
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleClear} size="sm">
              Clear All
            </Button>
            {Object.keys(filters).length > 0 && (
              <Button variant="ghost" onClick={handleSavePreset} size="sm">
                <Save className="w-4 h-4 mr-2" />
                Save Preset
              </Button>
            )}
          </div>
          <Button onClick={handleApply}>
            <Search className="w-4 h-4 mr-2" />
            Apply Filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
