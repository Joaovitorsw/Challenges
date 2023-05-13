import { Component, Input } from "@angular/core";
import { People } from "../app.component";

@Component({
  selector: "birthday-records",
  templateUrl: "./birthdayRecords.component.html",
  styleUrls: ["./birthdayRecords.component.scss"],
})
export class BirthdayRecords {
  sort: string = "";
  @Input() peopleList: People[];

  sortPeople() {
    this.peopleList.sort((a, b) => {
      if (this.sort == "name") {
        return a.name.localeCompare(b.name);
      }
      if (this.sort == "age") {
        return new Date(a.birth) > new Date(b.birth) ? 1 : -1;
      }
      return 0;
    });
  }
}
