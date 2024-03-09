interface PaginationResult<ParameterType> {
    meta: {
        count: number;
    };
    data: ParameterType[];
}
