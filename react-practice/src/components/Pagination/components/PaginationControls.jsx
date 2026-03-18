import Styles from '../Css/Pagination.module.css'

function PaginationControls({goToNextPage, goToPrevPage, totalNoOfPages, currentPage, handlePageChange}){
    return(
    <div className={Styles.paginationContainer} >
                <button disabled={currentPage === 0} onClick={() => goToPrevPage()} >{"<=="}</button>
                {[...Array(totalNoOfPages).keys()].map((n) =>
                    <button
                        key={n}
                        // Ye line change karni hai bas:
                        className={n === currentPage ? `${Styles.pageNumber} ${Styles.active}` : Styles.pageNumber}
                        onClick={() => handlePageChange(n)}
                    >
                        {n}
                    </button>
                )}
                <button disabled={currentPage === totalNoOfPages - 1} onClick={() => goToNextPage()} >{"==>"}</button>
            </div>
    )
}

export default PaginationControls