export const MY_DATE_FORMATS = {
    display: {
      dateInput: 'DD-MMM-yyyy',
      monthYearLabel: 'DD-MMM-yyyy',
      dateA11yLabel: 'DD-MMM-yyyy',
      monthYearA11yLabel: 'DD-MMM-yyyy',
    },
  };

export function fixDate(year: number, month:number, day:number){
    month += 1;
    return `${year}-${CompareDate(month)}-${CompareDate(day)}`;
}

function CompareDate(number: number):string{
    return (number <= 9) ? `0${number}`:`${number}`;
}
