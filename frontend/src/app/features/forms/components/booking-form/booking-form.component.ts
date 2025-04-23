import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { BookingState } from "../../../booking/store/booking.reducer";
import { saveUserBooking } from "../../../booking/store/booking.actions";

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class BookingFormComponent {

  private readonly _bookingStore: Store<BookingState> = inject(Store);

  readonly bookingForm: FormGroup = new FormGroup({
    'username': new FormControl({
      value: '',
      disabled: false
    }, {
      nonNullable: true,
      validators: [
        Validators.required
      ]
    }),
    'email': new FormControl({
      value: '',
      disabled: false
    }, {
      nonNullable: true,
      validators: [
        Validators.email,
        Validators.required
      ]
    }),
    'phoneNumber': new FormControl({
      value: '',
      disabled: false
    }, {
      nonNullable: true,
      validators: [
        Validators.required
      ]
    })
  })

  onSubmit(): void {
    if (this.bookingForm.valid) {
      this._bookingStore.dispatch(saveUserBooking({ booking: this.bookingForm.getRawValue() }));
      this.bookingForm.reset();
    }
  }
}