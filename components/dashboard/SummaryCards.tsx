import {
  Images,
  CalendarDays,
  CalendarRange,
  Clock3,
} from "lucide-react";

interface SummaryCardsProps {
  totalPhotos: number;
  totalDays: number;
  earliestDate: string;
  latestDate: string;
}

export default function SummaryCards({
  totalPhotos,
  totalDays,
  earliestDate,
  latestDate,
}: SummaryCardsProps) {
  const cards = [
    {
      title: "Total Photos",
      value: totalPhotos,
      icon: Images,
      description: "Photos processed",
    },
    {
      title: "Attendance Days",
      value: totalDays,
      icon: CalendarDays,
      description: "Unique work days",
    },
    {
      title: "Earliest Date",
      value: earliestDate,
      icon: CalendarRange,
      description: "First attendance record",
    },
    {
      title: "Latest Date",
      value: latestDate,
      icon: Clock3,
      description: "Most recent attendance",
    },
  ];

  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="
              rounded-xl
              border
              bg-white
              p-6
              shadow-sm
              transition-all
              hover:shadow-md
            "
          >
            <div className="flex items-center justify-between">
              <div>
                <p
                  className="
                    text-sm
                    font-medium
                    text-slate-500
                  "
                >
                  {card.title}
                </p>

                <h2
                  className="
                    mt-2
                    text-3xl
                    font-bold
                    text-slate-900
                  "
                >
                  {card.value}
                </h2>

                <p
                  className="
                    mt-2
                    text-xs
                    text-slate-500
                  "
                >
                  {card.description}
                </p>
              </div>

              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-full
                  bg-blue-50
                "
              >
                <Icon
                  className="
                    h-6
                    w-6
                    text-blue-600
                  "
                />
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
