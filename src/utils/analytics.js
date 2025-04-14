// GET AUTHENTICATED USERS EMAIL 

import { parse } from "date-fns";
import { redis } from "../lib/redis";
import { getDate } from "./index";



export class Analytics {
    
    retention= 60 * 60 * 24 * 8

    constructor(opts){
        if (opts?.retention) this.retention = opts?.retention;
    }

    async track(namespace, event={}, opts) {

        let key = `analytics::${namespace}`

        // if we dont want to persist store as time series
        if (!opts?.persist) {
            key+= `::${getDate()}`
        }

        // db call to persist this event
        await redis.hincrby(key, JSON.stringify(event), 1);

        if (!opts?.persist) await redis.expire(key, this.retention)
    }

    async retrieveDays(namespace, nDays){
        const promises = [];

        for (let i = 0; i < nDays; i++){
            const formattedDate = getDate(i);
            const promise = analytics.retrieve(namespace, formattedDate);
            promises.push(promise);
        }

        const fetched = await Promise.all(promises);

        const data = fetched.sort((a,b) => {
            if(parse(a.date, "dd/MM/yyyy", new Date()) > parse(b.date, "dd/MM/yyyy", new Date())){
                return 1;
            }else{
                return -1;
            }
        })

        return data;
    }

    async retrieve(namespace, date) {
        const res = await redis.hgetall(`analytics::${namespace}::${date}`);

        return {
            date,
            events: Object.entries(res ?? []).map(([key, value]) => ({
                [key] : Number(value)
            }))
        }
    }
}

export const analytics = new Analytics()