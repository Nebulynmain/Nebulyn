import React, { useState, useEffect } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
  CheckIcon,
} from "lucide-react";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Schedule = () => {
  // Current date for "Today" button functionality
  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const [selectedMonth, setSelectedMonth] = useState(10); // November (0-indexed)
  const [selectedYear, setSelectedYear] = useState(2021);
  const [activeView, setActiveView] = useState("week");
  const [selectedDate, setSelectedDate] = useState(24);
  const [categories, setCategories] = useState([
    { id: 1, name: "Interview Schedule", color: "blue", checked: true },
    { id: 2, name: "Internal Meeting", color: "green", checked: true },
    { id: 3, name: "Team Schedule", color: "purple", checked: false },
    { id: 4, name: "My Task", color: "yellow", checked: false },
    { id: 5, name: "Reminders", color: "red", checked: false },
  ]);

  // Get days in the selected month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get first day of the month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  // Generate calendar days for the current month view
  const generateCalendarDays = () => {
    const daysInPrevMonth = getDaysInMonth(selectedYear, selectedMonth - 1);
    const daysInCurrentMonth = getDaysInMonth(selectedYear, selectedMonth);
    const firstDay = getFirstDayOfMonth(selectedYear, selectedMonth);

    const days = [];

    // Add days from previous month
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({ day: daysInPrevMonth - i, month: "prev" });
    }

    // Add days from current month
    for (let i = 1; i <= daysInCurrentMonth; i++) {
      days.push({ day: i, month: "current" });
    }

    // Add days from next month to complete the grid
    const remainingDays = 42 - days.length; // 6 rows of 7 days
    for (let i = 1; i <= remainingDays; i++) {
      days.push({ day: i, month: "next" });
    }

    return days;
  };

  const daysInMonth = generateCalendarDays();

  // Generate week days for the week view
  const generateWeekDays = () => {
    const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const result = [];

    // Find the date of the selected day
    let startDate = selectedDate;
    // If we're in month view, ensure we're using a valid date in current month
    if (activeView === "month") {
      startDate = Math.min(
        Math.max(1, startDate),
        getDaysInMonth(selectedYear, selectedMonth)
      );
    }

    // Find the day of the week for the selected date
    const selectedDayOfWeek = new Date(
      selectedYear,
      selectedMonth,
      startDate
    ).getDay();

    // Calculate Sunday of this week
    const sundayDate = startDate - selectedDayOfWeek;

    for (let i = 0; i < 7; i++) {
      const currentDate = sundayDate + i;
      let displayDate = currentDate;
      let displayMonth = selectedMonth;
      let displayYear = selectedYear;

      // Handle month/year overflow
      if (currentDate <= 0) {
        // Previous month
        displayMonth--;
        if (displayMonth < 0) {
          displayMonth = 11;
          displayYear--;
        }
        displayDate = getDaysInMonth(displayYear, displayMonth) + currentDate;
      } else if (currentDate > getDaysInMonth(selectedYear, selectedMonth)) {
        // Next month
        displayMonth++;
        if (displayMonth > 11) {
          displayMonth = 0;
          displayYear++;
        }
        displayDate = currentDate - getDaysInMonth(selectedYear, selectedMonth);
      }

      // Thursday is a holiday in this example
      const holiday = weekdays[i] === "THU";

      result.push({
        shortName: weekdays[i],
        date: displayDate,
        month: displayMonth,
        year: displayYear,
        holiday,
      });
    }

    return result;
  };

  const daysOfWeek = generateWeekDays();

  // Time slots for the week/day view
  const timeSlots = Array.from(
    { length: 24 },
    (_, i) => `${i % 12 === 0 ? 12 : i % 12} ${i < 12 ? "AM" : "PM"}`
  );

  // Generate events with actual date objects
  const generateEvents = () => {
    return [
      {
        id: 1,
        title: "Interview session with Kathryn Murphy",
        time: "02:00 - 05:00 AM",
        day: 24,
        month: selectedMonth,
        year: selectedYear,
        category: "Interview Schedule",
        categoryId: 1,
        startHour: 2,
        endHour: 5,
        participants: 2,
      },
      {
        id: 2,
        title: "Interview session",
        time: "08:00 - 09:00 AM",
        day: 24,
        month: selectedMonth,
        year: selectedYear,
        category: "Interview Schedule",
        categoryId: 1,
        startHour: 8,
        endHour: 9,
      },
      {
        id: 3,
        title: "Meeting with staff",
        time: "09:00 - 10:00 AM",
        day: 26,
        month: selectedMonth,
        year: selectedYear,
        category: "Internal Meeting",
        categoryId: 2,
        startHour: 9,
        endHour: 10,
      },
      {
        id: 4,
        title: "Team Planning",
        time: "02:00 - 03:00 PM",
        day: 25,
        month: selectedMonth,
        year: selectedYear,
        category: "Team Schedule",
        categoryId: 3,
        startHour: 14,
        endHour: 15,
      },
      {
        id: 5,
        title: "Review Task",
        time: "11:00 - 12:00 AM",
        day: 23,
        month: selectedMonth,
        year: selectedYear,
        category: "My Task",
        categoryId: 4,
        startHour: 11,
        endHour: 12,
      },
    ];
  };

  const events = generateEvents();

  // Toggle category visibility
  const toggleCategory = (id) => {
    setCategories(
      categories.map((cat) =>
        cat.id === id ? { ...cat, checked: !cat.checked } : cat
      )
    );
  };

  // Get the background color based on event category
  const getCategoryColor = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    switch (category?.color) {
      case "blue":
        return "bg-blue-500 text-white";
      case "green":
        return "bg-green-500 text-white";
      case "purple":
        return "bg-purple-500 text-white";
      case "yellow":
        return "bg-yellow-500 text-white";
      case "red":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  // Filter events based on visible categories
  const visibleEvents = events.filter((event) => {
    const category = categories.find((cat) => cat.id === event.categoryId);
    return category?.checked;
  });

  // Navigate to previous month/week
  const goToPrevious = () => {
    if (activeView === "month") {
      if (selectedMonth === 0) {
        setSelectedYear(selectedYear - 1);
        setSelectedMonth(11);
      } else {
        setSelectedMonth(selectedMonth - 1);
      }
    } else if (activeView === "week") {
      // Move back one week
      const newDate = new Date(selectedYear, selectedMonth, selectedDate - 7);
      setSelectedYear(newDate.getFullYear());
      setSelectedMonth(newDate.getMonth());
      setSelectedDate(newDate.getDate());
    } else if (activeView === "day") {
      // Move back one day
      const newDate = new Date(selectedYear, selectedMonth, selectedDate - 1);
      setSelectedYear(newDate.getFullYear());
      setSelectedMonth(newDate.getMonth());
      setSelectedDate(newDate.getDate());
    }
  };

  // Navigate to next month/week
  const goToNext = () => {
    if (activeView === "month") {
      if (selectedMonth === 11) {
        setSelectedYear(selectedYear + 1);
        setSelectedMonth(0);
      } else {
        setSelectedMonth(selectedMonth + 1);
      }
    } else if (activeView === "week") {
      // Move forward one week
      const newDate = new Date(selectedYear, selectedMonth, selectedDate + 7);
      setSelectedYear(newDate.getFullYear());
      setSelectedMonth(newDate.getMonth());
      setSelectedDate(newDate.getDate());
    } else if (activeView === "day") {
      // Move forward one day
      const newDate = new Date(selectedYear, selectedMonth, selectedDate + 1);
      setSelectedYear(newDate.getFullYear());
      setSelectedMonth(newDate.getMonth());
      setSelectedDate(newDate.getDate());
    }
  };

  // Handle calendar day selection
  const handleDaySelect = (day, month) => {
    if (month === "prev") {
      // Go to previous month and select the day
      goToPrevious();
      setSelectedDate(day);
    } else if (month === "next") {
      // Go to next month and select the day
      goToNext();
      setSelectedDate(day);
    } else {
      setSelectedDate(day);
    }
  };

  // Handle Today button click
  const goToToday = () => {
    setSelectedYear(currentYear);
    setSelectedMonth(currentMonth);
    setSelectedDate(currentDay);
  };

  // Get month name from month number
  const getMonthName = (monthNum) => {
    const months = [
      "JANUARY",
      "FEBRUARY",
      "MARCH",
      "APRIL",
      "MAY",
      "JUNE",
      "JULY",
      "AUGUST",
      "SEPTEMBER",
      "OCTOBER",
      "NOVEMBER",
      "DECEMBER",
    ];
    return months[monthNum];
  };

  // Render Day View
  const renderDayView = () => (
    <div className="flex-1 overflow-y-auto">
      <div className="p-4 text-lg font-medium text-center border-b border-gray-200">
        {getMonthName(selectedMonth)} {selectedDate}, {selectedYear}
      </div>

      <div className="divide-y divide-gray-200">
        {timeSlots.map((time, index) => {
          const hourEvents = visibleEvents.filter(
            (event) =>
              event.day === selectedDate &&
              event.month === selectedMonth &&
              event.year === selectedYear &&
              index >= event.startHour &&
              index < event.endHour
          );

          return (
            <div key={index} className="flex">
              <div className="w-16 py-6 text-right pr-3 text-xs text-gray-500 border-r border-gray-200">
                {time}
              </div>
              <div className="flex-1 min-h-16 relative">
                {hourEvents.map((event) => (
                  <div
                    key={event.id}
                    className={`m-1 p-2 rounded ${getCategoryColor(
                      event.categoryId
                    )}`}
                  >
                    <div className="font-medium">{event.title}</div>
                    <div className="text-xs">{event.time}</div>
                    {event.participants && (
                      <div className="mt-2 flex">
                        <div className="bg-white w-6 h-6 rounded-full border-2 border-blue-500"></div>
                        <div className="bg-white w-6 h-6 rounded-full border-2 border-blue-500 -ml-2"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  // Render Week View
  const renderWeekView = () => (
    <div className="flex-1">
      {/* Week Days Header */}
      <div className="grid grid-cols-7 border-b border-gray-200">
        {daysOfWeek.map((day, index) => (
          <div
            key={index}
            className={`border-r border-gray-200 ${
              day.holiday ? "bg-red-50" : ""
            }`}
          >
            <div className="py-2 text-center text-sm text-gray-600">
              {day.shortName}
            </div>
            <div className="pb-3 text-center">
              <button
                className={`w-8 h-8 rounded-full flex items-center justify-center text-lg 
                  ${
                    day.date === selectedDate &&
                    day.month === selectedMonth &&
                    day.year === selectedYear
                      ? "bg-blue-500 text-white"
                      : "text-gray-800"
                  }
                `}
                onClick={() => {
                  setSelectedDate(day.date);
                  setSelectedMonth(day.month);
                  setSelectedYear(day.year);
                }}
              >
                {day.date}
              </button>
            </div>
            {day.holiday && (
              <div className="bg-red-400 text-white text-xs text-center py-1">
                Holiday
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Time Grid */}
      <div
        className="relative overflow-y-auto"
        style={{ height: "calc(100vh - 200px)" }}
      >
        {/* Time Labels */}
        <div className="grid grid-cols-7">
          <div className="border-r border-gray-200 text-right pr-2 text-xs text-gray-500">
            <div className="py-1">GMT -07</div>
          </div>
          <div className="col-span-6"></div>
        </div>

        {/* Time Slots */}
        {timeSlots.slice(0, 12).map((time, timeIndex) => (
          <div
            key={timeIndex}
            className="grid grid-cols-7 border-t border-gray-200"
          >
            <div className="border-r border-gray-200 text-right pr-2 text-xs text-gray-500 py-6">
              {time}
            </div>

            {/* Day Columns */}
            {daysOfWeek.map((day, dayIndex) => {
              const isHoliday = day.holiday;

              return (
                <div
                  key={dayIndex}
                  className={`border-r border-gray-200 relative ${
                    isHoliday ? "bg-red-50" : ""
                  }`}
                >
                  {/* Events */}
                  {visibleEvents
                    .filter(
                      (event) =>
                        event.day === day.date &&
                        event.month === day.month &&
                        event.year === day.year &&
                        event.startHour === timeIndex
                    )
                    .map((event) => (
                      <div
                        key={event.id}
                        className={`absolute left-0 right-0 mx-1 rounded p-2 ${getCategoryColor(
                          event.categoryId
                        )}`}
                        style={{
                          top: "0",
                          height: `${(event.endHour - event.startHour) * 48}px`,
                        }}
                      >
                        <div className="text-sm font-medium">{event.title}</div>
                        <div className="text-xs">{event.time}</div>
                        {event.participants && (
                          <div className="mt-2 flex">
                            <div className="bg-white w-6 h-6 rounded-full border-2 border-blue-500"></div>
                            <div className="bg-white w-6 h-6 rounded-full border-2 border-blue-500 -ml-2"></div>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );

  // Render Month View
  const renderMonthView = () => {
    return (
      <div className="flex-1">
        <div className="grid grid-cols-7 text-center border-b border-gray-200">
          <div className="py-2 text-sm text-gray-600">SUN</div>
          <div className="py-2 text-sm text-gray-600">MON</div>
          <div className="py-2 text-sm text-gray-600">TUE</div>
          <div className="py-2 text-sm text-gray-600">WED</div>
          <div className="py-2 text-sm text-gray-600">THU</div>
          <div className="py-2 text-sm text-gray-600">FRI</div>
          <div className="py-2 text-sm text-gray-600">SAT</div>
        </div>

        <div className="grid grid-cols-7">
          {daysInMonth.map((day, index) => {
            const dayDate = day.day;
            const dayMonth =
              day.month === "current"
                ? selectedMonth
                : day.month === "prev"
                ? selectedMonth === 0
                  ? 11
                  : selectedMonth - 1
                : selectedMonth === 11
                ? 0
                : selectedMonth + 1;

            const dayYear =
              day.month === "current"
                ? selectedYear
                : day.month === "prev" && selectedMonth === 0
                ? selectedYear - 1
                : day.month === "next" && selectedMonth === 11
                ? selectedYear + 1
                : selectedYear;

            const dayEvents = visibleEvents.filter(
              (event) =>
                event.day === dayDate &&
                event.month === dayMonth &&
                event.year === dayYear
            );

            const isSelected =
              dayDate === selectedDate &&
              dayMonth === selectedMonth &&
              dayYear === selectedYear;

            const isHoliday = dayDate === 27 && dayMonth === selectedMonth;
            const isCurrentMonth = day.month === "current";

            return (
              <div
                key={index}
                className={`border-r border-b border-gray-200 h-32 p-1 
                  ${isHoliday ? "bg-red-50" : ""}
                  ${!isCurrentMonth ? "bg-gray-50" : ""}
                `}
              >
                <div className="flex justify-end">
                  <button
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-sm 
                      ${
                        isSelected
                          ? "bg-blue-500 text-white"
                          : isCurrentMonth
                          ? "text-gray-800"
                          : "text-gray-400"
                      }
                    `}
                    onClick={() => handleDaySelect(dayDate, day.month)}
                  >
                    {dayDate}
                  </button>
                </div>

                {/* Events for this day */}
                <div className="mt-1">
                  {dayEvents.map((event) => (
                    <div
                      key={event.id}
                      className={`mb-1 p-1 text-xs rounded ${getCategoryColor(
                        event.categoryId
                      )}`}
                    >
                      <p className="truncate">{event.title}</p>
                    </div>
                  ))}
                </div>

                {isHoliday && (
                  <div className="bg-red-400 text-white text-xs text-center mt-1 py-1">
                    Holiday
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-row flex-grow">
        <div className="h-screen sticky top-0 ">
          <Sidebar />
        </div>
        <div className="flex-grow transition-all">
          <Header />
          <div className="">
            <div className="flex flex-col border border-gray-200 rounded-lg">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-gray-200 p-4">
                <div className="flex items-center space-x-4">
                  <h1 className="text-2xl font-semibold text-gray-800">
                    My Schedule
                  </h1>
                  <button
                    className="bg-blue-500 text-white px-4 py-1 text-sm rounded-md"
                    onClick={goToToday}
                  >
                    Today
                  </button>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    className="p-1 text-gray-500 hover:text-gray-700"
                    onClick={goToPrevious}
                  >
                    <ChevronLeftIcon className="w-5 h-5" />
                  </button>

                  <span className="mx-2 text-gray-800 font-medium">
                    {getMonthName(selectedMonth)} {selectedYear}
                  </span>

                  <button
                    className="p-1 text-gray-500 hover:text-gray-700"
                    onClick={goToNext}
                  >
                    <ChevronRightIcon className="w-5 h-5" />
                  </button>

                  <div className="ml-10 flex space-x-6">
                    <button
                      className={`px-4 py-2 ${
                        activeView === "day"
                          ? "text-blue-500 border-b-2 border-blue-500"
                          : "text-gray-500"
                      }`}
                      onClick={() => setActiveView("day")}
                    >
                      Day
                    </button>
                    <button
                      className={`px-4 py-2 ${
                        activeView === "week"
                          ? "text-blue-500 border-b-2 border-blue-500"
                          : "text-gray-500"
                      }`}
                      onClick={() => setActiveView("week")}
                    >
                      Week
                    </button>
                    <button
                      className={`px-4 py-2 ${
                        activeView === "month"
                          ? "text-blue-500 border-b-2 border-blue-500"
                          : "text-gray-500"
                      }`}
                      onClick={() => setActiveView("month")}
                    >
                      Month
                    </button>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div
                className="flex flex-row"
                style={{ height: "calc(100vh - 80px)" }}
              >
                {/* Left Sidebar */}
                <div className="w-64 border-r border-gray-200 overflow-y-auto">
                  {/* Create Event Button */}
                  <div className="p-4">
                    <button className="w-full py-3 border border-gray-300 rounded-md flex items-center justify-center text-blue-500 font-medium">
                      <PlusIcon className="w-4 h-4 mr-2" />
                      Create Event
                    </button>
                  </div>

                  {/* Mini Calendar */}
                  <div className="p-4 border-t border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium">
                        {getMonthName(selectedMonth)} {selectedYear}
                      </h3>
                      <div className="flex space-x-2">
                        <button
                          className="text-gray-500"
                          onClick={goToPrevious}
                        >
                          <ChevronLeftIcon className="w-4 h-4" />
                        </button>
                        <button className="text-gray-500" onClick={goToNext}>
                          <ChevronRightIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-7 gap-1 text-center">
                      <div className="text-xs text-gray-500 py-1">Sun</div>
                      <div className="text-xs text-gray-500 py-1">Mon</div>
                      <div className="text-xs text-gray-500 py-1">Tue</div>
                      <div className="text-xs text-gray-500 py-1">Wed</div>
                      <div className="text-xs text-gray-500 py-1">Thu</div>
                      <div className="text-xs text-gray-500 py-1">Fri</div>
                      <div className="text-xs text-gray-500 py-1">Sat</div>

                      {daysInMonth.map((day, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-center"
                        >
                          <button
                            className={`w-6 h-6 rounded-full text-xs flex items-center justify-center
                      ${
                        day.month !== "current"
                          ? "text-gray-400"
                          : "text-gray-700"
                      }
                      ${
                        day.day === selectedDate && day.month === "current"
                          ? "bg-blue-500 text-white"
                          : ""
                      }
                    `}
                            onClick={() => handleDaySelect(day.day, day.month)}
                          >
                            {day.day}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Categories */}
                  <div className="p-4 border-t border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium">Categories</h3>
                      <button className="text-blue-500 flex items-center">
                        <PlusIcon className="w-4 h-4 mr-1" />
                        Add Category
                      </button>
                    </div>

                    <div className="space-y-3">
                      {categories.map((category) => (
                        <div key={category.id} className="flex items-center">
                          <button
                            className={`w-5 h-5 rounded border flex items-center justify-center ${
                              category.checked
                                ? category.color === "blue"
                                  ? "bg-blue-500 border-blue-600"
                                  : category.color === "green"
                                  ? "bg-green-500 border-green-600"
                                  : category.color === "purple"
                                  ? "bg-purple-500 border-purple-600"
                                  : category.color === "yellow"
                                  ? "bg-yellow-500 border-yellow-600"
                                  : "bg-red-500 border-red-600"
                                : "border-gray-300"
                            }`}
                            onClick={() => toggleCategory(category.id)}
                          >
                            {category.checked && (
                              <CheckIcon className="w-3 h-3 text-white" />
                            )}
                          </button>
                          <span className="ml-2 text-sm text-gray-700">
                            {category.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Main Calendar View - Changes based on activeView */}
                {activeView === "day" && renderDayView()}
                {activeView === "week" && renderWeekView()}
                {activeView === "month" && renderMonthView()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
