// push data to dataLayer
const pushDataToDataLayer = (data) => {
    window.dataLayer = window.dataLayer || [];
    // check if date is type of string
    if (typeof data !== 'string') return;

    // convert data into object
    const dataPayload = JSON.parse(data);

    // if 'undefined' string is present, set value to typeof undefined
    // JSON cannot accept undefined value so must store as string while in custom data attribute via JSX
    const dataPayloadWithReplacedUndefinedValues = Object.entries(dataPayload).map((keyVal) => {
        let [key, value] = keyVal;
        if (value.includes('undefined')) {
            value = undefined;
        }
        return [key, value];
    });
    // take array of arrays and reformat into valid object
    const dataLayerPayload = Object.fromEntries(dataPayloadWithReplacedUndefinedValues);
    window.dataLayer.push(dataLayerPayload);
}

// validate events which parse custom data attributes 
const validateAnalyticsTargetElement = (e) => {
    // delegate to target elements containing analytics data
    const analyticsTargetElement = e.target.closest('[data-analytics-payload]');

    // check if target element has analytics data or if the data is type string
    if (!analyticsTargetElement || 
        typeof analyticsTargetElement.dataset.analyticsPayload !== 'string'
    ) return false;
    
    return analyticsTargetElement;
}

// handle onClick events 
export const handleAnalyticsClickEvents = (e) => {
    // validate analytics target element
    const analyticsTargetElement = validateAnalyticsTargetElement(e);
    if (!analyticsTargetElement) return;

    // pass analytics data to dataLayer
    pushDataToDataLayer(analyticsTargetElement.dataset.analyticsPayload);
}

// handle onSubmit events
export const handleAnalyticsSubmitEvents = (e) => {
    // pass analytics data to dataLayer
    pushDataToDataLayer(`{
        "event": "on_submit", 
        "element_data_value": "create expense - successful form submit", 
        "element_type":"${e.target.tagName.toLowerCase()}", 
        "element_class": "undefined", 
        "element_id": "${e.target.id}",
        "component_name": "AddExpense"
      }`);
}

export const initAnalyticsEvents = (eventName, eventHandler) => {
    window.addEventListener(eventName, eventHandler);
}
