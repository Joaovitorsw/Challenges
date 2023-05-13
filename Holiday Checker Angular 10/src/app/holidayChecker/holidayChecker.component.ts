import { HttpClient } from "@angular/common/http";
import { Component, Input } from "@angular/core";
import { Holiday } from "../app.component";
interface ApiResponse {
  date: string;
  time: string;
}

@Component({
  selector: "holiday-checker",
  templateUrl: "./holidayChecker.component.html",
  styleUrls: ["./holidayChecker.component.scss"],
})
export class HolidayChecker {
  @Input() holidayList: Holiday[];
  URL = `https://jsonmock.hackerrank.com/datetime`;
  request: DateTime;

  constructor(private http: HttpClient) {}

  getData() {
    this.http.get<DateTime>(this.URL).subscribe((value) => {
      this.request = value;
    });
  }

  getHolidayObject(data: DateTime) {
    return this.holidayList.find((holiday) => holiday.date == data?.date);
  }
}
export interface DateTime {
  date: string;
  time: string;
}
