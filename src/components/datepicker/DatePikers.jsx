import React, { Component } from 'react';
import './datepicker.css';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { FaCalendarAlt } from 'react-icons/fa';

class DatePickerInput extends Component {
  constructor(props) {
    super(props);
    const today = this.props.date || new Date();
    this.state = {
      currentDate: today,
      selectedDate: today,
      isDatePickerOpen: false,
      isMonthSelectorOpen: false,
      monthSelectionMade: false,
      yearSelectionMade: false,
      isYearSelectorOpen: false,
      selectedYear: today.getFullYear(),
      calendarDays: [],
    };
  }

  componentDidMount() {
    document.addEventListener('click', this.handleDocumentClick);
    this.updateCalendarDays(this.state.selectedYear, this.state.currentDate.getMonth());
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentClick);
  }

  datePickerRef = React.createRef();

  generateCalendarDays(year, month) {
    const days = [];
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDay = firstDay.getDay();

    for (let i = 0; i < startDay; i++) {
      days.push(null); // Add null placeholders for empty days at the beginning of the month.
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i);
      days.push(date);
    }

    return days;
  }

  updateCalendarDays(year, month) {
    const calendarDays = this.generateCalendarDays(year, month);
    this.setState({ calendarDays });
  }

  handleDocumentClick = (e) => {
    if (this.datePickerRef.current && !this.datePickerRef.current.contains(e.target)) {
      if (!this.state.monthSelectionMade && !this.state.yearSelectionMade) {
        this.setState({ isDatePickerOpen: false });
      }
    }
  }

  handleInputFocus = () => {
    this.setState({ isDatePickerOpen: true, monthSelectionMade: false });
  }

  toggleMonthSelector = () => {
    this.setState((prevState) => ({
      isMonthSelectorOpen: !prevState.isMonthSelectorOpen,
    }));
  }

  selectMonth = (month) => {
    const { selectedYear } = this.state;
    this.updateCalendarDays(selectedYear, month);
    const newDate = new Date(selectedYear, month, 1);
    this.setState({
      currentDate: newDate,
      isMonthSelectorOpen: false,
      isDatePickerOpen: true,
      monthSelectionMade: true,
    });
  }

  handleDayClick = (day) => {
    this.setState({ selectedDate: day, isDatePickerOpen: false, monthSelectionMade: false });
    this.props.onDateChange(day);
  }

  prevMonth = () => {
    const { currentDate, selectedYear } = this.state;
    const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    this.updateCalendarDays(selectedYear, prevMonth.getMonth());
    this.setState({ currentDate: prevMonth });
  }

  nextMonth = () => {
    const { currentDate, selectedYear } = this.state;
    const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    this.updateCalendarDays(selectedYear, nextMonth.getMonth());
    this.setState({ currentDate: nextMonth });
  }

  toggleYearSelector = () => {
    this.setState((prevState) => ({
      isYearSelectorOpen: !prevState.isYearSelectorOpen,
    }));
  }

  selectYear = (year) => {
    this.setState({
      selectedYear: year,
      isYearSelectorOpen: false,
      isDatePickerOpen: true,
      yearSelectionMade: true,
    });

    this.updateCalendarDays(year, this.state.currentDate.getMonth()); // Mise à jour des jours du calendrier pour l'année sélectionnée
  }

  handleYearChange = (event) => {
    const selectedYear = parseInt(event.target.value, 10);
    this.setState({ selectedYear });
  }

  renderMonthSelector() {
    const months = [
      'Janvier', 'Février', 'Mars', 'Avril',
      'Mai', 'Juin', 'Juillet', 'Août',
      'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ];

    const { currentDate } = this.state;
    const activeMonth = currentDate.getMonth();
    const today = new Date();
    const currentMonth = today.getMonth();

    const monthOptions = months.map((month, i) => (
      <div
        key={i}
        className={`month-option ${i === activeMonth ? 'active-month' : ''} ${i === currentMonth ? 'current-month' : ''}`}
        onClick={() => this.selectMonth(i)}
      >
        {month}
      </div>
    ))

    return (
      <div className="month-selector">
        {monthOptions}
      </div>
    );
  }

  renderCalendarDays() {
    const { calendarDays, selectedDate } = this.state;
    const days = calendarDays.map((day, index) => {
      if (day === null) {
        return <div key={`empty-${index}`} className="empty-day" />;
      }

      const isToday = day.toDateString() === new Date().toDateString();
      const isSelected = selectedDate && day.toDateString() === selectedDate.toDateString();

      return (
        <div
          key={`day-${day.getDate()}`}
          className={`calendar-day ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}`}
          onClick={() => this.handleDayClick(day)}
        >
          {day.getDate()}
        </div>
      );
    });

    return days;
  }

  renderYearSelector() {
    const { selectedYear } = this.state;
    const years = [];
    const currentYear = new Date().getFullYear();
    const minYear = 1980;
    const maxYear = 2030;

    for (let i = minYear; i <= maxYear; i++) {
      const isCurrentYear = i === currentYear;
      const isSelectedYear = i === selectedYear;
      years.push(
        <div
          key={i}
          className={`year-option ${isCurrentYear ? 'current-year' : ''} ${isSelectedYear ? 'active-year' : ''}`}
          onClick={() => this.selectYear(i)}
        >
          {i}
        </div>
      );
    }

    const selectedYearIndex = selectedYear - minYear;
    const itemHeight = 40; // Hauteur d'un élément de la liste en pixels
    const scrollTop = selectedYearIndex * itemHeight;

    return (
      <div className="year-selector" style={{ scrollTop: scrollTop }}>
        {years}
      </div>
    );
  }
  
  render() {
    const {
      currentDate,
      selectedDate,
      selectedYear,
      isDatePickerOpen,
      isMonthSelectorOpen,
      isYearSelectorOpen,
    } = this.state;
    return (
      <div className="datepicker-input" ref={this.datePickerRef} style={{ marginBottom: 20 }}>
        <div className="inputdate">
          <input
            type="text"
            value={selectedDate.toLocaleDateString()}
            onFocus={this.handleInputFocus}
            readOnly
          />
          <div className='placeholder' style={{
            maxWidth: 'calc(100% - 120px)',
            overflow: 'hidden',
            color: '#000',
            whiteSpace: 'nowrap',
            textOverflow:'ellipsis',
          }}>{this.props.placeholder}</div>
          <FaCalendarAlt size={20} />
        </div>

        <div className="calendar" style={{ display: isDatePickerOpen ? 'block' : 'none' }}>
          <div className="calendar-header">
            {/* <button onClick={this.prevMonth}><MdKeyboardArrowLeft size={25} /></button> */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent:'space-around', width:'70%' }}>
              <div
                style={{
                  textTransform: 'capitalize',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  background: isMonthSelectorOpen ? '#ededed40' : '',
                }}
                className="btnmois"
                onClick={this.toggleMonthSelector}
              >
                {currentDate.toLocaleString('default', { month: 'long' })}
                {isMonthSelectorOpen ? (
                  <MdKeyboardArrowUp style={{ marginLeft: 4 }} color="white" size={22} />
                ) : (
                  <MdKeyboardArrowDown color="white" size={22} />
                )}
              </div>
              <div
                style={{
                  textTransform: 'capitalize',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  background: isYearSelectorOpen ? '#ededed40' : '',
                }}
                className="btnyear"
                onClick={this.toggleYearSelector}
              >
                {selectedYear}
                {isYearSelectorOpen ? (
                  <MdKeyboardArrowUp style={{ marginLeft: 4 }} color="white" size={22} />
                ) : (
                  <MdKeyboardArrowDown color="white" size={22} />
                )}
              </div>
            </div>
            {isYearSelectorOpen && this.renderYearSelector()}
            {isMonthSelectorOpen && this.renderMonthSelector()}
            {/* <button onClick={this.nextMonth}><MdKeyboardArrowRight size={25} /></button> */}
          </div>
          <div className="weekdays">
            <div className="weekday">D</div>
            <div className="weekday">L</div>
            <div className="weekday">M</div>
            <div className="weekday">M</div>
            <div className="weekday">J</div>
            <div className="weekday">V</div>
            <div className="weekday">S</div>
          </div>
          <div className="days">{this.renderCalendarDays()}</div>
        </div>
      </div>
    );
  }
}

export default DatePickerInput;
