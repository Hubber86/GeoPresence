"use client";

import { Filter, RotateCcw, Search } from "lucide-react";

export interface FilterValues {
  startDate: string;
  endDate: string;
  state: string;
  city: string;
  postalCode: string;
}

interface FiltersProps {
  values: FilterValues;
  onChange: (values: FilterValues) => void;
}

export default function Filters({
  values,
  onChange,
}: FiltersProps) {
  const updateField = (
    field: keyof FilterValues,
    value: string
  ) => {
    onChange({
      ...values,
      [field]: value,
    });
  };

  const resetFilters = () => {
    onChange({
      startDate: "",
      endDate: "",
      state: "",
      city: "",
      postalCode: "",
    });
  };

  return (
    <section className="rounded-xl border bg-white shadow-sm">
      {/* Header */}

      <div className="border-b p-6">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-blue-600" />

          <h2 className="text-xl font-semibold">
            Filters
          </h2>
        </div>

        <p className="mt-1 text-sm text-slate-500">
          Filter attendance records and
          photo metadata by date and location.
        </p>
      </div>

      {/* Filters */}

      <div className="grid gap-4 p-6 md:grid-cols-2 xl:grid-cols-5">
        {/* Start Date */}

        <div>
          <label
            htmlFor="startDate"
            className="mb-2 block text-sm font-medium"
          >
            Start Date
          </label>

          <input
            id="startDate"
            type="date"
            value={values.startDate}
            onChange={(e) =>
              updateField(
                "startDate",
                e.target.value
              )
            }
            className="
              w-full
              rounded-lg
              border
              px-3
              py-2
              text-sm
              outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />
        </div>

        {/* End Date */}

        <div>
          <label
            htmlFor="endDate"
            className="mb-2 block text-sm font-medium"
          >
            End Date
          </label>

          <input
            id="endDate"
            type="date"
            value={values.endDate}
            onChange={(e) =>
              updateField(
                "endDate",
                e.target.value
              )
            }
            className="
              w-full
              rounded-lg
              border
              px-3
              py-2
              text-sm
              outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />
        </div>

        {/* State */}

        <div>
          <label
            htmlFor="state"
            className="mb-2 block text-sm font-medium"
          >
            State
          </label>

          <input
            id="state"
            type="text"
            placeholder="Maharashtra"
            value={values.state}
            onChange={(e) =>
              updateField(
                "state",
                e.target.value
              )
            }
            className="
              w-full
              rounded-lg
              border
              px-3
              py-2
              text-sm
              outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />
        </div>

        {/* City */}

        <div>
          <label
            htmlFor="city"
            className="mb-2 block text-sm font-medium"
          >
            City
          </label>

          <input
            id="city"
            type="text"
            placeholder="Pune"
            value={values.city}
            onChange={(e) =>
              updateField(
                "city",
                e.target.value
              )
            }
            className="
              w-full
              rounded-lg
              border
              px-3
              py-2
              text-sm
              outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />
        </div>

        {/* PIN Code */}

        <div>
          <label
            htmlFor="postalCode"
            className="mb-2 block text-sm font-medium"
          >
            PIN Code
          </label>

          <input
            id="postalCode"
            type="text"
            placeholder="411057"
            value={values.postalCode}
            onChange={(e) =>
              updateField(
                "postalCode",
                e.target.value
              )
            }
            className="
              w-full
              rounded-lg
              border
              px-3
              py-2
              text-sm
              outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />
        </div>
      </div>

      {/* Footer */}

      <div className="flex items-center justify-between border-t bg-slate-50 p-4">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Search className="h-4 w-4" />
          Filter results dynamically
        </div>

        <button
          type="button"
          onClick={resetFilters}
          className="
            flex
            items-center
            gap-2
            rounded-lg
            border
            px-4
            py-2
            text-sm
            font-medium
            transition
            hover:bg-slate-100
          "
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </button>
      </div>
    </section>
  );
}
