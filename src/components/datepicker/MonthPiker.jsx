import React, { Component } from "react";
import './datepicker.css';
import { FaCalendarAlt } from "react-icons/fa";

const months= [
'Janvier', 'Février', 'Mars', 'Avril',
'Mai', 'Juin', 'Juillet', 'Août',
'Septembre', 'Octobre', 'Novembre', 'Décembre'
]
class MonthPikers extends Component {
    constructor(props) {
        super(props);
        const today = new Date();
        this.state = {
            selectedMonth: today.getMonth(),
            monthName: months[today.getMonth()],
            isMonthSelectorOpen: false,
        };
    }
    componentDidMount() {
        document.addEventListener('click', this.handleDocumentClick);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleDocumentClick);
    }

    monthPickerRef = React.createRef();

    handleDocumentClick = (e) => {
        if (this.monthPickerRef.current && !this.monthPickerRef.current.contains(e.target)) {
            this.setState({ isMonthSelectorOpen: false });
        }
    }

    handleInputFocus = () => {
        const { isMonthSelectorOpen } = this.state;
        this.setState({ isMonthSelectorOpen: !isMonthSelectorOpen });
    }

    selectMonth = (month) => {
        this.setState({
            monthName: months[month],
            selectedMonth: month,
            isMonthSelectorOpen: false,
        });
    }
    renderMonthSelector() {
        const { selectedMonth } = this.state;
        const activeMonth = selectedMonth;
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
        <div className="month-selector" style={{display:'flex', flexWrap:'wrap'}}>
            {monthOptions}
        </div>
        );
    }
    render() {
        const {
            monthName,
            isMonthSelectorOpen,
        } = this.state;
        return (
            <div className="datepicker-input"
                ref={this.monthPickerRef}
            >
                <div className="inputdate">
                    <input
                        type="text"
                        value={monthName}
                        onFocus={this.handleInputFocus}
                        readOnly
                        style={{paddingLeft:15}}
                    />
                    <FaCalendarAlt size={20} />
                </div>
                <div style={{
                    width: 'calc(100% - 20px)',
                    maxHeight: 200,
                    boxShadow:'2px 2px 6px black',
                    padding: 10,
                    borderRadius:10,
                    display:isMonthSelectorOpen ? 'block' : 'none',
                }}>
                    { isMonthSelectorOpen && this.renderMonthSelector() }
                </div>
            </div>
        )
    }
}
export default MonthPikers;