import { useEffect, useRef } from "react";

export const useObserver = (lastElement, isPostsLoading, canLoad, callback) => {
  const observer = useRef();

  useEffect(() => {
    if (isPostsLoading) return;
    if (observer.current) observer.current.disconnect();

    let cb = function (entries) {
      if (entries[0].isIntersecting && canLoad) {
        callback();
      }
    };

    observer.current = new IntersectionObserver(cb);
    observer.current.observe(lastElement.current);
  }, [isPostsLoading]);
};
