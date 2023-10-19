import React from 'react';

export default function PageNumber({ page, setPageNumber }) {
  const pageNumbers = [];
  for (let i = page.startPage; i <= page.endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div
        style={{ display: 'inline', margin: '5px' }}
        onClick={() => {
          if (page.nowPage - 5 >= 0) {
            setPageNumber(page.nowPage - 6);
          } else {
            setPageNumber(0);
          }
        }}
      >
        이전
      </div>
      {pageNumbers.map((pageNumber) => (
        <div
          key={pageNumber}
          style={{ display: 'inline', margin: '5px' }}
          onClick={() => {
            if (pageNumber !== page.nowPage) {
              setPageNumber(pageNumber - 1);
            }
          }}
        >
          {pageNumber === page.nowPage ? <strong>{pageNumber}</strong> : <span>{pageNumber}</span>}
        </div>
      ))}
      <div
        style={{ display: 'inline', margin: '5px' }}
        onClick={() => {
          if (page.nowPage + 5 < page.totalPage) {
            setPageNumber(page.nowPage + 4);
          } else {
            setPageNumber(page.totalPage - 1);
          }
        }}
      >
        다음
      </div>
    </div>
  );
}
