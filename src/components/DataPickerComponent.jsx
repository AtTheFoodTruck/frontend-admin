import { useEffect } from "react";

const DatePickerComponent = ({
  setSearchDateString,
  setSelectedEndDateString,
  isRangeSearch,
}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const dateToString = (date) => {
    return (
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      date.getDate().toString().padStart(2, "0")
    );
  };
  const ExampleCustomInput = ({ value, onClick }) => (
    <button className="example-custom-input" onClick={onClick}>
      {value}
      {isCalendarOpen ? <h4>icon</h4> : <h4>icon</h4>}
    </button>
  );

  useEffect(() => {
    setSearchDateString(dateToString(startDate));
    setSelectedEndDateString(dateToString(endDate));
  }, [startDate, endDate]);

  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      customInput={<ExampleCustomInput />}
    />
  );
};

export default DatePickerComponent;
