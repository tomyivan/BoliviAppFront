import dayjs from "dayjs";
import "dayjs/locale/es";
import customParseFormat from "dayjs/plugin/customParseFormat"
dayjs.extend(customParseFormat);
dayjs.locale("es")
export const optionsFilter = [
       {
        label: "Hoy",
        action: () => ({            
            from: dayjs(),
            to: dayjs()
        })},

        {
            label: "Ayer",
            action: () => ({
            from: dayjs().add(-1, 'day'),
            to: dayjs().add(-1, 'day')
        })},
        {
            label: "Últimos 7 días",
            action: () => ({
            from:dayjs().add(-7, 'day'),
            to: dayjs()
        })},
        {
            label: "Últimos 30 días",
            action: () => ({
            from: dayjs().add(-30, 'day'),
            to:dayjs()
        })},
        {
            label: "Últimos 90 días",
            action: () => ({
            from: dayjs().add(-90, 'day'),
            to:dayjs()
        })},
        {
            label: dayjs().format('MMMM'),                    
            action: () => ({
            from: dayjs(`${dayjs().format('YYYY-MM')}-01`),
            to:dayjs(`${dayjs().endOf('month')}`)
        })},
        {
            label:  dayjs().add(-1, 'month').format('MMMM'),
            action: () => ({
            from: dayjs(`${dayjs().add(-1, 'month').format('YYYY-MM')}-01`),
            to:dayjs(`${dayjs().add(-1, 'month').endOf('month')}`)
        })},
        {
            label: dayjs().add(-2, 'month').format('MMMM'),
            action: () => ({
            from: dayjs(`${dayjs().add(-2, 'month').format('YYYY-MM')}-01`),
            to:dayjs(`${dayjs().add(-2, 'month').endOf('month')}`)
        })},
        {
            label: dayjs().year(),
            action: () => ({
            from: dayjs(`${dayjs().year()}-01-01`),
            to: dayjs(`${dayjs().year()}-12-31`)
        })},
        {
            label: dayjs().add(-1, 'year').year(),
            action: () => ({
            from: dayjs(`${dayjs().year() - 1}-01-01`),
            to: dayjs(`${dayjs().year() - 1}-12-31`)
        })}
    ];