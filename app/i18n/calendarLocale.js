export const calInitialLocales = {
    en: {
        weekDayShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'), // Text in day header (Sun, Mon, etc.)
        meridiem: { ante: 'am', post: 'pm' }, // Hour format (hh:mm a)
        more: 'more', // Text for "more" button (All day events)
    },
    he: {
        weekDayShort: 'א׳_ב׳_ג׳_ד׳_ה׳_ו׳_ש׳'.split('_'), // טקסט בכותרת ימי השבוע (א׳, ב׳ וכו')
        meridiem: { ante: 'לפנה״צ', post: 'אחה״צ' }, // פורמט שעה (שעה:דקה אחה״צ/לפנה״צ)
        more: 'עוד', // טקסט לכפתור "עוד" (אירועים לכל היום)
    }
};