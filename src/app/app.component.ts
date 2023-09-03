import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { mock } from './mock.data';
import { formatCurrentDateTime, formatWeekday } from './app.helper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  public isEditMode!: boolean; 
  public form!: FormGroup;
  public formArray: FormArray = new FormArray(mock.map(c => this.formGroupMapper(c)));
  public  dataSource = new MatTableDataSource<any>();//TODO: update type when interface is declared
  public  displayedColumns = ['currentDateTime', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']; 

  private _formBuilder: FormBuilder = inject(FormBuilder);
 
   ngOnInit(): void {
     this.isEditMode = false; 
     this.tableSetup()
     this.formSetup()
     }

     public editSwitcher(): void {
      this.isEditMode = !this.isEditMode;
      //TODO:  Log the respective changed cell index weekDay and time values when !this.isEditMode
    }
 
 
   formSetup(): void{
     this.form = this._formBuilder.group({
       element: this._formBuilder.array([]),
     });
     this.formArray.controls.forEach((abstractCtl: AbstractControl) => {
       (this.form.controls['element'] as FormArray).push(abstractCtl);
     });
   }

   /**
    * Building table's data and construct the layout based on supplied json
   */
   private tableSetup(){
     // display value map
      const dataMap: Record<string, Record<string, number>> = {};
      // process mock data from the provided JSON
      mock.forEach((item) => {
       //extract date time
       const dateTime = new Date(item.date_time);
      // extract formatted weekday
       const weekday = formatWeekday(dateTime.getDay());
       // extract formatted date time 
       const currentDateTime = formatCurrentDateTime(dateTime);
       //fallback for date time 
       if (!dataMap[currentDateTime]) {
            dataMap[currentDateTime] = {};
       }
       // populate the map
       dataMap[currentDateTime][weekday] = item.display_value;
     });
 
     // Construct data for the table
     const tableData = Object.keys(dataMap).map((currentDateTime) => ({
      currentDateTime,
       ...dataMap[currentDateTime],
     }));
 
     // assign constructed data to the mat-table data source
     this.dataSource.data = tableData;
     //log final dataSource shape  after transformation
     console.log(this.dataSource.data)
   }
 
   // Build formGroup to be consumed by formArray
   private formGroupMapper(data: {date_time: string, display_value: number}): FormGroup {
    return new FormGroup({
      date_time: new FormControl(data.date_time, Validators.required),
      display_value: new FormControl(data.display_value, Validators.required)
    });
  }
   
}
  