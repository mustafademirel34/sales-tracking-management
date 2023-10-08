import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {
  constructor(private datePipe: DatePipe) { }
  
  transform(value: any, format: string): string {
    if (value == null) {
      return '';
    }
  
    const date = new Date(value);
  
    let formattedDate = '';

      
    if (format.includes('EEEE')) {
      const weekday = this.getWeekday(date.getDay());
      formattedDate += weekday + ' ' + "* ";
    }
  
    if (format.includes('dd')) {
      const day = date.getDate();
      formattedDate += day.toString().padStart(2, '0') + ' ';
    }

    if (format.includes('MM')) {
      const month = date.getMonth() + 1;
      formattedDate += this.getMonthName(month) + ' ';
    }
    
    if (format.includes('EEEE')) {
      const year = date.getFullYear();
      formattedDate += year.toString() + ' ';
    }

    return formattedDate.trim();
  }
  
  getWeekday(day: number): string {
    const weekdays = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
    return weekdays[day];
  }

  getMonthName(month: number): string {
    const monthNames = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
    return monthNames[month - 1];
  }
  
}