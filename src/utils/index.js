import {format, subDays} from "date-fns";


// GET THE DATE OF THE DAY 'SUB' DAYS WHERE SUB CAN BE ANY WHOLE NUMBER
export const getDate = (sub = 0) => {
    const deteXDaysAgo = subDays(new Date(), sub);

    return format(deteXDaysAgo, "dd/MM/yyyy");
}