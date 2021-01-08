import {
  initAnalyticsEvents,
  handleAnalyticsClickEvents,
  handleAnalyticsSubmitEvents,
} from "./analytics-events";

const wireUpAnalytics = () => {
  // init analytics events
  initAnalyticsEvents("click", handleAnalyticsClickEvents);
  initAnalyticsEvents("submit", handleAnalyticsSubmitEvents);
};

export default wireUpAnalytics;
