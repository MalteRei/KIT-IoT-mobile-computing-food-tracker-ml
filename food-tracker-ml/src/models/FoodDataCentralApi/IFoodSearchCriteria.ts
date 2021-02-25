import DataType from "./DataType";

interface IFoodSearchCriteria{
    query: string,
    dataType?: DataType,
    pageSize?: number,
    pageNumber?: number,
    sortBy?: string,
    sortOrder?: string

}

export default IFoodSearchCriteria;