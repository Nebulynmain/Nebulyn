import React, { useState, useEffect } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
  CheckIcon,
  X as XIcon,
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

  // Add new state for category modal
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: "",
    color: "blue",
  });

  // Add new state for modal and form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    startDate: "",
    startTime: "09:00",
    endTime: "10:00",
    categoryId: 1,
  });

  // Available colors for categories
  const availableColors = [
    { name: "Blue", value: "blue" },
    { name: "Green", value: "green" },
    { name: "Purple", value: "purple" },
    { name: "Yellow", value: "yellow" },
    { name: "Red", value: "red" },
  ];

  // Handle category form input changes
  const handleCategoryInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle category form submission
  const handleCategorySubmit = (e) => {
    e.preventDefault();

    const newCategoryObj = {
      id: categories.length + 1,
      name: newCategory.name,
      color: newCategory.color,
      checked: true,
    };

    // Add new category to categories array
    setCategories([...categories, newCategoryObj]);

    // Reset form and close modal
    setNewCategory({
      name: "",
      color: "blue",
    });
    setIsCategoryModalOpen(false);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Interview session with Kathryn Murphy",
      time: "02:00 - 05:00 AM",
      day: 24,
      month: 10,
      year: 2021,
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
      month: 10,
      year: 2021,
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
      month: 10,
      year: 2021,
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
      month: 10,
      year: 2021,
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
      month: 10,
      year: 2021,
      category: "My Task",
      categoryId: 4,
      startHour: 11,
      endHour: 12,
    },
  ]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert times to hours for event creation
    const startHour = parseInt(newEvent.startTime.split(":")[0]);
    const endHour = parseInt(newEvent.endTime.split(":")[0]);

    const [year, month, day] = newEvent.startDate.split("-");

    const newEventObj = {
      id: events.length + 1,
      title: newEvent.title,
      time: `${newEvent.startTime} - ${newEvent.endTime}`,
      day: parseInt(day),
      month: parseInt(month) - 1,
      year: parseInt(year),
      category: categories.find(
        (cat) => cat.id === parseInt(newEvent.categoryId)
      )?.name,
      categoryId: parseInt(newEvent.categoryId),
      startHour,
      endHour,
    };

    // Add new event to events array
    setEvents([...events, newEventObj]);

    // Reset form and close modal
    setNewEvent({
      title: "",
      startDate: "",
      startTime: "09:00",
      endTime: "10:00",
      categoryId: 1,
    });
    setIsModalOpen(false);
  };

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
      <div className="p-2 text-md font-medium text-center border-b border-gray-200">
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
              <div className="w-12 py-4 text-right pr-2 text-xs text-gray-500 border-r border-gray-200">
                {time}
              </div>
              <div className="flex-1 min-h-12 relative">
                {hourEvents.map((event) => (
                  <div
                    key={event.id}
                    className={`m-1 p-1 rounded text-xs ${getCategoryColor(
                      event.categoryId
                    )}`}
                  >
                    <div className="font-medium truncate">{event.title}</div>
                    <div className="text-xxs">{event.time}</div>
                    {event.participants && (
                      <div className="mt-1 flex">
                        <div className="bg-white w-4 h-4 rounded-full border border-blue-500"></div>
                        <div className="bg-white w-4 h-4 rounded-full border border-blue-500 -ml-1"></div>
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
            <div className="py-1 text-center text-xs text-gray-600">
              {day.shortName}
            </div>
            <div className="pb-1 text-center">
              <button
                className={`w-6 h-6 rounded-full flex items-center justify-center text-sm 
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
              <div className="bg-red-400 text-white text-xxs text-center py-0.5">
                Holiday
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Time Grid */}
      <div
        className="relative overflow-y-auto"
        style={{ height: "calc(100vh - 150px)" }}
      >
        {/* Time Labels */}
        <div className="grid grid-cols-7">
          <div className="border-r border-gray-200 text-right pr-1 text-xxs text-gray-500">
            <div className="py-0.5">GMT -07</div>
          </div>
          <div className="col-span-6"></div>
        </div>

        {/* Time Slots */}
        {timeSlots.slice(0, 12).map((time, timeIndex) => (
          <div
            key={timeIndex}
            className="grid grid-cols-7 border-t border-gray-200"
          >
            <div className="border-r border-gray-200 text-right pr-1 text-xxs text-gray-500 py-4">
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
                        className={`absolute left-0 right-0 mx-0.5 rounded p-1 text-xs ${getCategoryColor(
                          event.categoryId
                        )}`}
                        style={{
                          top: "0",
                          height: `${(event.endHour - event.startHour) * 36}px`,
                        }}
                      >
                        <div className="font-medium truncate">
                          {event.title}
                        </div>
                        <div className="text-xxs">{event.time}</div>
                        {event.participants && (
                          <div className="mt-1 flex">
                            <div className="bg-white w-4 h-4 rounded-full border border-blue-500"></div>
                            <div className="bg-white w-4 h-4 rounded-full border border-blue-500 -ml-1"></div>
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
          <div className="py-1 text-xs text-gray-600">SUN</div>
          <div className="py-1 text-xs text-gray-600">MON</div>
          <div className="py-1 text-xs text-gray-600">TUE</div>
          <div className="py-1 text-xs text-gray-600">WED</div>
          <div className="py-1 text-xs text-gray-600">THU</div>
          <div className="py-1 text-xs text-gray-600">FRI</div>
          <div className="py-1 text-xs text-gray-600">SAT</div>
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
                className={`border-r border-b border-gray-200 h-24 p-0.5 
                  ${isHoliday ? "bg-red-50" : ""}
                  ${!isCurrentMonth ? "bg-gray-50" : ""}
                `}
              >
                <div className="flex justify-end">
                  <button
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-xs 
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
                <div className="mt-0.5">
                  {dayEvents.map((event) => (
                    <div
                      key={event.id}
                      className={`mb-0.5 p-0.5 text-xxs rounded ${getCategoryColor(
                        event.categoryId
                      )}`}
                    >
                      <p className="truncate">{event.title}</p>
                    </div>
                  ))}
                </div>

                {isHoliday && (
                  <div className="bg-red-400 text-white text-xxs text-center mt-0.5 py-0.5">
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
        <div className="h-screen sticky top-0">
          <Sidebar />
        </div>
        <div className="flex-grow transition-all">
          <Header />
          <div className="">
            <div className="flex flex-col border border-gray-200 rounded-lg">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-gray-200 p-2">
                <div className="flex items-center space-x-2">
                  <h1 className="text-xl font-semibold text-gray-800">
                    My Schedule
                  </h1>
                  <button
                    className="bg-blue-500 text-white px-3 py-0.5 text-xs rounded cursor-pointer"
                    onClick={goToToday}
                  >
                    Today
                  </button>
                </div>

                <div className="flex items-center space-x-1">
                  <button
                    className="p-0.5 text-gray-500 hover:text-gray-700 cursor-pointer"
                    onClick={goToPrevious}
                  >
                    <ChevronLeftIcon className="w-4 h-4" />
                  </button>

                  <span className="mx-1 text-sm font-medium text-gray-800">
                    {getMonthName(selectedMonth)} {selectedYear}
                  </span>

                  <button
                    className="p-0.5 text-gray-500 hover:text-gray-700 cursor-pointer"
                    onClick={goToNext}
                  >
                    <ChevronRightIcon className="w-4 h-4" />
                  </button>

                  <div className="ml-6 flex space-x-3">
                    <button
                      className={`px-2 py-1 text-xs cursor-pointer ${
                        activeView === "day"
                          ? "text-blue-500 border-b-2 border-blue-500"
                          : "text-gray-500"
                      }`}
                      onClick={() => setActiveView("day")}
                    >
                      Day
                    </button>
                    <button
                      className={`px-2 py-1 text-xs cursor-pointer ${
                        activeView === "week"
                          ? "text-blue-500 border-b-2 border-blue-500"
                          : "text-gray-500"
                      }`}
                      onClick={() => setActiveView("week")}
                    >
                      Week
                    </button>
                    <button
                      className={`px-2 py-1 text-xs cursor-pointer ${
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
                style={{ height: "calc(100vh - 70px)" }}
              >
                {/* Left Sidebar */}
                <div className="w-56 border-r border-gray-200 overflow-y-auto">
                  {/* Create Event Button */}
                  <div className="p-2">
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="w-full py-2 border border-gray-300 rounded flex items-center justify-center text-blue-500 text-xs font-medium cursor-pointer"
                    >
                      <PlusIcon className="w-3 h-3 mr-1" />
                      Create Event
                    </button>
                  </div>

                  {/* Mini Calendar */}
                  <div className="p-2 border-t border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium">
                        {getMonthName(selectedMonth)} {selectedYear}
                      </h3>
                      <div className="flex space-x-1">
                        <button
                          className="text-gray-500 cursor-pointer"
                          onClick={goToPrevious}
                        >
                          <ChevronLeftIcon className="w-3 h-3" />
                        </button>
                        <button
                          className="text-gray-500 cursor-pointer"
                          onClick={goToNext}
                        >
                          <ChevronRightIcon className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-7 gap-0.5 text-center">
                      <div className="text-xs text-gray-500 py-0.5">Sun</div>
                      <div className="text-xs text-gray-500 py-0.5">Mon</div>
                      <div className="text-xs text-gray-500 py-0.5">Tue</div>
                      <div className="text-xs text-gray-500 py-0.5">Wed</div>
                      <div className="text-xs text-gray-500 py-0.5">Thu</div>
                      <div className="text-xs text-gray-500 py-0.5">Fri</div>
                      <div className="text-xs text-gray-500 py-0.5">Sat</div>

                      {daysInMonth.map((day, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-center"
                        >
                          <button
                            className={`w-5 h-5 rounded-full text-xs flex items-center justify-center cursor-pointer
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
                  <div className="p-2 border-t border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium">Categories</h3>
                      <button
                        className="text-blue-500 flex items-center text-xs cursor-pointer"
                        onClick={() => setIsCategoryModalOpen(true)}
                      >
                        <PlusIcon className="w-3 h-3 mr-0.5" />
                        Add Category
                      </button>
                    </div>

                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div key={category.id} className="flex items-center">
                          <button
                            className={`w-4 h-4 rounded border flex items-center justify-center cursor-pointer ${
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
                              <CheckIcon className="w-2 h-2 text-white" />
                            )}
                          </button>
                          <span className="ml-1 text-xs text-gray-700">
                            {category.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Main Calendar View */}
                {activeView === "day" && renderDayView()}
                {activeView === "week" && renderWeekView()}
                {activeView === "month" && renderMonthView()}

                {/* Create Event Modal */}
                {isModalOpen && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded p-4 w-full max-w-sm">
                      <div className="flex justify-between items-center mb-2">
                        <h2 className="text-lg font-semibold">
                          Create New Event
                        </h2>
                        <button
                          onClick={() => setIsModalOpen(false)}
                          className="text-gray-500 hover:text-gray-700 cursor-pointer"
                        >
                          <XIcon className="w-4 h-4" />
                        </button>
                      </div>

                      <form onSubmit={handleSubmit}>
                        <div className="space-y-2">
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-0.5">
                              Event Title
                            </label>
                            <input
                              type="text"
                              name="title"
                              value={newEvent.title}
                              onChange={handleInputChange}
                              className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-0.5">
                              Date
                            </label>
                            <input
                              type="date"
                              name="startDate"
                              value={newEvent.startDate}
                              onChange={handleInputChange}
                              className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                              required
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-0.5">
                                Start Time
                              </label>
                              <input
                                type="time"
                                name="startTime"
                                value={newEvent.startTime}
                                onChange={handleInputChange}
                                className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-0.5">
                                End Time
                              </label>
                              <input
                                type="time"
                                name="endTime"
                                value={newEvent.endTime}
                                onChange={handleInputChange}
                                className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                required
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-0.5">
                              Category
                            </label>
                            <select
                              name="categoryId"
                              value={newEvent.categoryId}
                              onChange={handleInputChange}
                              className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
                            >
                              {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                  {category.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="mt-4 flex justify-end space-x-2">
                          <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="px-3 py-1 text-xs text-gray-700 hover:text-gray-900 cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-3 py-1 text-xs text-white bg-blue-500 rounded hover:bg-blue-600 cursor-pointer"
                          >
                            Create Event
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}

                {/* Create Category Modal */}
                {isCategoryModalOpen && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded p-4 w-full max-w-sm">
                      <div className="flex justify-between items-center mb-2">
                        <h2 className="text-lg font-semibold">
                          Create New Category
                        </h2>
                        <button
                          onClick={() => setIsCategoryModalOpen(false)}
                          className="text-gray-500 hover:text-gray-700 cursor-pointer"
                        >
                          <XIcon className="w-4 h-4" />
                        </button>
                      </div>

                      <form onSubmit={handleCategorySubmit}>
                        <div className="space-y-2">
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-0.5">
                              Category Name
                            </label>
                            <input
                              type="text"
                              name="name"
                              value={newCategory.name}
                              onChange={handleCategoryInputChange}
                              className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-0.5">
                              Color
                            </label>
                            <select
                              name="color"
                              value={newCategory.color}
                              onChange={handleCategoryInputChange}
                              className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
                            >
                              {availableColors.map((color) => (
                                <option key={color.value} value={color.value}>
                                  {color.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="mt-4 flex justify-end space-x-2">
                          <button
                            type="button"
                            onClick={() => setIsCategoryModalOpen(false)}
                            className="px-3 py-1 text-xs text-gray-700 hover:text-gray-900 cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-3 py-1 text-xs text-white bg-blue-500 rounded hover:bg-blue-600 cursor-pointer"
                          >
                            Create Category
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
