import React from "react";

import IconDropdown from "../../dropdown/IconDropdown";
import { CustomButton } from "../../button/CustomButton";

const Pagination = ({
  currentPage = 1,
  setCurrentPage,
  dataLimit,
  setDataLimit,
  total = dataLimit,
  dataLimitDisable,
  setSelectedRows,
  removeSelection = true,
}) => {
  const pageCount = Math.ceil(total / dataLimit);

  const handlePageChange = (page) => {
    if (removeSelection && setSelectedRows) {
      setSelectedRows([]);
    }
    setCurrentPage(page);
  };

  const handledataLimitChange = (size) => {
    setDataLimit(size);
    setCurrentPage(1);
  };

  const getPageNumbers = () => {
    const pages = [];
    let leftSide = currentPage - 2;
    let rightSide = currentPage + 2;

    if (leftSide <= 1) {
      rightSide = 5;
      leftSide = 1;
    }
    if (rightSide > pageCount) {
      leftSide = pageCount - 4;
      rightSide = pageCount;
      if (leftSide < 1) {
        leftSide = 1;
      }
    }

    for (let number = leftSide; number <= rightSide; number++) {
      if (number > 0 && number <= pageCount) {
        pages.push(number);
      }
    }
    return pages;
  };

  return (
    <div className="w-full sticky right-0 bottom-0 z-10 flex justify-end items-center p-2 px-4 gap-4 bg-card shadow border border-border rounded-lg rounded-t-none text-card-foreground">
      <div className="flex space-x-2 items-center">
        <span className="font-bold select-none">Total: {total}</span>

        <IconDropdown
          customIcon={() => (
            <div className="select-none border border-border rounded-lg hover:bg-accent Transition px-2">
              Limit {dataLimit}
            </div>
          )}
          contentsClass={dataLimitDisable ? "hidden" : ""}
          contents={[10, 20, 30, 40, 50]
            .filter((size) => size <= total)
            .map((size) => ({
              title: `${size} `,
              click: () => handledataLimitChange(size),
            }))}
          style="dropdown"
        />
      </div>
      <div className="flex items-center space-x-2 select-none">
        <CustomButton
          size="xs"
          variant="accent"
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        >
          {"<<"}
        </CustomButton>
        <CustomButton
          size="xs"
          variant="accent"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {"<"}
        </CustomButton>
        {getPageNumbers().map((number) => (
          <CustomButton
            size="xs"
            key={number}
            variant="accent"
            className={`${currentPage === number ? "bg-accent" : ""}`}
            onClick={() => handlePageChange(number)}
          >
            {number}
          </CustomButton>
        ))}
        {currentPage < pageCount - 2 && <span className="mx-1">...</span>}
        <CustomButton
          size="xs"
          variant="accent"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === pageCount}
        >
          {">"}
        </CustomButton>
        <CustomButton
          size="xs"
          variant="accent"
          onClick={() => handlePageChange(pageCount)}
          disabled={currentPage === pageCount}
        >
          {">>"}
        </CustomButton>
      </div>
    </div>
  );
};

export default Pagination;
