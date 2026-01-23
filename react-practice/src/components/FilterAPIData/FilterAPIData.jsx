import useProducts2 from "../../hooks/useProducts2";

function FilterAPIData(){

    const {data, error, loading} = useProducts2();

    if (loading) return <div>loading ....</div>
    if(error) return <div>Error in loading data</div>

    return(
        <div>
        <ul>
        {data.map((prod) => 
            <li>
            {prod.title}
            </li>
        )}
        </ul>

        </div>
    )

}
export default FilterAPIData;