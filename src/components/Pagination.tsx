import { useRouter } from "next/router";
import PageLeftIC from "@/components/icons/PageLeftIC";
import PageRightIC from "@/components/icons/PageRightIC";
import EllipsisIC from "@/components/icons/EllipsisIC";

import { COUNT_PER_PAGE, ROW_COUNT } from "@/libs/constants";

const Pagination = (props: {
  current: number;
  setCurrent: Function;
  total: number;
  pageSize?: number;
}) => {
  const router = useRouter();
  const isNotification = router.pathname.includes("admin/dashboard");
  const count_per_page = props?.pageSize ?? COUNT_PER_PAGE;
  // ?? router.pathname.includes("admin/myAssets") ? ROW_COUNT * 3  : COUNT_PER_PAGE;

  const pages = Math.ceil(props.total / count_per_page) - 1;
  // console.log(
  //  `current: ${props.current} pages: ${pages} - total: ${props.total} / per page: ${count_per_page}`
  // );
  const pageArr = [];
  let start: number = 1;
  let end: number = 1;

  if (props.current == 0 || props.current == 1 || props.current == 3) {
    start = 1;
    end = Math.min(pages, 5);
  } else if (props.current < pages - 3) {
    start = Math.max(1, props.current - 2);
    end = Math.min(pages, props.current + 2);
  } else {
    start = Math.max(1, pages - 3);
    end = pages;
  }
  for (var i = start; i <= end; i++) {
    if (i != 1) {
      pageArr.push(i);
    }
  }

  const ellipsisStart = start > 2;
  const ellipsisEnd = end < pages;

  return (
    <div className="py-8 text-white">
      <nav className="flex items-center justify-center">
        <div className="flex items-center">
          {props.current > 0 ? (
            <div
              className="flex items-center px-4 space-x-2"
              onClick={() => props.setCurrent(props.current - 1)}
            >
              <PageLeftIC color="#f3b007" className="cursor-pointer" />
              <p
                className={`${
                  isNotification ? "text-[#f3b007]" : "text-white"
                } text-white cursor-pointer xs:block hover:text-primary`}
              >
                Previous
              </p>
            </div>
          ) : (
            <div className="flex items-center px-4 space-x-2">
              <PageLeftIC color="#ddd" />
              <p className="text-gray-200 xs:block">Previous</p>
            </div>
          )}
          <div className="mx-0.5">
            <a
              className={`px-3 py-2 cursor-pointer ${
                props.current == 0 &&
                "w-[30px] h-[30px] bg-black hover:bg-primary flex justify-center items-center text-white"
              } ${isNotification && "text-black"} rounded-full`}
              onClick={() => props.setCurrent(0)}
            >
              1
            </a>
          </div>
          {ellipsisStart && (
            <div className="mx-0.5">
              <EllipsisIC />
            </div>
          )}
          {pageArr.map((page) => (
            <div key={page} className="mx-0.5">
              <a
                className={`px-3 py-2 cursor-pointer ${
                  props.current == page - 1 &&
                  "w-[30px] h-[30px] bg-black hover:bg-primary flex justify-center items-center text-white"
                } ${isNotification && "text-black"} rounded-full`}
                onClick={() => props.setCurrent(page - 1)}
              >
                {page}
              </a>
            </div>
          ))}
          {ellipsisEnd && (
            <div className="mx-0.5">
              <EllipsisIC />
            </div>
          )}
          <div className="mx-0.5">
            <a
              className={`px-3 py-2 cursor-pointer ${
                props.current === pages &&
                "w-[30px] h-[30px] bg-black hover:bg-primary flex justify-center items-center text-white"
              } ${isNotification && "text-black"} rounded-full`}
              onClick={() => props.setCurrent(pages)}
            >
              {pages + 1}
            </a>
          </div>
          {props.current < pages ? (
            <div className="flex items-center px-4 space-x-2">
              <p
                className={`${
                  isNotification ? "text-[#f3b007]" : "text-white"
                } cursor-pointer xs:block hover:text-primary`}
                onClick={() => {
                  props.setCurrent(props.current + 1);
                }}
              >
                Next
              </p>
              <PageRightIC
                onClick={() => {
                  props.setCurrent(props.current + 1);
                }}
                color="#f3b007"
                className="cursor-pointer"
              />
            </div>
          ) : (
            <div className="flex items-center px-4 space-x-2">
              <p className="text-gray-200 xs:block">Next</p>
              <PageRightIC color="#ddd" />
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Pagination;
