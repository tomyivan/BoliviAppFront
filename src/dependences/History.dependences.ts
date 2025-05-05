import { HistoryApiAdapter } from "../infrastructure";
import { HistoryApplication } from "../application";
export const historyApi = new HistoryApiAdapter();
export const historyApp = new HistoryApplication(historyApi);