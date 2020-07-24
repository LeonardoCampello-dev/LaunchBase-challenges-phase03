let pages = [],
    totalPages = 46,
    selectedPage = 3

for (let currentPage = 1; currentPage <= totalPages; currentPage++) {

    const firstAndSecondPage = currentPage == 1 || currentPage == 2
    const lastAndPenultimatePage = currentPage == totalPages || currentPage == totalPages - 1
    
    if (firstAndSecondPage || lastAndPenultimatePage) {
        pages.push(currentPage)
    }
}

console.log(pages)