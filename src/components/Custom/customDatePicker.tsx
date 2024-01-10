 
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Control, FieldValues, Controller } from "react-hook-form";
import dayjs from "dayjs";
import React from "react";

interface CustomDatePickerProps<T> {
  name: Extract<keyof T, string>;
  control: any;
  error?: boolean;
  helperText?: string;
  defaultValue: any;
  onDateChange?: any;
}

const CustomDatePicker = <T,>({
  name,
  control,
  error,
  helperText,
  defaultValue,
  onDateChange,
  ...rest
}: CustomDatePickerProps<T>) => {
  return (
 
      <div className={"mui-date"}>
        <Controller
          name={name}
          control={control as Control<FieldValues, any>}
          defaultValue={defaultValue}
          render={({ field: { onChange, value } }) => (
            <DatePicker
              value={value ? dayjs(value) : null}
              onChange={onChange}
              slotProps={{
                actionBar: {
                  actions: ["today", "accept"],
                },
                textField: {
                  error: error,
                  helperText: helperText,
                },
              }}
              {...rest}
            />
          )}
        />
      </div>
 
  );
};

export default CustomDatePicker;