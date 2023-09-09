import React, { useEffect } from "react";
import { loadDefaultStorage } from "./app/cartAndWislistSlice";
import { loadLocalAuth } from "./app/userAuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

const PageWrapper = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isUserAuth, isSeller, user } = useSelector((state) => state.userAuth);

  useEffect(() => {
    dispatch(loadDefaultStorage());
    if (!isUserAuth) dispatch(loadLocalAuth());
    if (user.role === 1 && !user.sellerOnboarded)
      router.replace("/seller/onboard");
  }, []);

  return <>{props.children}</>;
};

export default PageWrapper;
