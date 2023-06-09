const transformApiError = () => (next: any) => (action: any) => {
    return next(action);
};

export default transformApiError;
