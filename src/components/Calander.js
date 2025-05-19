import './Calander.css';
import React, { useState, useEffect } from 'react';
import Logo from '../assets/mylogo.png'; // Import my logo image;
import Holidays from '../assets/Holidays.json'; // Import the JSON file

const Calander = () => {

  const [currentDate, setCurrentDate] = useState(new Date());
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [startDay, setStartDay] = useState(0);
  const [selctedDate, setSelectedDate] = useState(null);
  
  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const date = new Date(year, month, 1);
    const days = [];

    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    setDaysInMonth(days);
    setStartDay(new Date(year, month, 1).getDay());
  }, [currentDate]);

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const prevMonth = () => {
    const prevDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    setCurrentDate(prevDate);
  }

  const nextMonth = () => {
    const nextDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    setCurrentDate(nextDate);
  }

    // This function will show the name of the festival when clicked on the date
  const showName = (event) => {
        const date = event.target.innerText;
        const month = currentDate.getMonth() + 1; // Months are zero-based in JavaScript
        const year = currentDate.getFullYear();
        const holiday = Holidays.find(holiday => {
            // Check if the date matches the holiday date
            const holidayDate = new Date(holiday.date);
            // Compare the date, month, and year
            return holidayDate.getDate() === parseInt(date) && holidayDate.getMonth() + 1 === month && holidayDate.getFullYear() === year;
        });
        // If a holiday is found, show its name in a particular div
        if (holiday) {
            const holidayName = holiday.name;
            const holidayText = document.querySelector('.holidaytext');
            holidayText.textContent = holidayName;
            // Set the text content to the holiday name
            holidayText.innerText = holidayName;
            // Set the holiday name to the text content



            holidayText.style.backgroundColor = 'black'; // Set background color to red
            holidayText.style.fontSize = '14px'; // Set font size
            holidayText.style.fontWeight = 'bold'; // Set font weight to bold
            holidayText.style.textAlign = 'center'; // Center the text
            holidayText.style.opacity = '0.8'; // Set opacity to 0.8
            holidayText.style.color = 'white'; // Set text color to white
            holidayText.style.padding = '5px'; // Add some padding
            holidayText.style.borderRadius = '5px'; // Add border radius
            holidayText.style.position = 'absolute'; // Set position to absolute
            holidayText.style.left = event.target.getBoundingClientRect().left + 'px'; // Position it above the clicked date
            // Set left position to the clicked date
            holidayText.style.display = 'block'; // Show the holiday name
    
            holidayText.style.zIndex = '5'; // Set z-index to 1
            holidayText.style.top = event.target.getBoundingClientRect().top + 'px'; // Position it above the clicked date
            setTimeout(() => {
                holidayText.style.display = 'none'; // Hide the holiday name after 2 seconds
            }, 2000);
        }
  }

  return (
    <div className='calander'>

        {/* Header with logo and month-year navigation buttons*/}
        <div className='calander__header'>
            
                <img src={Logo} className='calander__icon' alt=''/>
                <button  onClick = {prevMonth} className='calander__previous__button'>&lt;</button>
                <span className='calander__current__month'>{currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}</span>
                <button onClick = {nextMonth} className='calander__next__button'>&gt;</button>
            
        </div>

        {/* This will display the days of the month and show Sat/Sun in red color*/}
        <div className='calander__days'>

            {dayNames.map((day, index) => {

                // This will highlight Sunday and Saturday with different colors
               if (index === 0) {
                    return <div key={index} className='sunday'>{day}</div>;
                } else if (index === 6) {
                    return <div key={index} className='saturday'>{day}</div>;
                } else {
                    return <div key={index} className='calander__day'>{day}</div>;
                }
            })}

        </div>

        <div className='calander__dates'>
            {/* This will create empty divs for the days before the first day of the month */}
            {Array.from({ length: startDay }, (_, index) => (
                <div key={index} className='calander__empty__date'></div>
            ))}
            {/* This will create a grid for the days of the month */}
            {daysInMonth.map((date, index) => {
                // Highlight the current date
                const isToday = date.getDate() === new Date().getDate() && date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear();
                if (isToday) {
                    return <div key={index} className='today'>{date.getDate()}</div>;
                }
                // Mark Satuday and Sunday with red colors
                const isWeekend = date.getDay() === 0 || date.getDay() === 6; // Sunday or Saturday
                if (isWeekend) {
                    return <div key={index} className='weekend'>{date.getDate()}</div>;
                }
                // Mark Holidays with red color
                const isHoliday = Holidays.some(holiday => {
                    const holidayDate = new Date(holiday.date);
                    return date.getDate() === holidayDate.getDate() && date.getMonth() === holidayDate.getMonth() && date.getFullYear() === holidayDate.getFullYear();
                });
                if (isHoliday) {
                    return <div key={index} className='holiday'>
                        <div className='holidaytext'>
                            {/* This will show the name of the festival when clicked on the date */}
                            <div className='holiday__name'>
                                {date.getDate()}
                                <div className='holiday__name__text' onClick={showName}>
                                    {Holidays.find(holiday => {
                                        const holidayDate = new Date(holiday.date);
                                        return date.getDate() === holidayDate.getDate() && date.getMonth() === holidayDate.getMonth() && date.getFullYear() === holidayDate.getFullYear();
                                    })?.name}
                                </div>
                            </div>
                        </div>            
                    
                    </div>;
                }

                // Highlight the selected date
                const isSelected = selctedDate && date.getDate() === selctedDate.getDate() && date.getMonth() === selctedDate.getMonth() && date.getFullYear() === selctedDate.getFullYear();
                return (
                    <div key={index} className={`calander__date ${isSelected ? 'selected' : ''}`} onClick={() => setSelectedDate(date)}>
                        {date.getDate()}
                    </div>
                );
            })}

        </div>
    </div>
  )
}

export default Calander;